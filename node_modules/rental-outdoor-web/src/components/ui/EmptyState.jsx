import { Package, Inbox, Search } from 'lucide-react'

const illustrations = {
    empty: Package,
    noResults: Search,
    inbox: Inbox,
}

export default function EmptyState({
    type = 'empty',
    title = 'Tidak ada data',
    description = 'Belum ada data untuk ditampilkan saat ini.',
    action
}) {
    const Icon = illustrations[type] || illustrations.empty

    return (
        <div className="flex flex-col items-center justify-center py-12 px-4">
            <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                <Icon className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">{title}</h3>
            <p className="text-sm text-gray-500 text-center max-w-sm mb-4">{description}</p>
            {action}
        </div>
    )
}
