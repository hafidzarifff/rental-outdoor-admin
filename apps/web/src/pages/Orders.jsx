import { useState, useEffect } from 'react'
import { Eye, Check, X, Package, RotateCcw, Clock, AlertTriangle } from 'lucide-react'
import { useApp } from '../context/AppContext'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import Modal from '../components/ui/Modal'
import EmptyState from '../components/ui/EmptyState'
import OrderDetailModal from '../components/OrderDetailModal'

const tabs = [
    { id: 'pending', label: 'Pesanan Masuk', icon: Clock },
    { id: 'confirmed', label: 'Siap Diambil', icon: Package },
    { id: 'rented', label: 'Sedang Disewa', icon: RotateCcw },
    { id: 'completed', label: 'Selesai', icon: Check },
]

// Payment Proof Modal
function PaymentProofModal({ isOpen, onClose, imageUrl }) {
    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Bukti Pembayaran" size="md">
            <div className="flex justify-center">
                <img
                    src={imageUrl}
                    alt="Bukti Transfer"
                    className="max-w-full h-auto rounded-lg border border-gray-200"
                />
            </div>
        </Modal>
    )
}

// Reject Order Modal
function RejectModal({ isOpen, onClose, onReject }) {
    const [reason, setReason] = useState('')
    const [loading, setLoading] = useState(false)

    const handleReject = () => {
        setLoading(true)
        setTimeout(() => {
            onReject(reason)
            setLoading(false)
            setReason('')
            onClose()
        }, 500)
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Tolak Pesanan" size="md">
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Alasan Penolakan
                    </label>
                    <textarea
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        placeholder="Masukkan alasan penolakan..."
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
                        rows={3}
                    />
                </div>
                <div className="flex justify-end gap-3">
                    <Button variant="secondary" onClick={onClose}>Batal</Button>
                    <Button variant="danger" onClick={handleReject} loading={loading} disabled={!reason.trim()}>
                        Tolak Pesanan
                    </Button>
                </div>
            </div>
        </Modal>
    )
}



