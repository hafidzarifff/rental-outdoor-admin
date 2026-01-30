import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Tent, Mail, Lock, Check } from 'lucide-react'
import { useApp } from '../context/AppContext'

export default function Login() {
    const navigate = useNavigate()
    const { login } = useApp()
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        // Simulate network delay
        setTimeout(() => {
            const success = login(formData.email, formData.password)
            if (success) {
                navigate('/')
            }
            setLoading(false)
        }, 1000)
    }

    return (
        <div className="font-[Plus_Jakarta_Sans,sans-serif] bg-[#f6f8f7] dark:bg-[#102217] text-[#111813] antialiased selection:bg-[#13ec63]/30 selection:text-[#111813] h-screen overflow-hidden flex flex-col md:flex-row">
            {/* Left Side: Hero Image Panel */}
            <div className="hidden lg:flex lg:w-1/2 xl:w-7/12 relative bg-[#162e20] overflow-hidden group/image-panel">
                <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover/image-panel:scale-105"
                    style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAhJg5Inf7cBiM555T-mS_-ZIh59GWNK8K3qYwc81390kjz92DJTg77QdDbVGczvoN4jcFEquDhhWtftKWF6MilV1pLT0vY9wCxOEfhTVn6RcjR05NrsPA4Z43aDEA0jDvFFB8KimmB0nnn8DsYyTpbm0YUQv3FiipsIWTSIitDaZv62uH8YhG-x0_fEbh3yQMirlgrKEBVXuyocEeuWAfpsREzvGXY2cMQSHrGoswlc90J8KrezBPIQqJuu4OtMCWv7A3Wdx0s1L0T")' }}
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/70 to-transparent"></div>

                <div className="relative z-10 flex flex-col justify-end p-12 xl:p-20 w-full">
                    <div className="mb-6">
                        <Tent className="text-[#13ec63] w-12 h-12 mb-4" />
                        <h1 className="text-white text-5xl font-extrabold tracking-tight leading-tight mb-4">
                            Siap Berpetualang? <br />
                            <span className="text-[#13ec63]">Atur Semuanya di Sini.</span>
                        </h1>
                        <p className="text-gray-300 text-lg max-w-md leading-relaxed">
                            Optimalkan operasional rental alat dan bantu pelanggan memulai petualangan mereka lebih cepat.
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <div className="h-1 w-12 bg-[#13ec63] rounded-full"></div>
                        <div className="h-1 w-2 bg-white/20 rounded-full"></div>
                        <div className="h-1 w-2 bg-white/20 rounded-full"></div>
                    </div>
                </div>
            </div>

            {/* Right Side: Login Form */}
            <div className="flex w-full lg:w-1/2 xl:w-5/12 flex-col bg-white dark:bg-[#102217] h-full overflow-y-auto">
                <div className="flex min-h-full flex-col justify-center px-8 py-12 md:px-12 lg:px-20 xl:px-24">

                    {/* Mobile Logo */}
                    <div className="lg:hidden mb-8 flex items-center gap-2">
                        <Tent className="text-[#13ec63] w-8 h-8" />
                        <span className="text-xl font-bold tracking-tight text-[#111813] dark:text-white">Tiga Titik Outdoor</span>
                    </div>

                    {/* Desktop Logo */}
                    <div className="hidden lg:flex absolute top-8 right-8 items-center gap-2 opacity-50 hover:opacity-100 transition-opacity cursor-default">
                        <Tent className="text-[#111813] dark:text-white w-6 h-6" />
                        <span className="text-sm font-bold tracking-tight text-[#111813] dark:text-white uppercase">Tiga Titik Outdoor</span>
                    </div>

                    <div className="w-full max-w-md mx-auto">
                        {/* Header */}
                        <div className="flex flex-col gap-2 mb-10">
                            <h2 className="text-[#111813] dark:text-white text-3xl font-bold tracking-tight">Selamat Datang, Ranger.</h2>
                            <p className="text-[#618970] text-base">Masukkan Email dan Password Anda untuk masuk ke dalam sistem.</p>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                            {/* Email Field */}
                            <div className="flex flex-col gap-2">
                                <label className="text-[#111813] dark:text-white text-sm font-semibold" htmlFor="email">Email</label>
                                <div className="relative flex items-center">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="admin@test.com"
                                        required
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="peer w-full h-12 rounded-lg border border-gray-200 bg-gray-50 dark:bg-[#162e20] dark:border-gray-700 px-4 pr-12 text-base text-[#111813] dark:text-white placeholder-[#618970] focus:border-[#13ec63] focus:bg-white dark:focus:bg-[#162e20] focus:ring-2 focus:ring-[#13ec63]/20 transition-all outline-none"
                                    />
                                    <div className="pointer-events-none absolute right-4 flex items-center justify-center text-[#618970] peer-focus:text-[#13ec63] transition-colors">
                                        <Mail className="w-5 h-5" />
                                    </div>
                                </div>
                            </div>

                            {/* Password Field */}
                            <div className="flex flex-col gap-2">
                                <div className="flex items-center justify-between">
                                    <label className="text-[#111813] dark:text-white text-sm font-semibold" htmlFor="password">Password</label>
                                </div>
                                <div className="relative flex items-center">
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        placeholder="••••••••"
                                        required
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                        className="peer w-full h-12 rounded-lg border border-gray-200 bg-gray-50 dark:bg-[#162e20] dark:border-gray-700 px-4 pr-12 text-base text-[#111813] dark:text-white placeholder-[#618970] focus:border-[#13ec63] focus:bg-white dark:focus:bg-[#162e20] focus:ring-2 focus:ring-[#13ec63]/20 transition-all outline-none"
                                    />
                                    <div className="pointer-events-none absolute right-4 flex items-center justify-center text-[#618970] peer-focus:text-[#13ec63] transition-colors">
                                        <Lock className="w-5 h-5" />
                                    </div>
                                </div>
                            </div>

                            {/* Options Row */}
                            <div className="flex items-center justify-between">
                                <label className="flex items-center gap-3 cursor-pointer group">
                                    <div className="relative flex items-center">
                                        <input
                                            type="checkbox"
                                            className="peer h-5 w-5 cursor-pointer appearance-none rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#162e20] checked:bg-[#13ec63] checked:border-[#13ec63] focus:ring-2 focus:ring-[#13ec63]/30 transition-all"
                                        />
                                        <Check className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[#111813] w-4 h-4 opacity-0 peer-checked:opacity-100 pointer-events-none font-bold" />
                                    </div>
                                    <span className="text-sm font-medium text-[#111813] dark:text-gray-300 group-hover:text-[#13ec63] transition-colors">Ingat saya</span>
                                </label>
                                <a href="#" className="text-sm font-semibold text-[#618970] hover:text-[#13ec63] transition-colors">Lupa Password?</a>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className={`mt-2 flex w-full items-center justify-center rounded-lg bg-[#13ec63] h-12 px-6 text-[#111813] text-base font-bold tracking-wide hover:bg-[#0fd658] hover:shadow-lg hover:shadow-[#13ec63]/20 focus:ring-4 focus:ring-[#13ec63]/30 active:scale-[0.98] transition-all ${loading ? 'opacity-75 cursor-not-allowed' : ''}`}
                            >
                                {loading ? 'Masuk...' : 'Masuk'}
                            </button>
                        </form>

                        {/* Footer */}
                        <div className="mt-10 text-center">
                            <p className="text-sm text-[#618970]">
                                Belum Punya Akun? <a href="#" className="font-bold text-[#111813] dark:text-white hover:text-[#13ec63] underline decoration-2 decoration-transparent hover:decoration-[#13ec63] underline-offset-4 transition-all">Kontak Administrator</a>
                            </p>
                        </div>

                        {/* System Status */}
                        <div className="mt-16 flex items-center justify-center gap-2">
                            <span className="relative flex h-2.5 w-2.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#13ec63] opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#13ec63]"></span>
                            </span>
                            <span className="text-xs font-medium text-[#618970] uppercase tracking-wider">System Operational</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
