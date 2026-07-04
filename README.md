# Başka İnşaat — Web Sitesi

Premium inşaat firması web sitesi. Cloudflare Pages üzerinden yayınlanmak üzere hazırlanmıştır.

## 📁 Proje Yapısı

```
construction-parallax-site/
├── index.html          # Ana sayfa
├── style.css           # Tüm stil ve animasyonlar
├── main.js             # Parallax, scroll reveal, lightbox, filtre
├── _headers            # Cloudflare Pages HTTP güvenlik başlıkları
├── _redirects          # Cloudflare Pages yönlendirme kuralları
└── assets/
    ├── hero-bg.jpg
    ├── project-interior.jpg
    ├── project-office.jpg
    └── project-detail.jpg
```

---

## 🌐 Cloudflare Pages ile Canlıya Alma

### Yöntem A — Direct Upload (GitHub olmadan, en hızlı)

1. [dash.cloudflare.com](https://dash.cloudflare.com) adresine giriş yap
2. Sol menüden **Workers & Pages** → **Create** → **Pages** sekmesi
3. **"Upload assets"** butonuna tıkla
4. Proje adı gir: `baskainsaat`
5. Tüm `construction-parallax-site/` klasörünü sürükle-bırak **ya da** "Select from computer" ile seç
6. **Deploy site** butonuna tıkla
7. 🎉 Anında `https://baskainsaat.pages.dev` gibi bir URL elde edersin

### Yöntem B — GitHub ile Otomatik Deploy (Önerilen, değişikliklerde otomatik yayınlanır)

1. GitHub'da yeni **public** repo oluştur: `baskainsaat-web`
2. Dosyaları yükle (ya da git push ile):
   ```bash
   git init
   git add .
   git commit -m "İlk yayın - Başka İnşaat"
   git remote add origin https://github.com/KULLANICI/baskainsaat-web.git
   git push -u origin main
   ```
3. Cloudflare Dashboard → Workers & Pages → **Create** → **Pages** → **Connect to Git**
4. GitHub repo'yu seç
5. Build ayarları:
   - **Framework preset:** None
   - **Build command:** (boş bırak)
   - **Build output directory:** `/` (nokta ya da boş)
6. **Save and Deploy**

---

## 🔗 Kendi Alan Adını Bağlama (baskainsaat.com)

Cloudflare'de alan adın zaten kayıtlıysa:

1. Pages projesine gir → **Custom domains** → **Set up a custom domain**
2. `baskainsaat.com` ya da `www.baskainsaat.com` gir
3. Cloudflare otomatik olarak DNS kaydını oluşturur ve SSL sertifikası ekler
4. Birkaç dakika içinde `https://baskainsaat.com` aktif olur ✅

Alan adın başka bir kayıt şirketindeyse (GoDaddy, isimtescil vb.):
- Nameserver'ları Cloudflare'e taşı → DNS yönetimi de Cloudflare'e geçer
- Sonra yukarıdaki adımları uygula

---

## ⚡ Cloudflare Avantajları (Otomatik Aktif)
- Ücretsiz **SSL/TLS** sertifikası (HTTPS)
- Global **CDN** — dünya genelinde hızlı yüklenme
- **DDoS koruması**
- Otomatik **görsel sıkıştırma** (Polish özelliği ile)
- **Web Analytics** paneli ücretsiz
