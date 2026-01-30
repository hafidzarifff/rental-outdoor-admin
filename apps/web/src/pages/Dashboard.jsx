import { useNavigate } from 'react-router-dom'
import { ShoppingBag, Package, AlertTriangle, TrendingUp, ArrowRight, Clock } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { useApp } from '../context/AppContext'
import { monthlyRevenue } from '../data/dummyData'
import Card, { CardHeader, CardBody } from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'

function StatCard({ title, value, icon: Icon, gradient, trend, onClick }) {
    return (
        <Card hover onClick={onClick} className="overflow-hidden">
            <CardBody className="p-5">
                <div className="flex items-start justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
                        <p className="text-3xl font-bold text-gray-900">{value}</p>
                        {trend && (
                            <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                                <TrendingUp className="w-3 h-3" />
                                {trend}
                            </p>
                        )}
                    </div>
                    <div className={`w-12 h-12 rounded-xl ${gradient} flex items-center justify-center`}>
                        <Icon className="w-6 h-6 text-white" />
                    </div>
                </div>
            </CardBody>
        </Card>
    )
}

function ActionNeededTable({ orders, onViewOrder }) {
    const actionOrders = orders.filter(o =>
        o.status === 'pending' ||
        (o.status === 'rented' && new Date(o.returnDate) <= new Date())
    ).slice(0, 5)

    const isOverdue = (order) => {
        if (order.status !== 'rented') return false
        const today = new Date().setHours(0, 0, 0, 0)
        const returnDate = new Date(order.returnDate).setHours(0, 0, 0, 0)
        return today > returnDate
    }

    return (
        <Card>
            <CardHeader className="flex items-center justify-between">
                <div>
                    <h3 className="font-semibold text-gray-900">Perlu Tindakan</h3>
                    <p className="text-sm text-gray-500">Pesanan yang membutuhkan perhatian</p>
                </div>
                <Button variant="ghost" size="sm" onClick={() => onViewOrder()}>
                    Lihat Semua <ArrowRight className="w-4 h-4" />
                </Button>
            </CardHeader>
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50 border-y border-gray-100">
                        <tr>
                            <th className="text-left text-xs font-medium text-gray-500 uppercase px-5 py-3">ID Pesanan</th>
                            <th className="text-left text-xs font-medium text-gray-500 uppercase px-5 py-3">Pelanggan</th>
                            <th className="text-left text-xs font-medium text-gray-500 uppercase px-5 py-3">Status</th>
                            <th className="text-left text-xs font-medium text-gray-500 uppercase px-5 py-3">Tanggal</th>
                            <th className="text-left text-xs font-medium text-gray-500 uppercase px-5 py-3">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {actionOrders.map(order => (
                            <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-5 py-4">
                                    <span className="font-medium text-gray-900">{order.id}</span>
                                </td>
                                <td className="px-5 py-4">
                                    <div>
                                        <p className="font-medium text-gray-900">{order.customerName}</p>
                                        <p className="text-sm text-gray-500">{order.phone}</p>
                                    </div>
                                </td>
                                <td className="px-5 py-4">
                                    <Badge status={isOverdue(order) ? 'overdue' : order.status} />
                                </td>
                                <td className="px-5 py-4">
                                    <div className="flex items-center gap-1 text-sm text-gray-500">
                                        <Clock className="w-4 h-4" />
                                        {order.status === 'pending'
                                            ? new Date(order.pickupDate).toLocaleDateString('id-ID')
                                            : new Date(order.returnDate).toLocaleDateString('id-ID')
                                        }
                                    </div>
                                </td>
                                <td className="px-5 py-4">
                                    <Button variant="outline" size="sm" onClick={() => onViewOrder()}>
                                        Proses
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Card>
    )
}

function RevenueChart() {
    const formatCurrency = (value) => {
        return `${(value / 1000000).toFixed(1)}jt`
    }

    return (
        <Card>
            <CardHeader>
                <div>
                    <h3 className="font-semibold text-gray-900">Pendapatan Bulanan</h3>
                    <p className="text-sm text-gray-500">Tren pendapatan 6 bulan terakhir</p>
                </div>
            </CardHeader>
            <CardBody className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={monthlyRevenue} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                        <XAxis
                            dataKey="month"
                            tick={{ fontSize: 12, fill: '#64748b' }}
                            axisLine={{ stroke: '#e2e8f0' }}
                        />
                        <YAxis
                            tickFormatter={formatCurrency}
                            tick={{ fontSize: 12, fill: '#64748b' }}
                            axisLine={{ stroke: '#e2e8f0' }}
                        />
                        <Tooltip
                            formatter={(value) => [`Rp ${value.toLocaleString('id-ID')}`, 'Pendapatan']}
                            contentStyle={{
                                backgroundColor: 'white',
                                border: '1px solid #e2e8f0',
                                borderRadius: '8px',
                                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                            }}
                        />
                        <Line
                            type="monotone"
                            dataKey="revenue"
                            stroke="#22c55e"
                            strokeWidth={3}
                            dot={{ fill: '#22c55e', strokeWidth: 2, r: 4 }}
                            activeDot={{ r: 6, fill: '#16a34a' }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </CardBody>
        </Card>
    )
}

export default function Dashboard() {
    const navigate = useNavigate()
    const { orders, getStats } = useApp()
    const stats = getStats()

    return (
        <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                    title="Pesanan Baru"
                    value={stats.pendingOrders}
                    icon={ShoppingBag}
                    gradient="gradient-pending"
                    onClick={() => navigate('/orders')}
                />
                <StatCard
                    title="Barang Keluar"
                    value={stats.rentedItems}
                    icon={Package}
                    gradient="gradient-rented"
                />
                <StatCard
                    title="Terlambat"
                    value={stats.overdueOrders}
                    icon={AlertTriangle}
                    gradient="gradient-overdue"
                    onClick={() => navigate('/orders')}
                />
                <StatCard
                    title="Total Pendapatan"
                    value={`Rp ${(stats.totalRevenue / 1000000).toFixed(1)}jt`}
                    icon={TrendingUp}
                    gradient="gradient-primary"
                    trend="+12% dari bulan lalu"
                />
            </div>

            {/* Charts and Tables */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <RevenueChart />
                <ActionNeededTable orders={orders} onViewOrder={() => navigate('/orders')} />
            </div>
        </div>
    )
}
