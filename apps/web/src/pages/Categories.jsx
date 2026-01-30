import { useState } from 'react'
import { Plus, Edit2, Trash2 } from 'lucide-react'
import { useApp } from '../context/AppContext'
import Card, { CardBody } from '../components/ui/Card'
import Button from '../components/ui/Button'
import Modal from '../components/ui/Modal'

function StockBar({ available, total }) {
    const percentage = total > 0 ? (available / total) * 100 : 0
    let barClass = 'stock-bar-high'
    if (percentage <= 40) barClass = 'stock-bar-low'
    else if (percentage <= 70) barClass = 'stock-bar-medium'

    return (
        <div className="space-y-1">
            <div className="flex justify-between text-xs">
                <span className="text-gray-600">Tersedia: {available}/{total}</span>
                <span className="font-medium text-gray-900">{percentage.toFixed(0)}%</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                    className={`h-full rounded-full transition-all duration-500 ${barClass}`}
                    style={{ width: `${percentage}%` }}
                />
            </div>
        </div>
    )
}

function CategoryCard({ category, onEdit }) {
    return (
        <Card hover className="overflow-hidden">
            <CardBody className="p-5">
                <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-2xl">
                            {category.icon}
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900">{category.name}</h3>
                            <p className="text-sm text-gray-500">{category.totalStock} unit total</p>
                        </div>
                    </div>
                    <button
                        onClick={() => onEdit(category)}
                        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <Edit2 className="w-4 h-4" />
                    </button>
                </div>
                <StockBar available={category.available} total={category.totalStock} />
            </CardBody>
        </Card>
    )
}

function CategoryFormModal({ isOpen, onClose, category, onSave }) {
    const [formData, setFormData] = useState({
        name: category?.name || '',
        icon: category?.icon || '📦',
    })
    const [loading, setLoading] = useState(false)

    const icons = ['⛺', '🎒', '🛏️', '🍳', '🔦', '🧗', '🏕️', '🥾', '🧭', '📦']

    const handleSave = () => {
        setLoading(true)
        setTimeout(() => {
            onSave({ ...category, ...formData })
            setLoading(false)
            onClose()
        }, 500)
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={category ? 'Edit Kategori' : 'Tambah Kategori'} size="md">
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nama Kategori
                    </label>
                    <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="Contoh: Tenda"
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Icon
                    </label>
                    <div className="flex flex-wrap gap-2">
                        {icons.map(icon => (
                            <button
                                key={icon}
                                onClick={() => setFormData(prev => ({ ...prev, icon }))}
                                className={`w-12 h-12 rounded-lg text-xl flex items-center justify-center transition-all ${formData.icon === icon
                                    ? 'bg-green-100 border-2 border-green-500 scale-110'
                                    : 'bg-gray-100 border border-gray-200 hover:bg-gray-200'
                                    }`}
                            >
                                {icon}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t">
                    <Button variant="secondary" onClick={onClose}>Batal</Button>
                    <Button onClick={handleSave} loading={loading} disabled={!formData.name.trim()}>
                        {category ? 'Simpan Perubahan' : 'Tambah Kategori'}
                    </Button>
                </div>
            </div>
        </Modal>
    )
}

export default function Categories() {
    const { categories, addCategory, updateCategory } = useApp()
    const [editModal, setEditModal] = useState({ isOpen: false, category: null })

    const handleSave = (categoryData) => {
        if (categoryData.id) {
            updateCategory(categoryData)
        } else {
            addCategory(categoryData)
        }
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-lg font-semibold text-gray-900">Kategori Barang</h2>
                    <p className="text-sm text-gray-500">Kelola kategori dan lihat ketersediaan stok</p>
                </div>
                <Button onClick={() => setEditModal({ isOpen: true, category: null })} icon={Plus}>
                    Tambah Kategori
                </Button>
            </div>

            {/* Categories Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categories.map(category => (
                    <CategoryCard
                        key={category.id}
                        category={category}
                        onEdit={(cat) => setEditModal({ isOpen: true, category: cat })}
                    />
                ))}
            </div>

            {/* Edit Modal */}
            <CategoryFormModal
                isOpen={editModal.isOpen}
                onClose={() => setEditModal({ isOpen: false, category: null })}
                category={editModal.category}
                onSave={handleSave}
            />
        </div>
    )
}
