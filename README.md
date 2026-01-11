# 🎓 M/M/2 Queuing Theory Calculator

**Aplikasi Web untuk Perhitungan Model Antrian M/M/2**
Tugas Pemodelan dan Simulasi - Semester 5

## 📋 Daftar File dan Struktur

```
Program/
├── app.py                          # Backend Flask utama
├── model.ipynb                     # Notebook untuk analisis
├── requirements.txt                # Dependensi Python
├── README.md                       # File dokumentasi ini
│
├── templates/
│   ├── base.html                  # Template dasar (inheritance)
│   ├── index.html                 # Halaman input/home
│   └── result.html                # Halaman hasil perhitungan
│
└── static/
    ├── css/
    │   └── style.css              # Stylesheet utama
    └── js/
        └── script.js              # JavaScript interaktif
```

## 🚀 Cara Menjalankan

### Prerequisites

- Python 3.7+
- pip (Python package manager)

### Instalasi

1. **Buat virtual environment:**

```bash
python -m venv venv
```

2. **Aktivasi virtual environment:**

   - Windows:

   ```bash
   venv\Scripts\activate
   ```

   - macOS/Linux:

   ```bash
   source venv/bin/activate
   ```

3. **Instalasi dependencies:**

```bash
pip install flask
```

4. **Jalankan aplikasi:**

```bash
python app.py
```

5. **Buka browser ke:**

```
http://127.0.0.1:5000
```

## 📖 Dokumentasi Fitur

### 🔹 Halaman Input (index.html)

**Fungsi:** Pengguna memasukkan parameter sistem antrian

**Input yang dibutuhkan:**

- **Laju Kedatangan (λ):** Waktu antar kedatangan dalam menit
- **Laju Layanan (μ):** Waktu pelayanan per server dalam menit

**Validasi:**

- Kedua input harus angka positif
- Sistem akan menampilkan peringatan jika ρ ≥ 1 (sistem tidak stabil)

**Informasi Tambahan:**

- Menjelaskan model M/M/2
- Rumus-rumus yang digunakan
- Catatan penting tentang syarat stabilitas

### 🔹 Halaman Hasil (result.html)

**Tampilan:**

- Ringkasan input yang dimasukkan
- Tabel Parameter Sistem (λ, μ, ρ, Status Stabilitas)
- Metrik Waktu Rata-rata (W, Wq)
- Jumlah Pelanggan Rata-rata (L, Lq)
- Penjelasan detail setiap metrik
- Tombol untuk cetak hasil atau kembali ke input

**Fitur Tambahan:**

- Status stabilitas dengan badge warna (Stabil/Tidak Stabil)
- Penjelasan lengkap interpretasi hasil
- Responsif untuk semua ukuran layar

## 📐 Rumus Matematika yang Digunakan

### Parameter Sistem

```
λ (Lambda) = 1 / Waktu antar kedatangan
μ (Mu) = 1 / Waktu pelayanan
ρ (Rho) = λ / (2μ)
```

### Metrik Waktu

```
W = 1 / (μ - λ/2)
Wq = λ / [2μ(μ - λ/2)]
```

### Metrik Jumlah Pelanggan

```
L = λ × W
Lq = λ × Wq
```

### Syarat Stabilitas

```
ρ < 1  ⟹ Sistem STABIL
ρ ≥ 1  ⟹ Sistem TIDAK STABIL
```

## 🎨 Styling dan Desain

### CSS (style.css)

- **Framework:** Custom CSS dengan CSS Grid dan Flexbox
- **Responsive:** Mobile-first design
- **Dark Mode:** Support untuk preferensi dark mode sistem
- **Accessibility:** Mengikuti WCAG guidelines
- **Animasi:** Smooth transitions dan keyframe animations

### Warna Tema

- **Primary:** #0066cc (Biru)
- **Success:** #28a745 (Hijau)
- **Danger:** #dc3545 (Merah)
- **Warning:** #ff9800 (Orange)
- **Info:** #2196f3 (Biru Muda)

