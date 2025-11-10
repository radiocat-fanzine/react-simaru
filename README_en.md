# 🛍️ Simaru: Sustainable Accessories E-Commerce

## Introduction

This project simulates the online store for **Simaru**, a real brand of sustainable accessories seeking an iteration in its virtual sales channel. It is developed with **React.js** in a **Vite** environment and uses **Firebase (Firestore)** as a *Serverless* solution for data management. The design prioritizes a *clean, modern interface* with a color palette inspired by nature.

The main UX objective is to offer a complete purchasing flow: from the exploration of a *dynamic catalog* to an *optimized checkout process* with the simulation of order creation and tracking.

## Technical Foundations and Architecture

The application features an architecture based on **React Contexts** for global state management, ensuring traceability and reusability.

* **Core Technologies:**
    * **Frontend:** React.js, Vite.
    * **Backend:** Firebase (Firestore) as BaaS (*Backend as a Service*).
    * **UX/UI Libraries:** `react-router-dom` (navigation), `lucide-react` (iconography), `react-toastify`, and **`SweetAlert2`** (notifications and alerts).

* **State Management:** **Authentication** and **Shopping Cart** states are persisted on the client-side using **`localStorage`**.

### Folder Structure

The functional logic is encapsulated within thematic modules to maintain hierarchy and facilitate maintenance:

/src 
├── /context/ # Global State Management (Auth, Cart, Search) 
├── /data/ # Firebase Connection and CRUD Methods 
└── /Components/ 
    ├── /Auth/ # Login and Profile (protected access) 
    ├── /CartContainer/ # Cart Logic and Checkout Form 
    ├── /Item.../ # Catalog, Card (Item), and Detail View 
    ├── /Navbar/ # Navigation, Search, and Banners 
    ├── /RelatedProducts/ # Recommendations Logic (UX) 
    └── /WishlistView/ # Wishlist and Empty State Carousel

---
## 🗺️ Userflow (User Flow Scheme)

This scheme details the main paths a user can take, focusing on the **Happy Path** (**Conversion**) and auxiliary flows (**Authentication** and **Wishlist**).

### 1. Exploration and Detail (Path to Product)

| **Starting Point** | **Main Action** | **Destination/Decision** |
| :--- | :--- | :--- |
| **Home (`/`)** | Search or Navigate by **Category**. | **Product Listing** (`/category/:id`) |
| **Listing** | Select a product. | **Product Detail** (`/detail/:id`) |
| **Detail** | **Add to Cart** or **Add to Wishlist**. | **Cart** (`/cart`) or **Wishlist** (`/wishlist`) |
| **Detail** | Click on **Related Product**. | Resets view to **Detail** (with **`window.scrollTo(0, 0)`**). |

### 2. Conversion Flow (Happy Path)

