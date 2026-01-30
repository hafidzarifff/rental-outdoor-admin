# Rental Outdoor Equipment - Monorepo

Aplikasi prototype untuk sistem manajemen penyewaan alat kemah.

## Tech Stack

- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router v7
- **Charts**: Recharts
- **Icons**: Lucide React

## Struktur Project

```
rental-outdoor/
├── apps/
│   └── web/                  # Frontend React App
│       ├── src/
│       │   ├── components/   # Reusable components
│       │   ├── pages/        # Page components
│       │   ├── context/      # React Context
│       │   └── data/         # Dummy data
│       └── ...
└── package.json              # Root monorepo config
```

## Getting Started

### Prerequisites
- Node.js 18+
- npm atau yarn

### Installation

```bash
# Install dependencies
cd apps/web
npm install

# Run development server
npm run dev
```

Aplikasi akan berjalan di `http://localhost:3000`

## Fitur

### 📊 Dashboard
- Statistik pesanan dan pendapatan
- Line chart pendapatan bulanan
- Tabel pesanan yang membutuhkan aksi

### 📦 Manajemen Pesanan
- Tab sistem: Pending → Confirmed → Rented → Completed
- Verifikasi bukti pembayaran
- Checklist pengambilan barang
- Form pengembalian dengan kalkulasi denda

### 🎒 Inventaris
- **Kategori Barang**: Visualisasi stok per kategori dengan bar chart
- **Daftar Barang**: Filter, edit stok, toggle maintenance

### 👥 Staff
- Manajemen data staff
- Role: Admin / Gudang

## Demo Skenario

1. Buka Dashboard → lihat statistik
2. Klik pesanan baru → verifikasi pembayaran → terima
3. Proses pengambilan → checklist barang
4. Proses pengembalian → cek kondisi → input denda jika rusak
