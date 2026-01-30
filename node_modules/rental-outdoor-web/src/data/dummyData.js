// Dummy data untuk prototype penyewaan alat kemah

export const categories = [
    { id: 1, name: 'Tenda', icon: '⛺', totalStock: 25, available: 18 },
    { id: 2, name: 'Tas Carrier', icon: '🎒', totalStock: 30, available: 22 },
    { id: 3, name: 'Sleeping Bag', icon: '🛏️', totalStock: 40, available: 35 },
    { id: 4, name: 'Peralatan Masak', icon: '🍳', totalStock: 20, available: 8 },
    { id: 5, name: 'Perlengkapan Lainnya', icon: '🔦', totalStock: 50, available: 42 },
]

export const items = [
    // Tenda
    { id: 1, name: 'Tenda Dome 2P', categoryId: 1, stock: 8, available: 6, pricePerDay: 50000, image: '/images/tent-dome-2p.jpg', condition: 'good' },
    { id: 2, name: 'Tenda Dome 4P', categoryId: 1, stock: 6, available: 4, pricePerDay: 75000, image: '/images/tent-dome-4p.jpg', condition: 'good' },
    { id: 3, name: 'Tenda Dome 6P', categoryId: 1, stock: 4, available: 3, pricePerDay: 100000, image: '/images/tent-dome-6p.jpg', condition: 'good' },
    { id: 4, name: 'Flysheet 3x4m', categoryId: 1, stock: 7, available: 5, pricePerDay: 25000, image: '/images/flysheet.jpg', condition: 'good' },

    // Tas Carrier
    { id: 5, name: 'Carrier 40L', categoryId: 2, stock: 10, available: 8, pricePerDay: 35000, image: '/images/carrier-40l.jpg', condition: 'good' },
    { id: 6, name: 'Carrier 60L', categoryId: 2, stock: 12, available: 9, pricePerDay: 45000, image: '/images/carrier-60l.jpg', condition: 'good' },
    { id: 7, name: 'Carrier 80L', categoryId: 2, stock: 8, available: 5, pricePerDay: 55000, image: '/images/carrier-80l.jpg', condition: 'maintenance' },

    // Sleeping Bag
    { id: 8, name: 'Sleeping Bag Polar', categoryId: 3, stock: 20, available: 18, pricePerDay: 25000, image: '/images/sb-polar.jpg', condition: 'good' },
    { id: 9, name: 'Sleeping Bag Dacron', categoryId: 3, stock: 15, available: 12, pricePerDay: 30000, image: '/images/sb-dacron.jpg', condition: 'good' },
    { id: 10, name: 'Matras Foam', categoryId: 3, stock: 25, available: 20, pricePerDay: 15000, image: '/images/matras.jpg', condition: 'good' },

    // Peralatan Masak
    { id: 11, name: 'Kompor Portable', categoryId: 4, stock: 8, available: 3, pricePerDay: 30000, image: '/images/kompor.jpg', condition: 'good' },
    { id: 12, name: 'Cooking Set', categoryId: 4, stock: 6, available: 2, pricePerDay: 25000, image: '/images/cooking-set.jpg', condition: 'good' },
    { id: 13, name: 'Nesting 3P', categoryId: 4, stock: 6, available: 3, pricePerDay: 20000, image: '/images/nesting.jpg', condition: 'maintenance' },

    // Perlengkapan Lainnya
    { id: 14, name: 'Headlamp', categoryId: 5, stock: 15, available: 12, pricePerDay: 10000, image: '/images/headlamp.jpg', condition: 'good' },
    { id: 15, name: 'Trekking Pole', categoryId: 5, stock: 20, available: 18, pricePerDay: 15000, image: '/images/trekking-pole.jpg', condition: 'good' },
    { id: 16, name: 'Hammock', categoryId: 5, stock: 10, available: 8, pricePerDay: 20000, image: '/images/hammock.jpg', condition: 'good' },
    { id: 17, name: 'Rain Cover', categoryId: 5, stock: 12, available: 10, pricePerDay: 10000, image: '/images/rain-cover.jpg', condition: 'good' },
]

