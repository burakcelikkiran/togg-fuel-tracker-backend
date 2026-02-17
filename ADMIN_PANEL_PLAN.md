# EV Şarj Takip - Admin Panel Implementation Planı

## Proje Özeti
Togg Fuel Tracker Backend uygulaması için modern, kapsamlı ve görsel olarak çekici bir admin paneli tasarlanacak.

## Mevcut Sistem Durumu

### Veri Modelleri
- **User**: Kullanıcılar (is_admin field yok)
- **Vehicle**: Araçlar (user_id, brand, model, plate, battery_capacity, etc.)
- **Charge**: Şarj kayıtları (user_id, vehicle_id, company_id, kwh, amount, charge_type)
- **Company**: Şarj şirketleri (ZES, Eşarj, etc.)
- **VerificationCode**: Email doğrulama kodları

### Mevcut Özellikler
- Laravel Sanctum API authentication
- Kullanıcı kayıt/giriş/doğrulama
- Araç yönetimi
- Şarj kaydı takibi
- Dashboard istatistikleri
- Raporlama

---

## 1. Teknoloji Seçimi

### Önerilen: **Filament PHP 4.x**

Filament, Laravel için özel olarak tasarlanmış modern bir admin panel paketidir.

### Karşılaştırma

| Özellik | Filament 4.x | Inertia+Vue | Özel Livewire | Ayrı Frontend |
|---------|-------------|-------------|---------------|---------------|
| Geliştirme Hızı | ⚡ En Hızlı | Yavaş | Orta | Çok Yavaş |
| Modern UI | ✅ Mükemmel | ✅ Mükemmel | 👍 İyi | ✅ Mükemmel |
| Hazır Özellikler | ✅ Kapsamlı | ❌ Yok | ❌ Az | ❌ Yok |
| Laravel 12 Desteği | ✅ Native | ✅ Native | ✅ Native | API ile |
| Bakım Kolaylığı | ✅ Kolay | Orta | Orta | Zor |
| Maliyet | $$ | $$$$ | $$$ | $$$$$ |
| MVP Süresi | 1-2 hafta | 4-6 hafta | 3-4 hafta | 8+ hafta |

### Neden Filament?

1. **Laravel 12 için üretilmiş**: Özel olarak Laravel admin panelleri için tasarlanmış
2. **Modern Tasarım**: Tailwind CSS tabanlı, hazır güzel bileşenler
3. **Hızlı Geliştirme**: CRUD operasyonları 10x hızlı
4. **Hazır Widget'lar**: Chart'lar, tablolar, formlar hazır
5. **Rol Sistemi**: Spatie Laravel Permission ile entegrasyon

---

## 2. Admin Panel Mimarisi

### Dosya Yapısı

```
app/
├── Filament/
│   ├── Resources/
│   │   ├── UserResource.php           # Kullanıcı yönetimi
│   │   ├── VehicleResource.php        # Araç yönetimi
│   │   ├── ChargeResource.php         # Şarj kayıtları
│   │   ├── CompanyResource.php        # Şirket yönetimi
│   │   └── AdminUserResource.php      # Admin kullanıcıları
│   ├── Widgets/
│   │   ├── StatsOverviewWidget.php    # İstatistik kartları
│   │   ├── MonthlyChargesChartWidget.php  # Aylık grafik
│   │   ├── CompanyDistributionWidget.php  # Şirket dağılımı
│   │   ├── RecentChargesWidget.php    # Son şarjlar
│   │   └── UserGrowthWidget.php       # Kullanıcı büyümesi
│   └── Pages/
│       ├── Dashboard.php              # Ana dashboard
│       └── Reports.php                # Raporlar sayfası
├── Http/
│   └── Middleware/
│       └── IsAdminMiddleware.php      # Admin kontrolü
└── Models/
    └── User.php                       # Role methodları eklenecek

database/
├── migrations/
│   └── xxxx_add_role_to_users_table.php
└── seeders/
    └── AdminSeeder.php                # Varsayılan admin
```