// Return Modal with condition check and penalty
function ReturnModal({ isOpen, onClose, order, onComplete }) {
    const [conditions, setConditions] = useState([])

    const [latePenalty, setLatePenalty] = useState(0)

    useEffect(() => {
        if (order) {
            setConditions(
                order.items.map(item => ({
                    itemId: item.itemId,
                    itemName: item.itemName,
                    condition: 'good',
                    penalty: 0
                }))
            )
            setLatePenalty(0)
        }
    }, [order])
    const [loading, setLoading] = useState(false)

    const setCondition = (itemId, condition) => {
        setConditions(prev => prev.map(item =>
            item.itemId === itemId
                ? { ...item, condition, penalty: condition === 'good' ? 0 : item.penalty }
                : item
        ))
    }

    const setPenalty = (itemId, penalty) => {
        setConditions(prev => prev.map(item =>
            item.itemId === itemId ? { ...item, penalty: parseInt(penalty) || 0 } : item
        ))
    }

    const totalItemPenalty = conditions.reduce((sum, item) => sum + item.penalty, 0)
    const totalPenalty = totalItemPenalty + latePenalty
    const grandTotal = (order?.totalPrice || 0) + totalPenalty
    const isOverdue = order && new Date(new Date().setHours(0, 0, 0, 0)) > new Date(new Date(order.returnDate).setHours(0, 0, 0, 0))

    const handleComplete = () => {
        setLoading(true)
        setTimeout(() => {
            onComplete(conditions, totalPenalty)
            setLoading(false)
            onClose()
        }, 500)
    }

    if (!order) return null

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Proses Pengembalian" size="lg">
            <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm text-gray-600 mb-1">Pelanggan</p>
                            <p className="font-semibold text-gray-900">{order.customerName}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-sm text-gray-600 mb-1">ID Pesanan</p>
                            <p className="font-semibold text-gray-900">{order.id}</p>
                        </div>
                    </div>
                </div>

                <div>
                    <p className="text-sm font-medium text-gray-700 mb-3">
                        Cek kondisi barang:
                    </p>
                    <div className="space-y-3">
                        {conditions.map(item => (
                            <div key={item.itemId} className="p-4 rounded-lg border border-gray-200 bg-white">
                                <div className="flex items-center justify-between mb-3">
                                    <span className="font-medium text-gray-900">{item.itemName}</span>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => setCondition(item.itemId, 'good')}
                                            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${item.condition === 'good'
                                                ? 'bg-green-100 text-green-700 border-2 border-green-500'
                                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                                }`}
                                        >
                                            ✓ Baik
                                        </button>
                                        <button
                                            onClick={() => setCondition(item.itemId, 'damaged')}
                                            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${item.condition === 'damaged'
                                                ? 'bg-red-100 text-red-700 border-2 border-red-500'
                                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                                }`}
                                        >
                                            ✗ Rusak
                                        </button>
                                    </div>
                                </div>
                                {item.condition === 'damaged' && (
                                    <div className="flex items-center gap-2 mt-2 pl-4 border-l-2 border-red-200">
                                        <label className="text-sm text-gray-600">Denda:</label>
                                        <div className="flex items-center">
                                            <span className="text-sm text-gray-500 mr-1">Rp</span>
                                            <input
                                                type="number"
                                                value={item.penalty}
                                                onChange={(e) => setPenalty(item.itemId, e.target.value)}
                                                className="w-32 px-3 py-1.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
                                                placeholder="0"
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>


                {isOverdue && (
                    <div>
                        <p className="text-sm font-medium text-red-600 mb-3 flex items-center gap-2">
                            <AlertTriangle className="w-4 h-4" />
                            Keterlambatan Pengembalian
                        </p>
                        <div className="p-4 rounded-lg border border-red-200 bg-red-50">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium text-gray-900">Denda Keterlambatan</p>
                                    <p className="text-sm text-gray-600">Pesanan ini telah melewati batas waktu pengembalian</p>
                                </div>
                                <div className="flex items-center">
                                    <span className="text-sm text-gray-500 mr-2 bg-white px-2 py-1.5 border border-r-0 border-gray-200 rounded-l-lg h-[38px] flex items-center">Rp</span>
                                    <input
                                        type="number"
                                        value={latePenalty || ''}
                                        onChange={(e) => setLatePenalty(parseInt(e.target.value) || 0)}
                                        className="w-32 px-3 py-1.5 border border-l-0 border-gray-200 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-right h-[38px]"
                                        placeholder="0"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Summary */}
                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Subtotal Sewa</span>
                        <span className="text-gray-900">Rp {order.totalPrice.toLocaleString('id-ID')}</span>
                    </div>
                    {totalPenalty > 0 && (
                        <div className="flex justify-between text-sm">
                            <span className="text-red-600">Total Denda</span>
                            <span className="text-red-600">+ Rp {totalPenalty.toLocaleString('id-ID')}</span>
                        </div>
                    )}
                    <div className="flex justify-between font-semibold text-lg pt-2 border-t border-gray-200">
                        <span className="text-gray-900">Grand Total</span>
                        <span className="text-gray-900">Rp {grandTotal.toLocaleString('id-ID')}</span>
                    </div>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t">
                    <Button variant="secondary" onClick={onClose}>Batal</Button>
                    <Button onClick={handleComplete} loading={loading}>
                        Selesaikan Pengembalian
                    </Button>
                </div>
            </div>
        </Modal >
    )
}

// Order Row Component
function OrderRow({ order, onViewProof, onAccept, onReject, onPickup, onReturn, onDetail }) {
    const isOverdue = order.status === 'rented' && new Date(new Date().setHours(0, 0, 0, 0)) > new Date(new Date(order.returnDate).setHours(0, 0, 0, 0))

    return (
        <tr className="hover:bg-gray-50 transition-colors">
            <td className="px-5 py-4">
                <span className="font-semibold text-gray-900">{order.id}</span>
            </td>
            <td className="px-5 py-4">
                <div>
                    <p className="font-medium text-gray-900">{order.customerName}</p>
                    <p className="text-sm text-gray-500">{order.phone}</p>
                </div>
            </td>
            <td className="px-5 py-4">
                <div className="space-y-1">
                    {order.items.slice(0, 2).map((item, idx) => (
                        <p key={idx} className="text-sm text-gray-600">
                            {item.quantity}x {item.itemName}
                        </p>
                    ))}
                    {order.items.length > 2 && (
                        <p className="text-xs text-gray-400">+{order.items.length - 2} lainnya</p>
                    )}
                </div>
            </td>
            <td className="px-5 py-4">
                <div className="flex items-center gap-2">
                    <Badge status={isOverdue ? 'overdue' : order.status} />
                    {isOverdue && <AlertTriangle className="w-4 h-4 text-red-500" />}
                </div>
            </td>
            <td className="px-5 py-4">
                <p className="font-semibold text-gray-900">
                    Rp {order.totalPrice.toLocaleString('id-ID')}
                </p>
                {order.penalty > 0 && (
                    <p className="text-xs text-red-600">+ Denda Rp {order.penalty.toLocaleString('id-ID')}</p>
                )}
            </td>
            <td className="px-5 py-4">
                <div className="text-sm text-gray-600">
                    <p>{new Date(order.pickupDate).toLocaleDateString('id-ID')}</p>
                    <p className="text-xs text-gray-400">s/d {new Date(order.returnDate).toLocaleDateString('id-ID')}</p>
                </div>
            </td>
            <td className="px-5 py-4">
                <div className="flex items-center gap-2">
                    {order.status === 'pending' && (
                        <Button variant="outline" size="sm" onClick={() => onDetail(order)} icon={Eye}>
                            Detail
                        </Button>
                    )}
                    {order.status === 'confirmed' && (
                        <Button variant="info" size="sm" onClick={() => onPickup(order)} icon={Package}>
                            Proses Pengambilan
                        </Button>
                    )}
                    {order.status === 'rented' && (
                        <Button variant="warning" size="sm" onClick={() => onReturn(order)} icon={RotateCcw}>
                            Proses Pengembalian
                        </Button>
                    )}
                    {order.status === 'completed' && (
                        <span className="text-sm text-gray-500">
                            {order.completedAt && new Date(order.completedAt).toLocaleDateString('id-ID')}
                        </span>
                    )}
                </div>
            </td>
        </tr>
    )
}

export default function Orders() {
    const { orders, acceptOrder, rejectOrder, processPickup, processReturn } = useApp()
    const [activeTab, setActiveTab] = useState('pending')

    // Modal states
    const [proofModal, setProofModal] = useState({ isOpen: false, imageUrl: '' })
    const [rejectModal, setRejectModal] = useState({ isOpen: false, orderId: null })
    const [pickupModal, setPickupModal] = useState({ isOpen: false, order: null })
    const [returnModal, setReturnModal] = useState({ isOpen: false, order: null })
    const [detailModal, setDetailModal] = useState({ isOpen: false, order: null })

    const filteredOrders = orders.filter(o => o.status === activeTab)

    const handleAccept = (orderId) => {
        acceptOrder(orderId)
    }

    const handleReject = (reason) => {
        if (rejectModal.orderId) {
            rejectOrder(rejectModal.orderId, reason)
            setDetailModal({ isOpen: false, order: null })
        }
    }

    const handlePickupComplete = (checklist) => {
        if (pickupModal.order) {
            processPickup(pickupModal.order.id, checklist)
        }
    }

    const handleReturnComplete = (conditions, penalty) => {
        if (returnModal.order) {
            processReturn(returnModal.order.id, conditions, penalty)
        }
    }

    return (
        <div className="space-y-6">
            {/* Tabs */}
            <div className="flex gap-2 p-1 bg-gray-100 rounded-xl w-fit">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${activeTab === tab.id
                            ? 'bg-white text-gray-900 shadow-sm'
                            : 'text-gray-600 hover:text-gray-900'
                            }`}
                    >
                        <tab.icon className="w-4 h-4" />
                        {tab.label}
                        <span className={`ml-1 px-2 py-0.5 rounded-full text-xs ${activeTab === tab.id ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-600'
                            }`}>
                            {orders.filter(o => o.status === tab.id).length}
                        </span>
                    </button>
                ))}
            </div>

            {/* Orders Table */}
            <Card>
                {filteredOrders.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-100">
                                <tr>
                                    <th className="text-left text-xs font-medium text-gray-500 uppercase px-5 py-3">ID</th>
                                    <th className="text-left text-xs font-medium text-gray-500 uppercase px-5 py-3">Pelanggan</th>
                                    <th className="text-left text-xs font-medium text-gray-500 uppercase px-5 py-3">Barang</th>
                                    <th className="text-left text-xs font-medium text-gray-500 uppercase px-5 py-3">Status</th>
                                    <th className="text-left text-xs font-medium text-gray-500 uppercase px-5 py-3">Total</th>
                                    <th className="text-left text-xs font-medium text-gray-500 uppercase px-5 py-3">Periode</th>
                                    <th className="text-left text-xs font-medium text-gray-500 uppercase px-5 py-3">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {filteredOrders.map(order => (
                                    <OrderRow
                                        key={order.id}
                                        order={order}
                                        onViewProof={(o) => setProofModal({ isOpen: true, imageUrl: o.paymentProof })}
                                        onAccept={handleAccept}
                                        onReject={(o) => setRejectModal({ isOpen: true, orderId: o.id })}
                                        onPickup={(o) => setPickupModal({ isOpen: true, order: o })}
                                        onReturn={(o) => setReturnModal({ isOpen: true, order: o })}
                                        onDetail={(o) => setDetailModal({ isOpen: true, order: o })}
                                    />
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <EmptyState
                        type="inbox"
                        title={`Tidak ada pesanan ${tabs.find(t => t.id === activeTab)?.label.toLowerCase()}`}
                        description="Pesanan akan muncul di sini sesuai dengan statusnya"
                    />
                )}
            </Card>

            {/* Modals */}
            <OrderDetailModal
                isOpen={detailModal.isOpen}
                onClose={() => setDetailModal({ isOpen: false, order: null })}
                order={detailModal.order}
                onViewProof={(o) => setProofModal({ isOpen: true, imageUrl: o.paymentProof })}
                onAccept={(id) => {
                    handleAccept(id)
                    setDetailModal({ isOpen: false, order: null })
                }}
                onReject={(o) => setRejectModal({ isOpen: true, orderId: o.id })}
            />
            <PaymentProofModal
                isOpen={proofModal.isOpen}
                onClose={() => setProofModal({ isOpen: false, imageUrl: '' })}
                imageUrl={proofModal.imageUrl}
            />
            <RejectModal
                isOpen={rejectModal.isOpen}
                onClose={() => setRejectModal({ isOpen: false, orderId: null })}
                onReject={handleReject}
            />
            <OrderDetailModal
                isOpen={pickupModal.isOpen}
                onClose={() => setPickupModal({ isOpen: false, order: null })}
                order={pickupModal.order}
                mode="pickup"
                onPickup={handlePickupComplete}
            />
            <ReturnModal
                isOpen={returnModal.isOpen}
                onClose={() => setReturnModal({ isOpen: false, order: null })}
                order={returnModal.order}
                onComplete={handleReturnComplete}
            />

        </div>
    )
}
