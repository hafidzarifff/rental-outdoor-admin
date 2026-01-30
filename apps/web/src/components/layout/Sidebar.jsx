import { NavLink, useLocation } from 'react-router-dom'
import {
    LayoutDashboard,
    ShoppingBag,
    FolderOpen,
    Package,
    Users,
    Tent
} from 'lucide-react'
import { useApp } from '../../context/AppContext'

const mainMenuItems = [
    { path: '/', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/orders', label: 'Pesanan', icon: ShoppingBag },
]

const inventoryMenuItems = [
    { path: '/categories', label: 'Kategori Barang', icon: FolderOpen },
    { path: '/items', label: 'Barang', icon: Package },
]

const otherMenuItems = [
    { path: '/staff', label: 'Staff', icon: Users },
]

function MenuSection({ title, items }) {
    return (
        <div className="mb-6">
            {title && (
                <h3 className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                    {title}
                </h3>
            )}
            <nav className="space-y-1">
                {items.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) => `
              flex items-center gap-3 px-4 py-2.5 mx-2 rounded-lg text-sm font-medium
              transition-all duration-200
              ${isActive
                                ? 'bg-green-50 text-green-700 shadow-sm'
                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                            }
            `}
                    >
                        <item.icon className="w-5 h-5" />
                        <span>{item.label}</span>
                    </NavLink>
                ))}
            </nav>
        </div>
    )
}

export default function Sidebar() {
    const { user, logout } = useApp()
    return (
        <aside className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-200 flex flex-col z-40">
            {/* Logo */}
            <div className="flex items-center gap-3 px-6 py-5 border-b border-gray-100">
                <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
                    <Tent className="w-6 h-6 text-white" />
                </div>
                <div>
                    <h1 className="text-md font-bold text-gray-900">Tiga Titik Outdoor</h1>
                    <p className="text-xs text-gray-500">Management System</p>
                </div>
            </div>

            {/* Menu */}
            <div className="flex-1 overflow-y-auto py-4">
                <MenuSection items={mainMenuItems} />
                <MenuSection title="Inventaris" items={inventoryMenuItems} />
                <MenuSection title="Lainnya" items={otherMenuItems} />
            </div>

            {/* Footer */}
            <div className="px-4 py-4 border-t border-gray-100">
                <button
                    onClick={logout}
                    className="w-full flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-red-50 hover:text-red-700 transition-colors group text-left"
                    title="Klik untuk keluar"
                >
                    <img
                        src={user?.avatar || "https://ui-avatars.com/api/?name=Admin&background=22c55e&color=fff"}
                        alt={user?.name || "Admin"}
                        className="w-9 h-9 rounded-full ring-2 ring-gray-100 group-hover:ring-red-200 transition-all"
                    />
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 group-hover:text-red-700 truncate">
                            {user?.name || 'Admin'}
                        </p>
                        <p className="text-xs text-gray-500 group-hover:text-red-500 truncate">
                            {user?.email || 'admin@rental.com'}
                        </p>
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                    </div>
                </button>
            </div>
        </aside>
    )
}
