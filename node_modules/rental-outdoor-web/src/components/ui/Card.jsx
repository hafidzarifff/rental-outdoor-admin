export default function Card({ children, className = '', hover = false, onClick }) {
    return (
        <div
            className={`
        bg-white rounded-xl border border-gray-100 shadow-sm
        ${hover ? 'hover:shadow-md hover:border-gray-200 transition-all duration-200 cursor-pointer' : ''}
        ${className}
      `}
            onClick={onClick}
        >
            {children}
        </div>
    )
}

export function CardHeader({ children, className = '' }) {
    return (
        <div className={`px-5 py-4 border-b border-gray-100 ${className}`}>
            {children}
        </div>
    )
}

export function CardBody({ children, className = '' }) {
    return (
        <div className={`px-5 py-4 ${className}`}>
            {children}
        </div>
    )
}

export function CardFooter({ children, className = '' }) {
    return (
        <div className={`px-5 py-3 bg-gray-50 border-t border-gray-100 rounded-b-xl ${className}`}>
            {children}
        </div>
    )
}
