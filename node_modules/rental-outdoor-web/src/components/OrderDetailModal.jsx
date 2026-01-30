
import { useState, useEffect } from 'react'
import { Receipt, Phone, Mail, User, CreditCard, X } from 'lucide-react'
import { useApp } from '../context/AppContext'
import Modal from './ui/Modal'
import Button from './ui/Button'
import Badge from './ui/Badge'

export default function OrderDetailModal({ isOpen, onClose, order, onAccept, onReject, onViewProof, mode = 'detail', onPickup }) {
    const context = useApp()
    // handle potential missing context or items
    const items = context?.items || []

    const [checklist, setChecklist] = useState([])
    const [loading, setLoading] = useState(false)
    const [showIdentityModal, setShowIdentityModal] = useState(false)
    const [showPaymentProofModal, setShowPaymentProofModal] = useState(false)

    useEffect(() => {
        if (order && mode === 'pickup') {
            // Safely map items, ensure order.items exists
            const initialChecklist = (order.items || []).map(item => ({
                itemId: item.itemId,
                itemName: item.itemName,
                checked: false
            }))
            setChecklist(initialChecklist)
        }
    }, [order, mode])

    if (!order) return null

    // Find item details from inventory safely
    const orderItems = (order.items || []).map(orderItem => {
        const itemDetails = items.find(i => i.id === orderItem.itemId) || {}
        return {
            ...orderItem,
            ...itemDetails,
            // Fallback for image and price if missing
            image: itemDetails.image || '',
            // Calculate total safely (Quantity * Price) - Duration ignored for Flat Rate
            total: (orderItem.quantity || 0) * (orderItem.pricePerDay || itemDetails.pricePerDay || 0)
        }
    })

    const subtotal = order.totalPrice || 0
    const deposit = 0
    const grandTotal = subtotal + deposit

    const toggleItem = (itemId) => {
        setChecklist(prev => prev.map(item =>
            item.itemId === itemId ? { ...item, checked: !item.checked } : item
        ))
    }

    const allChecked = checklist.length > 0 && checklist.every(item => item.checked)

    const handlePickupSubmit = () => {
        setLoading(true)
        setTimeout(() => {
            if (onPickup) onPickup(checklist)
            setLoading(false)
            onClose()
        }, 500)
    }

    // Helper for date formatting
    const formatDate = (dateStr) => {
        if (!dateStr) return '-'
        return new Date(dateStr).toLocaleDateString('id-ID', {
            day: 'numeric', month: 'short', year: 'numeric'
        })
    }

    // Actions for Pending state
    const isPending = order.status === 'pending'
    const isPickup = mode === 'pickup'

    const footerValues = isPickup ? (
        <div className="flex justify-end gap-3 w-full">
            <Button variant="secondary" onClick={onClose}>Batal</Button>
            <Button onClick={handlePickupSubmit} loading={loading} disabled={!allChecked}>
                Serahkan Barang
            </Button>
        </div>
    ) : (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 w-full">
            <Button
                variant="outline"
                onClick={() => setShowPaymentProofModal(true)}
                className="w-full sm:w-auto"
                icon={Receipt}
            >
                Lihat Bukti Bayar
            </Button>

            {isPending && (
                <div className="flex w-full sm:w-auto gap-3">
                    <Button
                        variant="danger"
                        onClick={() => onReject && onReject(order)}
                        className="flex-1 sm:flex-none bg-red-50 text-red-600 hover:bg-red-100 border-none shadow-none"
                    >
                        Tolak
                    </Button>
                    <Button
                        variant="primary"
                        onClick={() => onAccept && onAccept(order.id)}
                        className="flex-1 sm:flex-none"
                    >
                        Terima Pesanan
                    </Button>
                </div>
            )}
        </div>
    )

    return (
        <>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
                size="xl"
                title={
                    <div className="flex items-center gap-3">
                        <span className="text-xl font-bold">
                            {isPickup ? 'Checklist Pengambilan Barang' : `Detail Pesanan #${order.id}`}
                        </span>
                        {!isPickup && <Badge status={order.status} />}
                    </div>
                }
                footer={footerValues}
            >
                <div className="flex flex-col gap-8">
                    {/* Customer & Dates */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Customer Info */}
                        <div className="flex flex-col gap-3">
                            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Informasi Pelanggan</h3>
                            <div className="flex gap-4 items-start bg-gray-50 p-4 rounded-lg">
                                <img
                                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(order.customerName || 'User')}&background=random&color=fff`}
                                    alt={order.customerName}
                                    className="h-14 w-14 rounded-full"
                                />
                                <div className="flex flex-col min-w-0">
                                    <p className="text-gray-900 text-lg font-bold truncate">{order.customerName}</p>
                                    <div className="flex items-center gap-2 mt-1 text-gray-600 text-sm">
                                        <Phone className="w-4 h-4" />
                                        <span className="truncate">{order.phone}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-600 text-sm">
                                        <Mail className="w-4 h-4" />
                                        <span className="truncate">{order.email || '-'}</span>
                                    </div>
                                    <button
                                        onClick={() => setShowIdentityModal(true)}
                                        className="text-sm text-green-600 font-medium hover:text-green-700 flex items-center gap-1.5 mt-2 transition-colors w-fit"
                                    >
                                        <CreditCard className="w-4 h-4" />
                                        Cek Kartu Identitas
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Rental Duration */}
                        <div className="flex flex-col gap-3">
                            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Durasi Rental</h3>
                            <div className="flex items-center bg-gray-50 p-4 rounded-lg h-full">
                                <div className="grid grid-cols-[auto_1fr] gap-x-3 w-full">
                                    <div className="flex flex-col items-center pt-1">
                                        <div className="h-2.5 w-2.5 rounded-full bg-green-600 ring-4 ring-green-100"></div>
                                        <div className="w-[2px] bg-gray-200 h-full min-h-[24px]"></div>
                                        <div className="h-2.5 w-2.5 rounded-full bg-gray-900"></div>
                                    </div>
                                    <div className="flex flex-col justify-between gap-4 py-0.5">
                                        <div>
                                            <p className="text-gray-900 text-sm font-bold">Mulai: {formatDate(order.pickupDate)}</p>
                                            <p className="text-gray-500 text-xs">Pick-up</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-900 text-sm font-bold">Selesai: {formatDate(order.returnDate)}</p>
                                            <p className="text-gray-500 text-xs">Return</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Items Table */}
                    <div className="flex flex-col gap-3">
                        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                            {isPickup ? 'Centang barang yang diserahkan:' : 'Barang yang Disewa'}
                        </h3>
                        <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
                            <table className="w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        {isPickup && <th className="w-12 px-4 py-3 bg-gray-50"></th>}
                                        <th className="px-4 py-3 text-left text-gray-900 text-sm font-medium w-1/2">Nama Barang</th>
                                        <th className="px-4 py-3 text-center text-gray-900 text-sm font-medium">Qty</th>
                                        <th className="px-4 py-3 text-right text-gray-900 text-sm font-medium">Harga Sewa</th>
                                        <th className="px-4 py-3 text-right text-gray-900 text-sm font-medium">Total</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {orderItems.map((item, idx) => {
                                        const isChecked = isPickup ? checklist.find(c => c.itemId === item.itemId)?.checked : false
                                        return (
                                            <tr key={idx} className={isPickup && isChecked ? 'bg-green-50' : ''}>
                                                {isPickup && (
                                                    <td className="px-4 py-3 text-center">
                                                        <input
                                                            type="checkbox"
                                                            checked={!!isChecked}
                                                            onChange={() => toggleItem(item.itemId)}
                                                            className="w-5 h-5 text-green-600 rounded border-gray-300 focus:ring-green-500 cursor-pointer"
                                                        />
                                                    </td>
                                                )}
                                                <td className="px-4 py-3">
                                                    <div className="flex items-center gap-3">
                                                        <div
                                                            className="w-10 h-10 rounded bg-gray-100 bg-cover bg-center"
                                                            style={{ backgroundImage: `url(${item.image || 'https://placehold.co/100'})` }}
                                                        ></div>
                                                        <div className="flex flex-col">
                                                            <span className="text-gray-900 text-sm font-medium">{item.itemName}</span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-3 text-center text-gray-600 text-sm">{item.quantity}</td>
                                                <td className="px-4 py-3 text-right text-gray-600 text-sm">
                                                    Rp {(item.pricePerDay || 0).toLocaleString('id-ID')}
                                                </td>
                                                <td className="px-4 py-3 text-right text-gray-900 text-sm font-medium">
                                                    Rp {(item.total || 0).toLocaleString('id-ID')}
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Payment Details */}
                    <div className="flex flex-col sm:flex-row justify-between gap-6 pt-2">
                        <div className="hidden sm:block flex-1">
                        </div>
                        <div className="flex-1 max-w-sm">
                            <div className="flex flex-col gap-2">
                                <div className="flex justify-between items-center py-1">
                                    <p className="text-gray-600 text-sm">Subtotal</p>
                                    <p className="text-gray-900 text-sm font-medium">Rp {subtotal.toLocaleString('id-ID')}</p>
                                </div>
                                {deposit > 0 && (
                                    <div className="flex justify-between items-center py-1 border-b border-dashed border-gray-200 pb-3">
                                        <div className="flex items-center gap-1">
                                            <p className="text-gray-600 text-sm">Deposit (Refundable)</p>
                                        </div>
                                        <p className="text-gray-900 text-sm font-medium">Rp {deposit.toLocaleString('id-ID')}</p>
                                    </div>
                                )}
                                <div className="flex justify-between items-end pt-2 border-t border-gray-100">
                                    <p className="text-gray-900 text-base font-bold">Total</p>
                                    <p className="text-green-600 text-2xl font-bold tracking-tight">
                                        Rp {grandTotal.toLocaleString('id-ID')}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>

            {/* Identity Skeleton Modal */}
            {showIdentityModal && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
                        {/* Header */}
                        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                                <CreditCard className="w-5 h-5 text-gray-500" />
                                Identitas Pelanggan
                            </h3>
                            <button
                                onClick={() => setShowIdentityModal(false)}
                                className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-1.5 rounded-lg transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Content (Skeleton ID Card) */}
                        <div className="p-8 bg-gray-50 flex justify-center">
                            {/* ID Card Container */}
                            <div className="w-[340px] h-[214px] bg-white rounded-xl shadow-lg border border-gray-200 p-5 relative overflow-hidden group">
                                {/* Shiny/Holographic Effect Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent skew-x-12 opacity-0 group-hover:animate-shimmer pointer-events-none"></div>

                                {/* Top Header Bar (Province/Country) */}
                                <div className="flex flex-col items-center mb-4 gap-1.5">
                                    <div className="h-2 w-1/3 bg-gray-200 rounded animate-pulse"></div>
                                    <div className="h-1.5 w-1/4 bg-gray-100 rounded animate-pulse"></div>
                                </div>

                                <div className="flex gap-4">
                                    {/* Photo Area */}
                                    <div className="w-24 h-32 bg-gray-200 rounded-lg shrink-0 overflow-hidden relative">
                                        <div className="absolute inset-0 flex items-center justify-center text-gray-300">
                                            <User className="w-10 h-10 opacity-50" />
                                        </div>
                                    </div>

                                    {/* Text Info */}
                                    <div className="flex-1 flex flex-col gap-2.5 pt-1">
                                        {/* NIK */}
                                        <div className="flex flex-col gap-1 mb-1">
                                            <div className="h-3 w-10 bg-gray-100 rounded"></div>
                                            <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                                        </div>

                                        {/* Name & Address */}
                                        <div className="flex flex-col gap-2">
                                            <div className="h-3 w-3/4 bg-gray-200 rounded animate-pulse"></div>
                                            <div className="h-3 w-full bg-gray-200 rounded animate-pulse"></div>
                                            <div className="h-3 w-1/2 bg-gray-200 rounded animate-pulse"></div>
                                        </div>

                                        {/* Footer signature line */}
                                        <div className="mt-auto self-end">
                                            <div className="h-8 w-16 bg-gray-100 rounded"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="px-6 py-4 bg-white border-t border-gray-100 text-center text-gray-500 text-xs">
                            Data identitas ini bersifat rahasia dan hanya untuk verifikasi.
                        </div>
                    </div>
                </div>
            )}

            {/* Payment Proof Skeleton Modal */}
            {showPaymentProofModal && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm overflow-hidden animate-in zoom-in-95 duration-200">
                        {/* Header */}
                        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                                <Receipt className="w-5 h-5 text-gray-500" />
                                Bukti Transfer
                            </h3>
                            <button
                                onClick={() => setShowPaymentProofModal(false)}
                                className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-1.5 rounded-lg transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Content (Skeleton Receipt) */}
                        <div className="p-6 bg-gray-100 flex justify-center">
                            <div className="w-full bg-white rounded-lg shadow-sm border border-gray-200 p-6 flex flex-col items-center gap-4 relative">
                                {/* Dashed cut line at top/bottom visual trick (optional) */}

                                {/* Bank Logo Skeleton */}
                                <div className="h-8 w-24 bg-gray-200 rounded mb-2 animate-pulse"></div>

                                {/* Status Success */}
                                <div className="flex flex-col items-center gap-1">
                                    <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center mb-1">
                                        <div className="h-5 w-5 rounded-full bg-green-500/20"></div>
                                    </div>
                                    <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
                                </div>

                                <div className="w-full h-px bg-gray-100 my-1"></div>

                                {/* Details Details */}
                                <div className="w-full flex flex-col gap-3">
                                    {[1, 2, 3, 4].map((i) => (
                                        <div key={i} className="flex justify-between items-center">
                                            <div className="h-3 w-20 bg-gray-100 rounded"></div>
                                            <div className="h-3 w-24 bg-gray-200 rounded animate-pulse"></div>
                                        </div>
                                    ))}
                                    <div className="w-full h-px bg-dashed border-t border-gray-200 my-1"></div>
                                    <div className="flex justify-between items-center">
                                        <div className="h-3 w-16 bg-gray-100 rounded"></div>
                                        <div className="h-5 w-28 bg-gray-200 rounded animate-pulse"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
