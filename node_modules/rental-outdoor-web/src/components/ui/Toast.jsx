import { CheckCircle, XCircle, Info, AlertTriangle, X } from 'lucide-react'
import { useApp } from '../../context/AppContext'

const toastStyles = {
    success: {
        bg: 'bg-green-50 border-green-200',
        icon: CheckCircle,
        iconColor: 'text-green-500',
    },
    error: {
        bg: 'bg-red-50 border-red-200',
        icon: XCircle,
        iconColor: 'text-red-500',
    },
    info: {
        bg: 'bg-blue-50 border-blue-200',
        icon: Info,
        iconColor: 'text-blue-500',
    },
    warning: {
        bg: 'bg-yellow-50 border-yellow-200',
        icon: AlertTriangle,
        iconColor: 'text-yellow-500',
    },
}

function ToastItem({ toast, onRemove }) {
    const style = toastStyles[toast.type] || toastStyles.info
    const Icon = style.icon

    return (
        <div className={`flex items-center gap-3 px-4 py-3 rounded-lg border shadow-lg toast-enter ${style.bg}`}>
            <Icon className={`w-5 h-5 ${style.iconColor}`} />
            <p className="text-sm font-medium text-gray-800 flex-1">{toast.message}</p>
            <button
                onClick={() => onRemove(toast.id)}
                className="p-1 hover:bg-white/50 rounded transition-colors"
            >
                <X className="w-4 h-4 text-gray-500" />
            </button>
        </div>
    )
}

export default function Toast() {
    const { toasts, removeToast } = useApp()

    if (toasts.length === 0) return null

    return (
        <div className="fixed top-4 right-4 z-[100] flex flex-col gap-2 min-w-[320px]">
            {toasts.map(toast => (
                <ToastItem key={toast.id} toast={toast} onRemove={removeToast} />
            ))}
        </div>
    )
}
