# React + TypeScript Configuration

This is the converted React version of the Amavya Shopping Cart application.

## Project Structure

```
src/
├── components/         # React components
│   ├── Home.tsx       # Home page component
│   ├── Cart.tsx       # Shopping cart component
│   └── ProductDetails.tsx  # Product details page
├── hooks/             # Custom React hooks
│   ├── useApi.ts      # API data fetching hook
│   └── useCart.ts     # Cart state management hook
├── types/             # TypeScript type definitions
│   └── product.types.ts
├── App.tsx            # Main App component with routing
├── index.tsx          # React entry point
├── App.scss           # Global styles
└── index.scss         # Root styles
```

## Key Changes from Angular

### 1. **Components** - Now using functional components with hooks
- Replaced Angular class components with React functional components
- Used `useState` for state management
- Used `useEffect` for lifecycle management

### 2. **Routing** - Migrated to React Router v6
- Replaced Angular Router with React Router DOM
- Simple route configuration using `<Routes>` and `<Route>`

### 3. **Services to Hooks**
- **ApiService** → **useApi** custom hook
  - Returns products and methods to fetch data
  - Uses native `fetch` API instead of HttpClient
  
- **CartService** → **useCart** custom hook
  - Manages cart state with `useState`
  - Persists to localStorage
  - Provides all cart operations (add, remove, update quantity, etc.)

### 4. **State Management**
- Removed RxJS/BehaviorSubject
- Using React hooks: `useState`, `useCallback`, `useEffect`
- Data persistence handled directly in the useCart hook

### 5. **Styling**
- SCSS files remain the same
- All component styles preserved
- Uses CSS modules pattern with SCSS

### 6. **Dependencies**
- Replaced `@angular/*` packages with React equivalents
- Uses `react-router-dom` for routing
- Added `sass` for SCSS compilation

## Running the Application

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm build
```

The app will open at `http://localhost:3000`

## Features

- ✅ Browse products on home page
- ✅ View product details with image gallery
- ✅ Add products to cart
- ✅ Manage cart (increase/decrease quantity, remove items)
- ✅ Cart persistence using localStorage
- ✅ Responsive design for mobile and desktop
- ✅ Product navigation with React Router

## Notes

- Cart data is persisted in browser localStorage under the key `amavya_cart`
- All product images are loaded from `assets/prod-images/`
- Product data is fetched from `assets/data/products.json`

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
