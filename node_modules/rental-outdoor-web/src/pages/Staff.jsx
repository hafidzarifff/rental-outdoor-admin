import { useState } from 'react'
import { Plus, Trash2, Phone } from 'lucide-react'
import { useApp } from '../context/AppContext'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import Modal from '../components/ui/Modal'
import EmptyState from '../components/ui/EmptyState'

function StaffFormModal({ isOpen, onClose, onSave }) {
    const [formData, setFormData] = useState({
        name: '',
        role: 'Admin',
        phone: '',
    })
    const [loading, setLoading] = useState(false)

    const handleSave = () => {
        setLoading(true)
        setTimeout(() => {
            onSave(formData)
            setFormData({ name: '', role: 'Admin', phone: '' })
            setLoading(false)
            onClose()
        }, 500)
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Tambah Staff Baru" size="md">
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nama Lengkap</label>
                    <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="Masukkan nama lengkap"
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                    <select
                        value={formData.role}
                        onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                        <option value="Admin">Admin</option>
                        <option value="Gudang">Gudang</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">No. Telepon</label>
                    <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                        placeholder="08xxxxxxxxxx"
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t">
                    <Button variant="secondary" onClick={onClose}>Batal</Button>
                    <Button onClick={handleSave} loading={loading} disabled={!formData.name.trim() || !formData.phone.trim()}>
                        Tambah Staff
                    </Button>
                </div>
            </div>
        </Modal>
    )
}

export default function Staff() {
    const { staff, addStaff, deleteStaff } = useApp()
    const [addModal, setAddModal] = useState(false)

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-lg font-semibold text-gray-900">Manajemen Staff</h2>
                    <p className="text-sm text-gray-500">Kelola data staff dan akses sistem</p>
                </div>
                <Button onClick={() => setAddModal(true)} icon={Plus}>
                    Tambah Staff
                </Button>
            </div>

            {/* Staff Table */}
            <Card>
                {staff.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-100">
                                <tr>
                                    <th className="text-left text-xs font-medium text-gray-500 uppercase px-5 py-3">Staff</th>
                                    <th className="text-left text-xs font-medium text-gray-500 uppercase px-5 py-3">Role</th>
                                    <th className="text-left text-xs font-medium text-gray-500 uppercase px-5 py-3">Kontak</th>
                                    <th className="text-left text-xs font-medium text-gray-500 uppercase px-5 py-3">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {staff.map(member => (
                                    <tr key={member.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-3">
                                                <img
                                                    src={member.avatar}
                                                    alt={member.name}
                                                    className="w-10 h-10 rounded-full"
                                                />
                                                <span className="font-medium text-gray-900">{member.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-5 py-4">
                                            <Badge status={member.role.toLowerCase()} />
                                        </td>
                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-2 text-gray-600">
                                                <Phone className="w-4 h-4" />
                                                <span>{member.phone}</span>
                                            </div>
                                        </td>
                                        <td className="px-5 py-4">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => deleteStaff(member.id)}
                                                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <EmptyState
                        type="empty"
                        title="Belum ada staff"
                        description="Tambahkan staff untuk mengelola sistem"
                        action={
                            <Button onClick={() => setAddModal(true)}>Tambah Staff Pertama</Button>
                        }
                    />
                )}
            </Card>

            {/* Add Modal */}
            <StaffFormModal
                isOpen={addModal}
                onClose={() => setAddModal(false)}
                onSave={addStaff}
            />
        </div>
    )
}