## ⚙️ Fitur JavaScript

### Validasi Real-time

- Pengecekan input saat user mengetik
- Indikasi visual untuk stabilitas sistem
- Error messages yang informatif

### Keyboard Shortcuts

- `Ctrl+Enter` atau `Cmd+Enter` untuk submit form

### Aksesibilitas

- Support untuk prefers-reduced-motion
- Proper button fokus handling
- Clear error messages

### Print Support

- Optimized styling untuk printing
- Hide unnecessary elements saat print

## 🔧 Backend (app.py)

### Fungsi Utama: `compute_mm2(arrival_minutes, service_minutes)`

**Input:**

- `arrival_minutes`: Waktu antar kedatangan (dalam menit)
- `service_minutes`: Waktu pelayanan per server (dalam menit)

**Output:**
Dictionary berisi:

```python
{
    "lambda": 1.0 / arrival_minutes,
    "mu": 1.0 / service_minutes,
    "rho": (1.0 / arrival_minutes) / (2.0 * (1.0 / service_minutes)),
    "W": 1.0 / (mu - lambda/2),
    "Wq": (lambda/2) / (2.0 * mu * (mu - lambda/2)),
    "L": lambda * W,
    "Lq": lambda * Wq
}
```

### Routes

#### GET/POST `/`

- Menampilkan form input
- Memproses form submission
- Redirect dengan flash messages jika ada error

#### GET `/result`

- Menampilkan hasil perhitungan
- Menggunakan template inheritance dari base.html

## 📝 Error Handling

Aplikasi menangani:

- Input kosong
- Input bukan angka
- Angka negatif atau nol
- Sistem yang tidak stabil (ρ ≥ 1)

Setiap error ditampilkan dalam alert box yang informatif.

## 🧪 Testing

### Test Cases yang Bisa Dicoba

1. **Sistem Stabil:**

   - λ = 5 pelanggan/menit
   - μ = 6 pelanggan/menit
   - Expected: ρ = 0.4167 < 1 ✓

2. **Sistem Marginal:**

   - λ = 10 pelanggan/menit
   - μ = 5 pelanggan/menit
   - Expected: ρ = 1.0 (Tidak Stabil) ✗

3. **Sistem Overload:**
   - λ = 15 pelanggan/menit
   - μ = 4 pelanggan/menit
   - Expected: ρ = 1.875 (Sangat Tidak Stabil) ✗

## 🔒 Catatan Keamanan

- Input divalidasi di frontend dan backend
- Flash messages digunakan untuk XSS protection
- Secret key harus diganti untuk production
- CORS headers dapat ditambahkan jika diperlukan

## 📱 Responsivitas

Aplikasi responsif untuk:

- 🖥️ Desktop (1200px+)
- 💻 Tablet (768px - 1199px)
- 📱 Mobile (< 768px)

## 🚀 Deployment

Untuk production:

1. Set `debug=False` di app.py
2. Gunakan production WSGI server (Gunicorn, uWSGI)
3. Set environment variable `FLASK_ENV=production`
4. Generate secure secret key
5. Configure HTTPS

## 📚 Referensi Model M/M/2

- Model M/M/2 adalah kasus khusus dari M/M/c/K dengan c=2 dan K=∞
- Kedatangan mengikuti distribusi Poisson
- Service time mengikuti distribusi Exponential
- Dua server yang identik dan independen
- Kapasitas sistem unlimited

## 👨‍💻 Developer Notes

- File lama (web.html) sudah dipisah menjadi struktur modular
- Menggunakan template inheritance untuk reusability
- CSS dan JS dipisah untuk maintainability
- Semua validasi dilakukan di backend
- Frontend validasi untuk better UX

## 📄 License

Tugas akademik - Pemodelan dan Simulasi Semester 5

## 📞 Support

Jika menemukan bug atau ingin improvement:

1. Check browser console untuk error messages
2. Verify input values
3. Ensure Python dependencies ter-install dengan benar

---

**Last Updated:** 2026-01-09
**Version:** 1.0