---

## 3. Özellikler (Öncelik Sırasına Göre)

### Phase 1: Temel (Hafta 1)
- [ ] Admin authentication (ayrı giriş)
- [ ] Rol sistemi (Super Admin, Admin, User)
- [ ] Filament kurulumu ve konfigürasyon
- [ ] Kullanıcı yönetimi (CRUD)

### Phase 2: Temel Yönetim (Hafta 2)
- [ ] Araç yönetimi (tüm araçları görüntüleme, düzenleme)
- [ ] Şarj yönetimi (tüm şarj kayıtları)
- [ ] Şirket yönetimi (CRUD)
- [ ] Temel dashboard

### Phase 3: Analitik (Hafta 3)
- [ ] Aylık şarj trendleri grafiği
- [ ] Şirket dağılımı grafikleri
- [ ] Kullanıcı analitiği
- [ ] Maliyet analitiği
- [ ] Dışa aktarma (CSV/Excel)

### Phase 4: İleri Özellikler (Hafta 4)
- [ ] Aktivite loglama
- [ ] Ayarlar paneli
- [ ] Kullanıcı taklit etme (impersonation)
- [ ] Gelişmiş raporlar

---

## 4. Dashboard Tasarımı

### Layout Yapısı

```
+------------------------------------------------------------------+
|  Logo | Breadcrumb                    | Admin Menü | Kullanıcı    |
+------------------------------------------------------------------+
|                                                                  |
|  [Toplam Kullanıcı] [Toplam Şarj] [Ort Fiyat] [Toplam kWh]        |
|                                                                  |
|  +-----------------------------------------------------------+  |
|  |           Aylık Şarj Trendleri (Çizgi Grafik)            |  |
|  +-----------------------------------------------------------+  |
|                                                                  |
|  [Şirket Dağılımı (Pasta Grafik)]     [Son Şarjlar (Tablo)]     |
|                                                                  |
|  +-----------------------------------------------------------+  |
|  |           Kullanıcı Büyümesi (Bar Grafik)                |  |
|  +-----------------------------------------------------------+  |
+------------------------------------------------------------------+
```

### Dashboard Widget'ları

**İstatistik Kartları:**
- Toplam Kullanıcı (doğrulanma yüzdesi ile)
- Toplam Araç
- Toplam Şarj Kaydı
- Toplam Tutar (₺)
- Ortalama Birim Fiyat (₺/kWh)
- Toplam kWh Tüketimi

**Grafikler:**
- Aylık şarj trendleri (son 12 ay)
- Şirket bazlı dağılım
- Kullanıcı büyüme grafiği
- Haftalık bazda şarj aktivitesi

---

## 5. Rol ve İzin Sistemi

### Roll

```
Super Admin (1-2 kullanıcı)
├── Tüm yetkiler
├── Diğer adminleri yönetme
├── Sistem ayarları
└── Log görüntüleme

Admin (sınırsız)
├── Kullanıcı, Araç, Şarj, Şirket CRUD
├── Analitik ve raporlar
├── Diğer adminleri yönetemez
└── Sistem ayarlarına erişemez

User (mevcut API kullanıcıları)
└── Sadece API erişimi
```

### İzin Matrisi

| Kaynak | Görüntüle | Oluştur | Düzenle | Sil | Dışa Aktar |
|--------|----------|---------|---------|-----|------------|
| Kullanıcılar | Admin | Admin | Admin | Super Admin | Admin |
| Araçlar | Admin | - | Admin | Admin | Admin |
| Şarjlar | Admin | - | Admin | Admin | Admin |
| Şirketler | Admin | Admin | Admin | Admin | Admin |
| Raporlar | Admin | - | - | - | Admin |
| Ayarlar | Super Admin | - | Super Admin | - | - |

---

## 6. Implementation Adımları

### Adım 1: Filament Kurulumu
```bash
composer require filament/filament:"^4.0"
php artisan filament:install --panels
php artisan make:filament-user
```

