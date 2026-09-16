# 🌾 Teff-Injera

A full-stack web application designed for ordering authentic Ethiopian cuisine (fresh Injera and Teff products) online. Built with Next.js, TypeScript, PostgreSQL, and modern application security practices.

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)
![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?style=flat-square&logo=prisma)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=flat-square&logo=tailwind-css)

🌐 **Live Website:** [teff-injera.app](https://www.teff-injera.app)

---

## ✨ Features

### 🛍️ Customer Experience
* **Interactive Menu & Cart**: Browse fresh Ethiopian food items on `/menu` with client-side state management powered by React Context.
* **Smart Delivery Slot Validation**: Dynamic middleware logic validates and disables past or unavailable delivery time slots during checkout.
* **OAuth Authentication**: Secure Google OAuth login integration via NextAuth.js.
* **Real-time Push Notifications**: Firebase Cloud Messaging (FCM) integration for live order status alerts.

### 🛠️ Admin & Staff Operations
* **Order Management (`/orders`)**: Dedicated staff dashboard for tracking, organizing, and fulfilling incoming customer orders.
* **Dynamic Menu Control**: Real-time management of dishes and products displayed on `/menu`.
* **Stock & Pricing Updates**: Instant toggling of out-of-stock statuses, price adjustments, and product image updates.
* **Catalog Operations**: Capabilities to add new Ethiopian cuisine items or permanently remove retired products.

---

## 🛠️ Tech Stack

* **Framework**: [Next.js](https://nextjs.org) (App Router)
* **Language**: [TypeScript](https://www.typescriptlang.org/)
* **State Management**: React Context API
* **Database & ORM**: PostgreSQL, [Prisma](https://www.prisma.io/)
* **Authentication**: NextAuth.js / Google OAuth
* **Push Notifications**: Firebase Cloud Messaging (FCM)
* **Styling**: Tailwind CSS
* **Deployment**: [Vercel](https://www.teff-injera.app)

---

## 💻 Local Development Setup

Follow these steps to clone and run the project on your local machine:

### Prerequisites
* **Node.js**: v18.x or higher
* **npm** (or yarn/pnpm)
* **PostgreSQL** instance (local or hosted, e.g., Supabase / Neon)

### Steps

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/Hiwot-GitHub/Teff-Injera.git](https://github.com/Hiwot-GitHub/Teff-Injera.git)
   cd Teff-Injera 
2. **Install project dependencies:**
   ```bash
   npm install 
3. **Set up Environment Variable:**
   ```bash
   DATABASE_URL="postgresql://user:password@localhost:5432/teff_injera"
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-nextauth-secret"
   GOOGLE_CLIENT_ID="your-google-client-id"
   GOOGLE_CLIENT_SECRET="your-google-client-secret"
4. **Run Database Migration:**
   ```bash
   npx prisma migrate dev
5. **Start Development Server:**
    ```bash
    npm run dev
   

