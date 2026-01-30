import { useLocation } from 'react-router-dom'
import { Bell, Search } from 'lucide-react'
import { useApp } from '../../context/AppContext'

const pageTitles = {
    '/': 'Dashboard',
    '/orders': 'Manajemen Pesanan',
    '/categories': 'Kategori Barang',
    '/items': 'Daftar Barang',
    '/staff': 'Manajemen Staff',
}

export default function Header() {
    const location = useLocation()
    const { orders } = useApp()

    const title = pageTitles[location.pathname] || 'Dashboard'
    const pendingCount = orders.filter(o => o.status === 'pending').length

    return (
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-100">
            <div className="flex items-center justify-between px-6 py-4">
                {/* Title */}
                <div>
                    <h1 className="text-xl font-bold text-gray-900">{title}</h1>
                    <p className="text-sm text-gray-500">
                        {new Date().toLocaleDateString('id-ID', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}
                    </p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3">
                    {/* Search */}
                    <div className="relative hidden md:block">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Cari pesanan, barang..."
                            className="pl-10 pr-4 py-2 w-64 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                    </div>

                    {/* Notifications */}
                    <button className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                        <Bell className="w-5 h-5" />
                        {pendingCount > 0 && (
                            <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                                {pendingCount}
                            </span>
                        )}
                    </button>
                </div>
            </div>
        </header>
    )
}
