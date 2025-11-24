<<<<<<< HEAD
# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
=======
# Portofolio
Website Portofilio Yoga Krisna Utama

## Featured Project: Rental HS

Berdasarkan analisis kode dan struktur proyek, berikut adalah penjelasan lengkap tentang proyek Rental HS (aplikasi rental mobil modern):

### Bahasa Pemrograman & Teknologi Utama
**Bahasa Pemrograman**
- TypeScript: Bahasa utama yang digunakan, memberikan type safety dan fitur modern JavaScript
- JavaScript (ES6+): Digunakan untuk beberapa konfigurasi dan utility

**Framework & Library Frontend**
- React 19: Framework utama untuk membangun UI komponen-based
- React Router DOM v7: Untuk routing dan navigasi antar halaman
- Framer Motion: Library animasi untuk transisi smooth dan efek visual
- React Bootstrap: Komponen UI siap pakai berdasarkan Bootstrap 5

**Build Tool & Development**
- Vite: Build tool modern yang cepat untuk development dan production
- ESLint: Untuk linting kode dan menjaga kualitas kode
- TypeScript Compiler: Untuk type checking

**Styling & UI**
- Bootstrap 5: Framework CSS untuk layout responsif
- Custom CSS: Styling kustom di App.css dengan variabel CSS dan animasi
- Bootstrap Icons: Icon library untuk elemen visual
- Google Fonts: Outfit dan Plus Jakarta Sans untuk typography

### Arsitektur & Struktur Proyek
**Routing Structure**
- / - HomePage (halaman utama dengan hero, search, features, testimoni)
- /armada - ArmadaGallery (galeri lengkap mobil dengan filter AI)
- /car/:id - CarDetail (halaman detail mobil individual)
- /about - About (halaman tentang perusahaan)

**Fitur Utama Aplikasi**
1. **HomePage**
   - Hero Section: Banner dengan search widget floating
   - Features Bento Grid: Showcase keunggulan layanan
   - Car Listing: Preview 3 mobil teratas
   - Testimonials: Review pelanggan dengan avatar

2. **ArmadaGallery**
   - AI Assistant: Chatbot cerdas untuk rekomendasi mobil
   - Smart Filtering: Filter berdasarkan kategori, harga, rating
   - Car Grid: Tampilan modern dengan animasi hover
   - Pagination: Navigasi halaman untuk banyak data

3. **CarDetail**
   - Image Gallery: Slider gambar mobil
   - Specifications: Detail teknis dan fitur
   - Booking Form: Form pemesanan dengan validasi
   - Related Cars: Rekomendasi mobil serupa

4. **About**
   - Company Story: Sejarah dan visi perusahaan
   - Values Section: Nilai-nilai perusahaan
   - Gallery: Foto fasilitas dan tim
   - Stats: Angka-angka perusahaan

5. **AI Integration**
   - OpenRouter API: Menggunakan model Llama 3.1 untuk rekomendasi
   - Smart Matching: Analisis kebutuhan user secara otomatis
   - Fallback Mode: Bekerja tanpa AI jika API tidak tersedia

### State Management & Data Flow
**State Management**
- React Hooks: useState, useEffect untuk state lokal
- Props Drilling: Data dikirim melalui props antar komponen
- Local State: Tidak menggunakan global state management (Redux/Zustand)

**Data Structure**
- Cars Array: Data mobil statis dengan properti lengkap
- Testimonials Array: Data review pelanggan
- Search State: State untuk form pencarian

### Styling & UI/UX
**Design System**
- Color Palette: Primary dark (#0B1120), accent cyan (#06B6D4)
- Typography: Outfit untuk heading, Plus Jakarta Sans untuk body
- Spacing: Sistem spacing konsisten dengan Bootstrap
- Animations: Micro-interactions dengan Framer Motion

**Responsiveness**
- Mobile-First: Design yang optimal di semua device
- Breakpoint: xs, sm, md, lg, xl menggunakan Bootstrap grid
- Touch-Friendly: Button dan interactive elements dioptimalkan untuk mobile

### Performance & Optimization
**Build Optimization**
- Vite: Hot reload cepat, tree-shaking, code splitting
- Lazy Loading: Gambar dengan loading="lazy"
- Bundle Splitting: Automatic code splitting per route

**Image Handling**
- Local Assets: Gambar disimpan di public dan assets
- Responsive Images: Optimasi untuk berbagai ukuran layar
- Format Support: JPG, PNG, WebP

### Development Workflow
**Scripts Available**
- npm start: Jalankan development server
- npm run build: Build untuk production
- npm test: Jalankan test suite

**Environment Variables**
- VITE_OPENROUTER_API_KEY: Untuk fitur AI (opsional)

### Keunggulan Proyek
- **Modern Tech Stack**: Menggunakan teknologi terbaru (React 19, TypeScript)
- **AI Integration**: Fitur AI assistant yang inovatif
- **Responsive Design**: Optimal di desktop dan mobile
- **Performance**: Build cepat dengan Vite
- **Scalable Architecture**: Struktur komponen yang maintainable
- **User Experience**: Animasi smooth dan UI intuitif

Proyek ini adalah aplikasi web modern untuk bisnis rental mobil dengan fokus pada user experience yang excellent dan integrasi AI untuk rekomendasi personal. Cocok untuk startup rental mobil yang ingin tampil profesional dan teknologi-driven.

### Links
- **GitHub Repository**: [https://github.com/Babayaga4523/Rental-HS](https://github.com/Babayaga4523/Rental-HS)
- **Live Demo**: [Link to web demo if available]
>>>>>>> 595bb33ab80b0a579cbff3b47d19d5c9611081ed