| **Stage** | **Key Logic** | **Notification / Output** |
| :--- | :--- | :--- |
| **Cart (`/cart`)** | Item review (`CartContext`), quantity adjustment. | **Continue Shopping** $\rightarrow$ **Checkout** (`/checkout`) |
| **Checkout** | Form filling/**Autofill** (simulated). | Call to **`createOrder`** (Firebase). |
| **Confirmation** | Order generated and Cart **emptied**. | **`SweetAlert2`** Alert with **Order ID**. |

### 3. Auxiliary Flows (Account and Wishes)

| **Flow** | **Entry Point** | **Logic** |
| :--- | :--- | :--- |
| **Authentication** | **Login** or **Navbar** (User Icon). | Validation (simulated). If **`isLoggedIn`** is `true`. |
| **Profile** | **Dashboard** (`/profile`). | **Conditional Access** (protected). Allows `logout()` or editing. |
| **Wishlist** | **Wishlist** (`/wishlist`). | Item review. Allows **Move to Cart** (removing from *Wishlist*). |
| **Empty Wishlist** | - | Displays **`EmptyStateCarousel`** with CTA to return to the store. |

---
## 🚀 User Flows and Functionalities

The project not only covers the **Happy Path** of an online purchase but is designed to **optimize conversion and user retention**.

| **Flow Stage** | **Objective and Integrated Functionality** |
| :--- | :--- |
| **Exploration** | **Optimize product discovery.** Implements a real-time search filter and category navigation to facilitate quick access to the product catalog available on all routes. |
| **Interest & Decision** | **Build trust and reduce doubt.** The detail view of each product includes explicit service messages and a **Cross-Selling** component (`RelatedProducts`). |
| **Conversion (Wishlist/Cart)** | **Simplify action and motivate purchase.** The **Wishlist** system offers a direct action to *move* items to the cart, and the Cart uses *state persistence* and an **attractive "Empty State"** design. |
| **Checkout** | **Reduce cart abandonment rate.** The `FormCheckout` is designed to be agile, with **simulated autofill**, culminating in a clear **order generation** and a "Track Your Order" notification (`SweetAlert2`). |

### List of Functionalities

* **1. Catalog Exploration and Search**
    * **Files:** `ItemListContainer.jsx`, `SearchContext.jsx`
    * **Logic:** Search is applied in *real-time* via the filtering function (`filteredProducts`), matching attributes like `title`, `category`, and `material` with the goal of providing a more efficient exploration.

* **2. Product Detail and Actions**
    * **Files:** `ItemDetailContainer.jsx`, `RelatedProducts.jsx`
    * **Logic:** Obtains product data by `idParam` and reinforces user trust by displaying **service messages** (e.g., fast shipping, warranty). The `RelatedProducts` component performs an *asynchronous query* to suggest items, and implements **`window.scrollTo(0, 0)`** on links for a better page transition.

* **3. Cart and Wishlist**
    * **Files:** `CartContainer.jsx`, `WishlistView.jsx`, `useWishlist.js`
    * **Cart Logic:** Persists items and calculates `totalPrice` (`toFixed(2)`). Displays an **Empty State** using a dynamic **Carousel** (`EmptyStateCarousel`) showing artistic photos in natural settings.
    * **Wishlist Logic:** Allows the user to **move an item from the Wishlist to the Cart** in a single action, simultaneously removing it from the Wishlist to *optimize conversion*. The favorite state is visually consistent (Heart icon in **`#FF69B4`**) throughout the application and is present in the navigation bar.

* **4. Checkout Process and Order**
    * **Files:** `FormCheckout.jsx`, `CartContainer.jsx`
    * **Logic:** The `FormCheckout` uses *controlled inputs* and offers a **Quick Autofill** function (`SIMULATED_USER_DATA`) to streamline testing. After data submission, the Firebase function `createOrder` is called, followed by a sequence of **`SweetAlert2`** alerts to confirm the Order ID and simulate shipping tracking.

* **5. Access and Account Management**
    * **Files:** `LoginView.jsx`, `UserProfile.jsx`
    * **Logic:** *Login* is simulated with hardcoded credentials. The `UserProfile` is **protected** by conditional rendering, showing a full *dashboard* with personal information and menu options, or redirecting the user to the login view if the session is inactive.

---
## 🎨 User Experience and Interface Design (UX/UI)

The project design focuses on **ease of use**, **informational clarity**, and **trust-building**, aligning interface decisions directly with conversion goals.

### Structural Design and Usability Decisions

* **Triple Navigation Structure (Navbar):** The `Navbar` component is split into **three horizontal rows** to manage information density:
    1. **Ad Banner (`Banner.jsx`):** (Top Row) Rotational promotional messages (**every 5 seconds**).
    2. **Main Row (Top Row):** Contains the *Logo*, the **Reactive Search Bar**, and essential **utilities** (Login, Wishlist, CartWidget).
    3. **Categories Row (Bottom Row):** (Bottom Row) Offers structural catalog navigation.

* **Data Flow Optimization (Checkout):** The **Simulated Autofill** function (`SIMULATED_USER_DATA`) and the use of *controlled inputs* ensure an **efficient filling experience** for the registered user.

* **Empty State Handling:** Empty Cart and Wishlist views employ the **`EmptyStateCarousel.jsx`** component. This dynamic carousel (**rotates every 3 seconds**) and strong **CTAs** transform an inactive view into a retention opportunity.

### *User Feedback* and Visual Contrast

* ***User Feedback* Consistency:** The `react-toastify` library is used for non-intrusive asynchronous notifications ("Item added successfully") and the **`SweetAlert2`** library for **high-impact** critical alerts (e.g., Order Confirmation and ID), providing a clear response at conversion stages.

* **Accent Contrast:** The color **`#FF69B4` (Fuchsia)** is reserved as a **high-contrast accent** for the *emotional flow* (**Wishlist**), differentiating it from the success accent (`#4CAF50`) and the warm accent (`#A9543C`).

### Highlighted Color Palette

| Variable CSS | Color (HEX) | Purpose in the Interface |
| :--- | :--- | :--- |
| **`--color-primary`** | `#04434F` | *Main text*, **brand** elements, and navigation backgrounds. Provides a professional dark base. |
| **`--color-secondary`** | `#A9543C` | Auxiliary action buttons and **warm accent** (terracotta). Used for *hover* and secondary elements. |
| **Success Accent** | `#4CAF50`| **Success/availability** indicators (Cart, *toast* notifications). |
| **Wishlist Accent** | **`#FF69B4`** | **Emotional flow** icon and notifications, maximizing visibility. |

---
## 💻 Programming Patterns and Architecture

The project was built on a functional React architecture, prioritizing **modularity** and **efficiency in data handling**.

### 1. State Management with React Context API

The **React Context API** was used to establish a **Centralized State** structure that facilitates access to critical data:

* ***Persistence and Isolation:***
    * **`CartContext`** | *Cart State* | Maintains cart data (`cartItems`) **saved in `localStorage`**, ensuring the state **is not lost upon reload**.
    * **`AuthContext`** | *Session State* | Controls the **`isLoggedIn`** state with local **persistence**, managing access to the **`UserProfile`**.
    * **`SearchContext`** | *Filter Control* | **Isolates the search string**, allowing the `Navbar` and the `ItemListContainer` to communicate without relying on hierarchical position.

### 2. Reusable Logic with Custom Hooks

To adhere to the **DRY** (*Don't Repeat Yourself*) principle, complex logic was encapsulated in *Custom Hooks*:

* **`useWishlist()`** | *Wishlist Logic* | **Centralizes all operations** (add, remove, persistence) of the *Wishlist*, allowing components to consume them **simply and clearly**.
* **`useEffect`** | *Lifecycle Control* | Used to manage **asynchronous tasks** and Firebase *data fetching*. Triggers **Cross-Selling Recommendations** only when a **change in dependency** (`currentProductId`) is detected, optimizing data requests.

### 3. Flow Control with Conditional Rendering

**Conditional Rendering** was implemented to ensure security and a consistent UX:

* ***Route Protection:*** Sensitive components like **`UserProfile.jsx`** use conditionals based on the `isLoggedIn` state to **restrict access** to the *dashboard* or redirect to the *Login* view.
* ***View Handling:*** Defines whether a content grid or the **Empty State Views** with the recommendation carousel (`EmptyStateCarousel.jsx`) should be displayed.

---
## Conclusion

The "Simaru" project simulates a functional e-commerce platform, integrating an attractive user interface with clear, organized business logic. The resulting architecture is a practical demonstration of how to apply the fundamentals of **Declarative Programming** in React, prioritizing code **modularity** and **data handling efficiency** for a fluid user experience.