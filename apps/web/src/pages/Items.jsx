import { useState } from 'react'
import { Plus, Edit2, Wrench, Package } from 'lucide-react'
import { useApp } from '../context/AppContext'
import Card, { CardBody } from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import Modal from '../components/ui/Modal'
import EmptyState from '../components/ui/EmptyState'

function ItemCard({ item, category, onEdit, onToggleMaintenance }) {
    const stockPercentage = item.stock > 0 ? (item.available / item.stock) * 100 : 0

    return (
        <Card className="overflow-hidden">
            <div className="relative h-40 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                <Package className="w-16 h-16 text-gray-300" />
                {item.condition === 'maintenance' && (
                    <div className="absolute inset-0 bg-orange-500/20 flex items-center justify-center">
                        <div className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                            <Wrench className="w-3 h-3" /> Maintenance
                        </div>
                    </div>
                )}
            </div>
            <CardBody className="p-4">
                <div className="flex items-start justify-between mb-2">
                    <div>
                        <h3 className="font-semibold text-gray-900">{item.name}</h3>
                        <p className="text-sm text-gray-500">{category?.name || 'Uncategorized'}</p>
                    </div>
                    <Badge status={item.condition} />
                </div>

                <div className="flex items-center justify-between text-sm mb-3">
                    <span className="text-gray-600">Harga/hari</span>
                    <span className="font-semibold text-green-600">
                        Rp {item.pricePerDay.toLocaleString('id-ID')}
                    </span>
                </div>

                <div className="space-y-1 mb-4">
                    <div className="flex justify-between text-xs">
                        <span className="text-gray-600">Stok: {item.available}/{item.stock}</span>
                        <span className={`font-medium ${stockPercentage > 50 ? 'text-green-600' : stockPercentage > 20 ? 'text-yellow-600' : 'text-red-600'
                            }`}>
                            {stockPercentage.toFixed(0)}%
                        </span>
                    </div>
                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                            className={`h-full rounded-full transition-all duration-500 ${stockPercentage > 50 ? 'bg-green-500' : stockPercentage > 20 ? 'bg-yellow-500' : 'bg-red-500'
                                }`}
                            style={{ width: `${stockPercentage}%` }}
                        />
                    </div>
                </div>

                <div className="flex gap-2">
                    <Button variant="secondary" size="sm" className="flex-1" onClick={() => onEdit(item)}>
                        <Edit2 className="w-4 h-4" /> Edit
                    </Button>
                    <Button
                        variant={item.condition === 'maintenance' ? 'warning' : 'ghost'}
                        size="sm"
                        onClick={() => onToggleMaintenance(item.id)}
                        title={item.condition === 'maintenance' ? 'Selesai Maintenance' : 'Set Maintenance'}
                    >
                        <Wrench className="w-4 h-4" />
                    </Button>
                </div>
            </CardBody>
        </Card>
    )
}

function ItemFormModal({ isOpen, onClose, item, categories, onSave }) {
    const [formData, setFormData] = useState({
        name: item?.name || '',
        categoryId: item?.categoryId || categories[0]?.id || 1,
        stock: item?.stock || 1,
        available: item?.available || 1,
        pricePerDay: item?.pricePerDay || 0,
    })
    const [loading, setLoading] = useState(false)

    const handleSave = () => {
        setLoading(true)
        setTimeout(() => {
            onSave({ ...item, ...formData })
            setLoading(false)
            onClose()
        }, 500)
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={item ? 'Edit Barang' : 'Tambah Barang'} size="md">
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nama Barang</label>
                    <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="Contoh: Tenda Dome 2P"
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Kategori</label>
                    <select
                        value={formData.categoryId}
                        onChange={(e) => setFormData(prev => ({ ...prev, categoryId: parseInt(e.target.value) }))}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                        {categories.map(cat => (
                            <option key={cat.id} value={cat.id}>{cat.icon} {cat.name}</option>
                        ))}
                    </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Total Stok</label>
                        <input
                            type="number"
                            value={formData.stock}
                            onChange={(e) => setFormData(prev => ({ ...prev, stock: parseInt(e.target.value) || 0 }))}
                            min="0"
                            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Tersedia</label>
                        <input
                            type="number"
                            value={formData.available}
                            onChange={(e) => setFormData(prev => ({ ...prev, available: parseInt(e.target.value) || 0 }))}
                            min="0"
                            max={formData.stock}
                            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Harga per Hari (Rp)</label>
                    <input
                        type="number"
                        value={formData.pricePerDay}
                        onChange={(e) => setFormData(prev => ({ ...prev, pricePerDay: parseInt(e.target.value) || 0 }))}
                        min="0"
                        step="1000"
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t">
                    <Button variant="secondary" onClick={onClose}>Batal</Button>
                    <Button onClick={handleSave} loading={loading} disabled={!formData.name.trim()}>
                        {item ? 'Simpan Perubahan' : 'Tambah Barang'}
                    </Button>
                </div>
            </div>
        </Modal>
    )
}

export default function Items() {
    const { items, categories, toggleMaintenance, addItem, updateItem } = useApp()
    const [filterCategory, setFilterCategory] = useState('all')
    const [editModal, setEditModal] = useState({ isOpen: false, item: null })

    const filteredItems = filterCategory === 'all'
        ? items
        : items.filter(item => item.categoryId === parseInt(filterCategory))

    const getCategoryById = (id) => categories.find(c => c.id === id)

    const handleSave = (itemData) => {
        if (itemData.id) {
            updateItem(itemData)
        } else {
            addItem(itemData)
        }
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-lg font-semibold text-gray-900">Daftar Barang</h2>
                    <p className="text-sm text-gray-500">Kelola inventaris barang rental</p>
                </div>
                <div className="flex items-center gap-3">
                    <select
                        value={filterCategory}
                        onChange={(e) => setFilterCategory(e.target.value)}
                        className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                    >
                        <option value="all">Semua Kategori</option>
                        {categories.map(cat => (
                            <option key={cat.id} value={cat.id}>{cat.icon} {cat.name}</option>
                        ))}
                    </select>
                    <Button onClick={() => setEditModal({ isOpen: true, item: null })} icon={Plus}>
                        Tambah Barang
                    </Button>
                </div>
            </div>

            {/* Items Grid */}
            {filteredItems.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {filteredItems.map(item => (
                        <ItemCard
                            key={item.id}
                            item={item}
                            category={getCategoryById(item.categoryId)}
                            onEdit={(it) => setEditModal({ isOpen: true, item: it })}
                            onToggleMaintenance={toggleMaintenance}
                        />
                    ))}
                </div>
            ) : (
                <Card>
                    <EmptyState
                        type="empty"
                        title="Tidak ada barang"
                        description={filterCategory === 'all'
                            ? 'Belum ada barang yang terdaftar'
                            : 'Tidak ada barang di kategori ini'
                        }
                        action={
                            <Button onClick={() => setEditModal({ isOpen: true, item: null })}>
                                Tambah Barang Pertama
                            </Button>
                        }
                    />
                </Card>
            )}

            {/* Edit Modal */}
            <ItemFormModal
                isOpen={editModal.isOpen}
                onClose={() => setEditModal({ isOpen: false, item: null })}
                item={editModal.item}
                categories={categories}
                onSave={handleSave}
            />
        </div>
    )
}
