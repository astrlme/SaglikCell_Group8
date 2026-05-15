# SağlıkCell

SağlıkCell, React + Vite tabanlı bir frontend ile .NET Core tabanlı bir backend servisinden oluşan, PostgreSQL veritabanı kullanan bir sağlık takip uygulamasıdır.

## Proje Yapısı

- `frontend/`: React + TypeScript + Vite tabanlı kullanıcı arayüzü.
- `backend/`: .NET Core Web API uygulaması.
- `docker-compose.yml`: PostgreSQL, backend ve pgAdmin servislerini içeren Docker Compose konfigürasyonu.

## Teknolojiler

- Frontend: React, TypeScript, Vite, Tailwind CSS, Axios, React Router.
- Backend: .NET 8 (veya .NET 7/8 uyumlu), ASP.NET Core Web API.
- Veri Tabanı: PostgreSQL.
- Geliştirme Ortamı: Docker Compose.

## Başlarken

### Gereksinimler

- Docker ve Docker Compose
- Node.js (frontend desteği için)
- .NET SDK (backend uygulamayı yerel çalıştırmak isterseniz)

### Projeyi Çalıştırma

Aşağıdaki komut ile tüm servisleri Docker Compose üzerinden başlatabilirsiniz:

```bash
docker-compose up --build
```

Bu komut aşağıdaki servisleri ayağa kaldırır:

- `postgres`: PostgreSQL veritabanı
- `backend`: .NET Core API
- `pgadmin`: PostgreSQL yönetim arayüzü

### Frontend'i Çalıştırma

Frontend klasörüne gidip aşağıdaki komutları çalıştırın:

```bash
cd frontend
npm install
npm run dev
```

Varsayılan olarak Vite uygulaması `http://localhost:5173` adresinde çalışır.

### Backend'i Yerel Çalıştırma

Backend klasörüne gidip .NET uygulamasını çalıştırabilirsiniz:

```bash
cd backend/SaglikCell.Api
dotnet run
```

Backend uygulaması Docker Compose ile çalıştırıldığında `http://localhost:9980` adresinde erişilebilir hale gelir.

## API & Kullanıcı Girişi

Backend, JWT tabanlı kimlik doğrulama sağlar. Giriş ekranında Turkcell GSM numarası ve OTP/şifre kullanılarak oturum açılır.

Demo amaçlı giriş için frontend login ekranında `123456` şifresi kullanılabilir.

## Geliştirme Notları

- Backend uygulaması `backend/SaglikCell.Api` altında bulunur.
- Uygulama `backend/SaglikCell.Application` ve `backend/SaglikCell.Infrastructure` katmanlarına ayrılmıştır.
- Veritabanı başlangıç betikleri `backend/SaglikCell.Infrastructure/sql` dizininde yer alır.

## İpuçları

- `docker-compose up --build` komutu ile tüm hizmetleri yeniden oluşturabilirsiniz.
- Frontend ve backend ayrı ayrı geliştirilmek istendiğinde ilgili klasöre gidip `npm run dev` veya `dotnet run` komutlarını kullanabilirsiniz.

## Lisans

Bu proje eğitim/demo amaçlıdır.
