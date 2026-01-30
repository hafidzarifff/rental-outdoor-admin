import Sidebar from './Sidebar'
import Header from './Header'
import Toast from '../ui/Toast'

export default function Layout({ children }) {
    return (
        <div className="min-h-screen bg-gray-50">
            <Sidebar />
            <div className="ml-64">
                <Header />
                <main className="p-6">
                    {children}
                </main>
            </div>
            <Toast />
        </div>
    )
}