export const orders = [
    // SCENARIO: Pesanan Masuk (Pending) untuk BESOK
    {
        id: 'ORD-001',
        customerName: 'Ahmad Fauzi',
        phone: '081234567890',
        email: 'ahmad@email.com',
        items: [
            { itemId: 1, itemName: 'Tenda Dome 2P', quantity: 1, pricePerDay: 50000, condition: null },
            { itemId: 8, itemName: 'Sleeping Bag Polar', quantity: 2, pricePerDay: 25000, condition: null },
            { itemId: 11, itemName: 'Kompor Portable', quantity: 1, pricePerDay: 30000, condition: null },
        ],
        duration: 3,
        totalPrice: 130000,
        penalty: 0,
        status: 'pending',
        paymentProof: 'https://placehold.co/400x600/22c55e/white?text=Bukti+Transfer',
        pickupDate: '2026-01-31', // Besok
        returnDate: '2026-02-03',
        createdAt: '2026-01-30T08:30:00', // Pagi ini
        notes: 'Pengambilan sore jam 4',
    },
    // SCENARIO: Pesanan Masuk (Pending) untuk BESOK
    {
        id: 'ORD-002',
        customerName: 'Siti Nurhaliza',
        phone: '082345678901',
        email: 'siti@email.com',
        items: [
            { itemId: 2, itemName: 'Tenda Dome 4P', quantity: 1, pricePerDay: 75000, condition: null },
            { itemId: 6, itemName: 'Carrier 60L', quantity: 2, pricePerDay: 45000, condition: null },
            { itemId: 9, itemName: 'Sleeping Bag Dacron', quantity: 4, pricePerDay: 30000, condition: null },
        ],
        duration: 2,
        totalPrice: 285000,
        penalty: 0,
        status: 'pending',
        paymentProof: 'https://placehold.co/400x600/3b82f6/white?text=Bukti+Transfer',
        pickupDate: '2026-01-31', // Besok
        returnDate: '2026-02-02',
        createdAt: '2026-01-30T09:15:00', // Pagi ini
        notes: '',
    },
    // SCENARIO: Sudah Konfirmasi (Confirmed) siap diambil BESOK
    {
        id: 'ORD-003',
        customerName: 'Budi Santoso',
        phone: '083456789012',
        email: 'budi@email.com',
        items: [
            { itemId: 3, itemName: 'Tenda Dome 6P', quantity: 1, pricePerDay: 100000, condition: null },
            { itemId: 12, itemName: 'Cooking Set', quantity: 1, pricePerDay: 25000, condition: null },
            { itemId: 14, itemName: 'Headlamp', quantity: 4, pricePerDay: 10000, condition: null },
        ],
        duration: 4,
        totalPrice: 165000,
        penalty: 0,
        status: 'confirmed',
        paymentProof: 'https://placehold.co/400x600/8b5cf6/white?text=Bukti+Transfer',
        pickupDate: '2026-01-31', // Besok
        returnDate: '2026-02-04',
        createdAt: '2026-01-29T14:20:00', // Kemarin
        notes: 'Sudah konfirmasi via WA',
    },
    // SCENARIO: Sedang Disewa (Rented) - Status AMAN (Belum telat)
    {
        id: 'ORD-004',
        customerName: 'Dewi Lestari',
        phone: '084567890123',
        email: 'dewi@email.com',
        items: [
            { itemId: 5, itemName: 'Carrier 40L', quantity: 2, pricePerDay: 35000, condition: 'good' },
            { itemId: 10, itemName: 'Matras Foam', quantity: 2, pricePerDay: 15000, condition: 'good' },
            { itemId: 15, itemName: 'Trekking Pole', quantity: 2, pricePerDay: 15000, condition: null },
        ],
        duration: 3,
        totalPrice: 130000,
        penalty: 0,
        status: 'rented',
        paymentProof: 'https://placehold.co/400x600/eab308/white?text=Bukti+Transfer',
        pickupDate: '2026-01-29', // Diambil Kemarin
        returnDate: '2026-02-01', // Kembali Lusa
        createdAt: '2026-01-28T10:00:00',
        checklist: [
            { itemId: 5, checked: true },
            { itemId: 10, checked: true },
            { itemId: 15, checked: true },
        ],
        notes: '',
    },
    // SCENARIO: KASUS TERLAMBAT (OVERDUE)
    // Hari ini tgl 30, harusnya kembali tgl 28.
    {
        id: 'ORD-005',
        customerName: 'Eko Prasetyo',
        phone: '085678901234',
        email: 'eko@email.com',
        items: [
            { itemId: 1, itemName: 'Tenda Dome 2P', quantity: 2, pricePerDay: 50000, condition: 'good' },
            { itemId: 8, itemName: 'Sleeping Bag Polar', quantity: 4, pricePerDay: 25000, condition: 'good' },
            { itemId: 16, itemName: 'Hammock', quantity: 2, pricePerDay: 20000, condition: 'good' },
        ],
        duration: 2,
        totalPrice: 240000,
        penalty: 0, // Sistem harusnya menghitung denda otomatis saat render
        status: 'rented', // Masih rented padahal tanggal lewat
        paymentProof: 'https://placehold.co/400x600/ef4444/white?text=Bukti+Transfer',
        pickupDate: '2026-01-26',
        returnDate: '2026-01-28', // JATUH TEMPO (2 hari lalu)
        createdAt: '2026-01-25T16:30:00',
        checklist: [
            { itemId: 1, checked: true },
            { itemId: 8, checked: true },
            { itemId: 16, checked: true },
        ],
        notes: 'OVERDUE - Belum dikembalikan, sulit dihubungi',
    },
    // SCENARIO: Baru Selesai (Completed) Kemarin
    {
        id: 'ORD-006',
        customerName: 'Fitri Handayani',
        phone: '086789012345',
        email: 'fitri@email.com',
        items: [
            { itemId: 2, itemName: 'Tenda Dome 4P', quantity: 1, pricePerDay: 75000, condition: 'good' },
            { itemId: 11, itemName: 'Kompor Portable', quantity: 1, pricePerDay: 30000, condition: 'good' },
        ],
        duration: 3,
        totalPrice: 105000,
        penalty: 0,
        status: 'completed',
        paymentProof: 'https://placehold.co/400x600/22c55e/white?text=Bukti+Transfer',
        pickupDate: '2026-01-26',
        returnDate: '2026-01-29', // Kembali Kemarin
        createdAt: '2026-01-25T11:00:00',
        completedAt: '2026-01-29T14:00:00',
        notes: '',
    },
    // SCENARIO: Selesai Minggu Lalu (History)
    {
        id: 'ORD-007',
        customerName: 'Gilang Ramadhan',
        phone: '087890123456',
        email: 'gilang@email.com',
        items: [
            { itemId: 6, itemName: 'Carrier 60L', quantity: 3, pricePerDay: 45000, condition: 'good' },
            { itemId: 9, itemName: 'Sleeping Bag Dacron', quantity: 3, pricePerDay: 30000, condition: 'damaged' },
        ],
        duration: 4,
        totalPrice: 225000,
        penalty: 75000,
        status: 'completed',
        paymentProof: 'https://placehold.co/400x600/8b5cf6/white?text=Bukti+Transfer',
        pickupDate: '2026-01-20',
        returnDate: '2026-01-24',
        createdAt: '2026-01-19T09:00:00',
        completedAt: '2026-01-24T16:30:00',
        notes: 'Ada denda kerusakan sleeping bag',
    },
    // SCENARIO: Booking Masuk (Confirmed) untuk HARI INI
    {
        id: 'ORD-008',
        customerName: 'Hana Permata',
        phone: '088901234567',
        email: 'hana@email.com',
        items: [
            { itemId: 4, itemName: 'Flysheet 3x4m', quantity: 2, pricePerDay: 25000, condition: null },
            { itemId: 17, itemName: 'Rain Cover', quantity: 2, pricePerDay: 10000, condition: null },
        ],
        duration: 2,
        totalPrice: 70000,
        penalty: 0,
        status: 'confirmed',
        paymentProof: 'https://placehold.co/400x600/3b82f6/white?text=Bukti+Transfer',
        pickupDate: '2026-01-30', // HARI INI
        returnDate: '2026-02-01',
        createdAt: '2026-01-29T07:45:00',
        notes: 'Akan diambil jam 7 malam',
    },
    // SCENARIO: Booking Baru (Pending) untuk HARI INI
    {
        id: 'ORD-009',
        customerName: 'Muhammad Hafidz Arif',
        phone: '081234567890',
        email: 'muhammadhafidzarif@email.com',
        items: [
            { itemId: 2, itemName: 'Tenda Dome 4P', quantity: 1, pricePerDay: 75000, condition: null },
            { itemId: 6, itemName: 'Carrier 60L', quantity: 1, pricePerDay: 45000, condition: null },
        ],
        duration: 2,
        totalPrice: 120000,
        penalty: 0,
        status: 'pending',
        paymentProof: 'https://placehold.co/400x600/3282f6/white?text=Bukti+Transfer',
        pickupDate: '2026-01-30', // HARI INI
        returnDate: '2026-02-01',
        createdAt: '2026-01-30T10:15:00', // Baru saja
        notes: '',
    },
]

export const staff = [
    { id: 1, name: 'Andi Wijaya', role: 'Admin', phone: '081111111111', avatar: 'https://ui-avatars.com/api/?name=Andi+Wijaya&background=22c55e&color=fff' },
    { id: 2, name: 'Rina Susanti', role: 'Admin', phone: '082222222222', avatar: 'https://ui-avatars.com/api/?name=Rina+Susanti&background=3b82f6&color=fff' },
    { id: 3, name: 'Joko Supriadi', role: 'Gudang', phone: '083333333333', avatar: 'https://ui-avatars.com/api/?name=Joko+Supriadi&background=8b5cf6&color=fff' },
]

// Monthly revenue data untuk chart
export const monthlyRevenue = [
    { month: 'Aug', revenue: 4500000 },
    { month: 'Sep', revenue: 5200000 },
    { month: 'Oct', revenue: 4800000 },
    { month: 'Nov', revenue: 6100000 },
    { month: 'Dec', revenue: 8500000 },
    { month: 'Jan', revenue: 7200000 },
]
