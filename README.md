# To-Do List - Modern & Simple

Aplikasi To-Do List yang modern dan sederhana dengan desain Neumorphism, built dengan HTML, CSS, dan JavaScript murni. Aplikasi ini dapat dijalankan langsung di browser tanpa memerlukan server backend.

## 🌟 Fitur Utama

### ✨ Core Features
- **Dark Mode** - Toggle antara mode terang dan gelap dengan transisi halus
- **Local Storage** - Data tersimpan otomatis di browser pengguna
- **Responsive Design** - Optimal untuk desktop, tablet, dan mobile
- **Neumorphism UI** - Desain modern dengan efek embossed

### 📋 Manajemen Task
- **Tambah Task** - Cepat dengan form modal atau quick add
- **Edit Task** - Double click pada task card atau tombol edit
- **Hapus Task** - Dengan confirmation modal
- **Clear All** - Hapus semua task sekaligus
- **Task Completion** - Checkbox dengan visual feedback

### 🎯 Sistem Prioritas
- **3 Tingkat Prioritas** - Tinggi (Merah), Sedang (Kuning), Rendah (Hijau)
- **Filter Prioritas** - Filter task berdasarkan prioritas
- **Visual Indicators** - Warna dan border yang berbeda

### 🔍 Filter & Sorting
- **Filter Status** - Semua, Aktif, Selesai
- **Sorting Options** - Terbaru, Terlama, Prioritas
- **Real-time Updates** - Filter dan sorting instan

### 📊 Progress Tracking
- **Visual Progress Bar** - Persentase task selesai
- **Statistics** - Jumlah task total dan selesai
- **Real-time Updates** - Progress otomatis update

### ⌨️ Keyboard Shortcuts
- **Ctrl/Cmd + N** - New task
- **Ctrl/Cmd + E** - Export data
- **Ctrl/Cmd + I** - Import data
- **Escape** - Close modals

### 💾 Data Management
- **Export Data** - Download data dalam format JSON
- **Import Data** - Upload data dari file JSON
- **Data Validation** - Validasi format file dan data
- **Auto-save** - Data tersimpan otomatis

### 🎨 UI/UX Features
- **Loading Animation** - Animasi loading saat aplikasi pertama kali dibuka
- **Toast Notifications** - Feedback untuk setiap aksi
- **Smooth Animations** - Transisi dan animasi yang halus
- **Empty States** - Tampilan kosong yang informatif

## 🚀 Instalasi & Penggunaan

### Requirements
- Web browser modern (Chrome, Firefox, Safari, Edge)
- Koneksi internet untuk memuat Font Awesome icons

### Cara Menggunakan
1. **Clone atau Download** repositori ini
2. **Buka file `index.php`** di browser web Anda
3. **Aplikasi akan otomatis memuat** dengan sample data
4. **Mulai gunakan** semua fitur yang tersedia

### Langkah-langkah:
1. Buka `index.php` di browser
2. Gunakan tombol **+** di header untuk menambah task baru
3. Atau gunakan **quick add** di bagian atas untuk menambah task cepat
4. Klik task card untuk **edit** (double click) atau gunakan tombol edit
5. Gunakan **filter dan sorting** untuk mengatur task
6. Aktifkan **dark mode** dengan tombol matahari/bulan di kanan atas
7. **Export/Import** data untuk backup atau migrasi

## 📁 Struktur Folder

```
to-do-list/
├── index.php              # File utama aplikasi
├── README.md              # Dokumentasi proyek
├── assets/
│   ├── css/
│   │   └── style.css      # File CSS styling
│   └── js/
│       └── app.js         # File JavaScript aplikasi
└── (file lainnya)
```

## 🛠️ Teknologi yang Digunakan

### Frontend
- **HTML5** - Struktur markup
- **CSS3** - Styling dengan fitur modern (Grid, Flexbox, Animations)
- **JavaScript (ES6+)** - Logika aplikasi dan interaksi
- **Font Awesome** - Icon library

### Desain & UI
- **Neumorphism** - Desain modern dengan efek embossed
- **Glassmorphism** - Effects dengan backdrop blur
- **Responsive Design** - Mobile-first approach
- **Dark/Light Mode** - Theme switching

### Penyimpanan Data
- **LocalStorage** - Penyimpanan data di browser
- **JSON Format** - Format data yang terstruktur

## 🎯 Fitur Detail

### Priority System
- **High Priority** (Merah) - Task mendesang, border merah muda
- **Medium Priority** (Kuning) - Task biasa, border kuning
- **Low Priority** (Hijau) - Task tidak mendesak, border hijau

### Filter System
- **All** - Menampilkan semua task
- **Active** - Task yang belum selesai
- **Completed** - Task yang sudah selesai

### Sorting Options
- **Terbaru** - Task terbaru ditampilkan pertama
- **Terlama** - Task terlama ditampilkan pertama
- **Prioritas Tinggi** - Task prioritas tinggi ditampilkan pertama
- **Prioritas Sedang** - Task prioritas sedang ditampilkan pertama
- **Prioritas Rendah** - Task prioritas rendah ditampilkan pertama

### Form Validation
- **Title** - Wajib, maksimal 100 karakter
- **Description** - Opsional, maksimal 500 karakter
- **Priority** - Wajib, pilihan: Tinggi/Sedang/Rendah

## 📱 Responsive Design

Aplikasi ini dirancang untuk bekerja optimal di berbagai ukuran layar:

- **Desktop** - Layout grid dengan multiple columns
- **Tablet** - Layout yang menyesuaikan dengan ukuran layar
- **Mobile** - Single column layout dengan touch-friendly interface

## 🔧 Konfigurasi

### Customization
- **Colors** - Dapat diubah di `assets/css/style.css`
- **Animations** - Durasi dan efek dapat disesuaikan
- **Fonts** - Font family dapat diubah
- **Icons** - Font Awesome icons dapat diganti

### Performance
- **No Minification** - File tidak terminifikasi untuk readability
- **Lazy Loading** - Assets dimuat saat dibutuhkan
- **Optimized Images** - Background image dengan compression

## 🧪 Testing

Aplikasi telah diuji dengan:
- **Chrome** (Latest)
- **Firefox** (Latest)
- **Safari** (Latest)
- **Edge** (Latest)

### Fitur yang Diuji
- ✅ Tambah, Edit, Hapus task
- ✅ Filter dan sorting
- ✅ Dark mode switching
- ✅ Local storage
- ✅ Export/Import data
- ✅ Responsive design
- ✅ Keyboard shortcuts
- ✅ Form validation
- ✅ Error handling

## 🤝 Kontribusi

Contributions sangat diterima! Silakan buat issue atau pull request untuk:

- **Bug fixes**
- **Feature requests**
- **Documentation improvements**
- **Performance optimizations**

### Cara Kontribusi
1. Fork repository ini
2. Buat branch fitur (`git checkout -b feature/amazing-feature`)
3. Commit perubahan (`git commit -m 'Add amazing feature'`)
4. Push ke branch (`git push origin feature/amazing-feature`)
5. Buka Pull Request

## 📄 License

Proyek ini dilisensikan di bawah **MIT License**. Lihat file `LICENSE` untuk detail lebih lanjut.

## 🙏 Acknowledgments

- **Font Awesome** - Icon library
- **Picsum** - Background images
- **Modern CSS Techniques** - Neumorphism and Glassmorphism design

## 📞 Contact

Jika Anda memiliki pertanyaan atau saran, silakan hubungi:
- **Email**: elfian.rasyid@gmail.com
- **GitHub**: ar-elfahmi

---


**Built with ❤️ using HTML, CSS, and JavaScript**
