# E-Commerce Product Listing & Detail Page

A modern e-commerce application built with Next.js, TypeScript, and Tailwind CSS that displays product listings and detailed product information with cart functionality.

## 🚀 Features

- **Product Listing Page**: Responsive grid layout displaying products with filtering and sorting
- **Product Detail Pages**: Dynamic routing with comprehensive product information
- **Shopping Cart**: Client-side cart management with item tracking

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Testing**: Vitest + React Testing Library
- **Image Optimization**: next/image

## 📁 Project Structure

```
src/
├── app/
│   ├── page.tsx                 # Product listing page (/)
│   ├── products/
│   │   └── [id]/
│   │       └── page.tsx         # Product detail page (/products/[id])
│   ├── api/
│   │   └── products/
│   │       └── [id]/
│   │           └── route.ts     # GET /api/products/[id]
│   ├── layout.tsx               # Root layout
│   └── globals.css              # Global styles
├── features/
│   ├── products/
│   │   ├── product-detail
│   │   ├── product-list
├── shared/
│   ├── components/
│   ├── config/
│   ├── hooks/
│   │   └── useCart
│   ├── utils/
│   │   └── cart-manager         # Utility functions to interact with localStorage
│   └── types/
```

This project uses a feature-based folder structure following Next.js 14 App Router conventions for better maintainability and scalability.

## 🚀 Getting Started

### Prerequisites

- Node.js 18.0 or later
- npm, yarn, or pnpm package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/mrirfanto/nikecommerce
   cd nikecommerce
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

### Building for Production

```bash
npm run build
npm run start
```

### Running Tests

```bash
npm run test
# or for watch mode
npm run test:watch
```

## 🏗️ Architecture & Design Decisions

### Data Fetching Strategy

**Product Listing Page (Server-Side Rendering)**

- Used `getServerSideProps` equivalent in App Router for initial product load
- Client-side filtering and sorting for smooth user experience without page reloads

**Product Detail Page (Server-Side Rendering)**

- Chose Server-Side Rendering over Static Generation for product detail pages
- **Justification**: In a real e-commerce scenario, product information (price, availability, stock) changes frequently and needs to be fresh on every request
- SSR ensures users always see the most up-to-date product information
- If this were a catalog with rarely changing products, Static Site Generation with ISR would be preferred for better performance
- SEO Benefits: Complete product information is present in the initial HTML response

### State Management

- **Cart Management**: Implemented using basic localStorage mechanism
- **Rationale**: For this scope, localStorage is simple enough and provides persistency accross browser
- **Scalability**: Easy to migrate to Zustand if the application grows

### Performance Optimizations

- **Next.js Image Optimization**: All product images use `next/image` for automatic optimization
- **Lazy Loading**: Images load only when needed
- **Client-side Filtering**: Avoids unnecessary API calls for filter/sort operations
- **Responsive Images**: Automatic srcset generation for different screen sizes

## 🔧 Development Decisions & Challenges

### Challenges Encountered

1. **Image Optimization**: Initially faced issues with placeholder images and aspect ratios
   - **Solution**: Implemented proper next/image configuration with responsive sizing

2. **State Management Scope**: Deciding between using localStorage vs external library
   - **Solution**: Started with localStorage for simplicity

3. **SSR vs SSG Decision**: Balancing performance vs data freshness
   - **Solution**: Chose SSR for product details to ensure fresh pricing/availability data

### Assumptions Made

- Product data changes frequently (justifying SSR over SSG)
- Basic authentication/user management is out of scope

## 🚀 Future Improvements

### Short-term Enhancements

- [ ] Add product search functionality
- [ ] Implement wishlist feature

### Long-term Enhancements

- [ ] User authentication and profiles
- [ ] Order history and tracking
- [ ] Advanced filtering (price range, ratings, etc.)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---
