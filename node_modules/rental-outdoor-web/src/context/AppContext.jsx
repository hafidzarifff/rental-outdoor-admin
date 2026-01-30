import { createContext, useContext, useState, useCallback } from 'react'
import { orders as initialOrders, items as initialItems, categories as initialCategories, staff as initialStaff } from '../data/dummyData'

const AppContext = createContext()

export function AppProvider({ children }) {
    const [orders, setOrders] = useState(initialOrders)
    const [items, setItems] = useState(initialItems)
    const [categories, setCategories] = useState(initialCategories)
    const [staff, setStaff] = useState(initialStaff)
    const [toasts, setToasts] = useState([])

    // Toast notifications
    const showToast = useCallback((message, type = 'success') => {
        const id = Date.now()
        setToasts(prev => [...prev, { id, message, type }])
        setTimeout(() => {
            setToasts(prev => prev.filter(t => t.id !== id))
        }, 3000)
    }, [])

    const removeToast = useCallback((id) => {
        setToasts(prev => prev.filter(t => t.id !== id))
    }, [])

    // Order management
    const updateOrderStatus = useCallback((orderId, newStatus, additionalData = {}) => {
        setOrders(prev => prev.map(order => {
            if (order.id === orderId) {
                return { ...order, status: newStatus, ...additionalData }
            }
            return order
        }))
    }, [])

    const acceptOrder = useCallback((orderId) => {
        updateOrderStatus(orderId, 'confirmed')
        showToast(`Pesanan ${orderId} berhasil diverifikasi!`, 'success')
    }, [updateOrderStatus, showToast])

    const rejectOrder = useCallback((orderId, reason) => {
        updateOrderStatus(orderId, 'rejected', { rejectionReason: reason })
        showToast(`Pesanan ${orderId} ditolak`, 'error')
    }, [updateOrderStatus, showToast])

    const processPickup = useCallback((orderId, checklist) => {
        updateOrderStatus(orderId, 'rented', { checklist })
        showToast(`Barang untuk pesanan ${orderId} telah diserahkan!`, 'success')
    }, [updateOrderStatus, showToast])

    const processReturn = useCallback((orderId, itemConditions, penalty = 0) => {
        setOrders(prev => prev.map(order => {
            if (order.id === orderId) {
                const updatedItems = order.items.map(item => {
                    const condition = itemConditions.find(c => c.itemId === item.itemId)
                    return { ...item, condition: condition?.condition || 'good' }
                })
                return {
                    ...order,
                    status: 'completed',
                    items: updatedItems,
                    penalty,
                    completedAt: new Date().toISOString()
                }
            }
            return order
        }))
        if (penalty > 0) {
            showToast(`Pesanan ${orderId} selesai dengan denda Rp ${penalty.toLocaleString('id-ID')}`, 'warning')
        } else {
            showToast(`Pesanan ${orderId} berhasil dikembalikan!`, 'success')
        }
    }, [showToast])

    // Item management
    const updateItemStock = useCallback((itemId, newStock, newAvailable) => {
        setItems(prev => prev.map(item => {
            if (item.id === itemId) {
                return { ...item, stock: newStock, available: newAvailable ?? item.available }
            }
            return item
        }))
        showToast('Stok berhasil diperbarui', 'success')
    }, [showToast])

    const toggleMaintenance = useCallback((itemId) => {
        setItems(prev => prev.map(item => {
            if (item.id === itemId) {
                const newCondition = item.condition === 'maintenance' ? 'good' : 'maintenance'
                return { ...item, condition: newCondition }
            }
            return item
        }))
        showToast('Status barang diperbarui', 'info')
    }, [showToast])

    const addItem = useCallback((itemData) => {
        const newItem = {
            id: Date.now(),
            condition: 'good',
            ...itemData,
        }
        setItems(prev => [...prev, newItem])
        showToast(`Barang ${itemData.name} berhasil ditambahkan`, 'success')
    }, [showToast])

    const updateItem = useCallback((itemData) => {
        setItems(prev => prev.map(item => {
            if (item.id === itemData.id) {
                return { ...item, ...itemData }
            }
            return item
        }))
        showToast(`Barang ${itemData.name} berhasil diperbarui`, 'success')
    }, [showToast])

    // Category management
    const updateCategoryAvailable = useCallback(() => {
        setCategories(prev => prev.map(cat => {
            const categoryItems = items.filter(item => item.categoryId === cat.id)
            const available = categoryItems.reduce((sum, item) => sum + item.available, 0)
            const totalStock = categoryItems.reduce((sum, item) => sum + item.stock, 0)
            return { ...cat, available, totalStock }
        }))
    }, [items])

    const addCategory = useCallback((categoryData) => {
        const newCategory = {
            id: Date.now(),
            totalStock: 0,
            available: 0,
            ...categoryData,
        }
        setCategories(prev => [...prev, newCategory])
        showToast(`Kategori ${categoryData.name} berhasil ditambahkan`, 'success')
    }, [showToast])

    const updateCategory = useCallback((categoryData) => {
        setCategories(prev => prev.map(cat => {
            if (cat.id === categoryData.id) {
                return { ...cat, ...categoryData }
            }
            return cat
        }))
        showToast(`Kategori ${categoryData.name} berhasil diperbarui`, 'success')
    }, [showToast])

    // Auth management
    const [user, setUser] = useState(null)

    const login = useCallback((email, password) => {
        // Mock login - in real app would validate against backend
        // For admin dashboard simply allow login
        setUser({
            id: 1,
            name: 'Admin',
            email: email,
            role: 'admin',
            avatar: 'https://ui-avatars.com/api/?name=Admin&background=0D9488&color=fff'
        })
        showToast('Login berhasil', 'success')
        return true
    }, [showToast])

    const logout = useCallback(() => {
        setUser(null)
        showToast('Logout berhasil', 'success')
    }, [showToast])

    // Staff management
    const addStaff = useCallback((staffData) => {
        const newStaff = {
            id: Date.now(),
            ...staffData,
            avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(staffData.name)}&background=random&color=fff`
        }
        setStaff(prev => [...prev, newStaff])
        showToast(`Staff ${staffData.name} berhasil ditambahkan`, 'success')
    }, [showToast])

    const deleteStaff = useCallback((staffId) => {
        setStaff(prev => prev.filter(s => s.id !== staffId))
        showToast('Staff berhasil dihapus', 'success')
    }, [showToast])

    // Statistics
    const getStats = useCallback(() => {
        const pendingOrders = orders.filter(o => o.status === 'pending').length
        const rentedItems = orders.filter(o => o.status === 'rented').reduce((sum, o) => sum + o.items.length, 0)
        const overdueOrders = orders.filter(o => {
            if (o.status !== 'rented') return false
            const returnDate = new Date(o.returnDate).setHours(0, 0, 0, 0)
            const today = new Date().setHours(0, 0, 0, 0)
            return today > returnDate
        }).length
        const totalRevenue = orders
            .filter(o => o.status === 'completed')
            .reduce((sum, o) => sum + o.totalPrice + (o.penalty || 0), 0)

        return { pendingOrders, rentedItems, overdueOrders, totalRevenue }
    }, [orders])

    const value = {
        orders,
        items,
        categories,
        staff,
        toasts,
        showToast,
        removeToast,
        updateOrderStatus,
        acceptOrder,
        rejectOrder,
        processPickup,
        processReturn,
        updateItemStock,
        toggleMaintenance,
        addItem,
        updateItem,
        updateCategoryAvailable,
        addCategory,
        updateCategory,
        addStaff,
        deleteStaff,
        getStats,
        user,
        login,
        logout,
    }

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export function useApp() {
    const context = useContext(AppContext)
    if (!context) {
        throw new Error('useApp must be used within an AppProvider')
    }
    return context
}
