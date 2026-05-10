# Certificate Modal - Elegant Theme Fix

## 🎨 Masalah yang Diperbaiki
Modal sertifikat masih menggunakan warna hitam (#000, #0f0f11, #1a1a1e) yang tidak konsisten dengan tema elegant portfolio.

## ✅ Solusi
Membuat file CSS terpisah `CertificateModal.css` dengan tema elegant yang konsisten.

## 🎯 Perubahan Warna

### Background
- **Sebelum**: `#0f0f11` → `#1a1a1e` (Hitam)
- **Sesudah**: `#FAF7F2` → `#FFFFFF` (Cream → White)

### Visual Section
- **Sebelum**: `#000` (Hitam)
- **Sesudah**: `linear-gradient(135deg, #f5f5f0, #faf7f2)` (Cream gradient)

### Info Section
- **Sebelum**: `rgba(20, 20, 20, 0.4)` (Dark gray)
- **Sesudah**: `rgba(255, 255, 255, 0.6)` (White transparent)

### Text Colors
- **Title**: `white` → `#1A1A2E` (Navy)
- **Description**: `#a3a3a3` → `#6B6B7B` (Muted gray)
- **Meta Labels**: `#6b7280` → `#A0A0B0` (Light gray)
- **Meta Values**: `white` → `#1A1A2E` (Navy)

### Close Button
- **Background**: `rgba(0, 0, 0, 0.5)` → `rgba(255, 255, 255, 0.95)`
- **Color**: `white` → `#1A1A2E`
- **Hover**: `white bg` → `#1A1A2E bg`

### Action Pill
- **Background**: `rgba(255, 255, 255, 0.1)` → `rgba(255, 255, 255, 0.95)`
- **Color**: `white` → `#1A1A2E`
- **Hover**: Inverted colors

### Issuer Badge
- **Color**: `#a78bfa` (Purple) → `#B8860B` (Dark gold)
- **Background**: Purple tint → Gold tint

### Meta Icon
- **Background**: `rgba(255, 255, 255, 0.05)` → `rgba(201, 162, 39, 0.1)`
- **Color**: `#a78bfa` → `#C9A227` (Gold)

## 🎨 Efek Visual Baru

### 1. Rotating Gradient Background
```css
.cert-visual-section::before {
  background: radial-gradient(circle, rgba(201, 162, 39, 0.05), transparent 70%);
  animation: rotate 20s linear infinite;
}
```

### 2. Gold Glow Effect
```css
.cert-glow {
  background: radial-gradient(circle, rgba(201, 162, 39, 0.2), transparent 70%);
  filter: blur(30px);
  animation: glow 3s ease-in-out infinite;
}
```

### 3. Smooth Hover Transitions
- Transform scale pada image
- TranslateY pada action buttons
- Rotate pada close button

## 📝 Typography
Semua text sekarang menggunakan font yang konsisten:
- **Headings**: Playfair Display (serif)
- **Body**: Inter (sans-serif)

## 📱 Responsive Design
Tetap mempertahankan responsive layout untuk mobile devices.

## 🚀 Cara Menggunakan
File `CertificateModal.css` sudah di-import di `ElegantPortfolio.jsx`:
```javascript
import './CertificateModal.css';
```

## ✨ Hasil Akhir
Modal sertifikat sekarang:
- ✅ Konsisten dengan tema elegant
- ✅ Menggunakan palet warna cream/beige
- ✅ Typography yang profesional
- ✅ Animasi yang smooth
- ✅ Hover effects yang menarik
- ✅ Fully responsive
