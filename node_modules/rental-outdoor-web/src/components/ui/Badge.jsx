const statusStyles = {
    pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    confirmed: 'bg-blue-100 text-blue-800 border-blue-200',
    rented: 'bg-purple-100 text-purple-800 border-purple-200',
    completed: 'bg-green-100 text-green-800 border-green-200',
    overdue: 'bg-red-100 text-red-800 border-red-200',
    rejected: 'bg-red-100 text-red-800 border-red-200',
    good: 'bg-green-100 text-green-800 border-green-200',
    damaged: 'bg-red-100 text-red-800 border-red-200',
    maintenance: 'bg-orange-100 text-orange-800 border-orange-200',
    admin: 'bg-blue-100 text-blue-800 border-blue-200',
    gudang: 'bg-green-100 text-green-800 border-green-200',
}

const statusLabels = {
    pending: 'Menunggu',
    confirmed: 'Siap Diambil',
    rented: 'Sedang Disewa',
    completed: 'Selesai',
    overdue: 'Terlambat',
    rejected: 'Ditolak',
    good: 'Baik',
    damaged: 'Rusak',
    maintenance: 'Maintenance',
    admin: 'Admin',
    gudang: 'Gudang',
}

export default function Badge({ status, className = '' }) {
    const style = statusStyles[status?.toLowerCase()] || 'bg-gray-100 text-gray-800 border-gray-200'
    const label = statusLabels[status?.toLowerCase()] || status

    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${style} ${className}`}>
            {label}
        </span>
    )
}