### Adım 2: Database Migration
```bash
# users tablosuna role sütunu ekle
php artisan make:migration add_role_to_users_table
```

### Adım 3: Admin Seeder
```bash
# Varsayılan super admin oluştur
php artisan make:seeder AdminSeeder
```

### Adım 4: Resource Oluşturma
```bash
php artisan make:filament-resource User
php artisan make:filament-resource Vehicle
php artisan make:filament-resource Charge
php artisan make:filament-resource Company
```

### Adım 5: Widget Oluşturma
```bash
php artisan make:filament-widget StatsOverview
php artisan make:filament-widget MonthlyChargesChart
php artisan make:filament-widget CompanyDistribution
```

---

## 7. Oluşturulacak/Değiştirilecek Dosyalar

### Yeni Dosyalar

| Dosya Yolu | Açıklama |
|------------|----------|
| `app/Filament/Resources/UserResource.php` | Kullanıcı yönetimi |
| `app/Filament/Resources/VehicleResource.php` | Araç yönetimi |
| `app/Filament/Resources/ChargeResource.php` | Şarj yönetimi |
| `app/Filament/Resources/CompanyResource.php` | Şirket yönetimi |
| `app/Filament/Widgets/StatsOverviewWidget.php` | İstatistik kartları |
| `app/Filament/Widgets/MonthlyChargesChartWidget.php` | Aylık grafik |
| `app/Filament/Widgets/CompanyDistributionWidget.php` | Şirket dağılımı |
| `app/Filament/Pages/Dashboard.php` | Ana dashboard |
| `app/Http/Middleware/IsAdminMiddleware.php` | Admin kontrolü |
| `database/migrations/xxxx_add_role_to_users_table.php` | Role sütunu |
| `database/seeders/AdminSeeder.php` | Admin kullanıcısı |

### Değiştirilecek Dosyalar

| Dosya Yolu | Değişiklik |
|------------|-----------|
| `app/Models/User.php` | Role methodları eklenecek |
| `routes/web.php` | Admin route'ları eklenecek |
| `config/auth.php` | Admin guard eklenecek |

---

## 8. Gereken Paketler

```json
{
    "require": {
        "filament/filament": "^4.0",
        "spatie/laravel-permission": "^6.0",
        "leandrocfe/filament-apex-charts": "^3.0",
        "flowframe/laravel-trend": "^1.0"
    }
}
```

---

## 9. Güvenlik Önlemleri

1. **Admin Authentication**: API'den ayrı, session tabanlı
2. **Role Middleware**: Tüm admin route'larında
3. **Rate Limiting**: Admin girişinde katı limitler
4. **Activity Logging**: Tüm admin işlemleri log'lanacak
5. **IP Whitelist**: İsteğe bağlı, IP kısıtlaması
6. **Şifre Politikası**: Admin'ler için güçlü şifre zorunluluğu

---

## 10. Zaman Çizelgesi

| Faz | Gün | Teslimatlar |
|-----|-----|-------------|
| 1 | 1-3 | Filament kurulum, admin auth, roller |
| 2 | 4-7 | Tüm CRUD resource'ları |
| 3 | 8-10 | Dashboard widget'ları ve grafikler |
| 4 | 11-14 | Dışa aktarma, raporlar, bulk işlemler |
| 5 | 15-21 | Test, polish, dokümantasyon |

**Toplam: 3-4 hafta**

---

## 11. Erişim

- **Admin Panel URL**: `http://domain.com/admin`
- **Giriş**: Session tabanlı (API'den ayrı)
- **Varsayılan Admin**: Seeder ile oluşturulacak

---

## Kaynaklar

- [Filament PHP Documentation](https://filamentphp.com/docs)
- [Spatie Laravel Permission](https://spatie.be/docs/laravel-permission)
- [Filament Widgets Guide](https://filamentphp.com/docs/panel/widgets/overview)
