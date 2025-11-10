# 🛍️ Simaru: E-Commerce de Accesorios Sostenibles

## Introducción

Este proyecto simula la tienda en línea para **Simaru**, una marca real de accesorios sostenibles en busca de una iteración en su canal de compra virtual. Está desarrollado con **React.js** en un entorno **Vite** y utiliza **Firebase (Firestore)** como solución *Serverless* para la gestión de datos. El diseño prioriza una *interfaz limpia y moderna* con una paleta de colores inspirada en la naturaleza.

El objetivo principal de UX es ofrecer un flujo de compra completo: desde la exploración de un *catálogo dinámico* hasta un *proceso de checkout optimizado* con la simulación de creación de órdenes y seguimiento.

## Fundamentos Técnicos y Arquitectura

La aplicación cuenta con una arquitectura basada en **Contextos de React** para el manejo del estado global, asegurando la trazabilidad y la reusabilidad.

* **Tecnologías Principales:**
    * **Frontend:** React.js, Vite.
    * **Backend:** Firebase (Firestore) como BaaS (*Backend as a Service*).
    * **Librerías UX/UI:** `react-router-dom` (navegación), `lucide-react` (iconografía), `react-toastify` y **`SweetAlert2`** (notificaciones y alertas).

* **Gestión de Estado:** El estado de la **Autenticación** y el **Carrito de Compras** son persistentes en el lado del cliente utilizando **`localStorage`**.

### Estructura de Carpetas

La lógica funcional se encuentra encapsulada dentro de módulos temáticos para mantener la jerarquía y facilitar el mantenimiento:

/src 
├── /context/ # Gestión de Estado Global (Auth, Cart, Search)
├── /data/ # Conexión y métodos CRUD de Firebase 
└── /Components/ 
    ├── /Auth/ # Login y Perfil (acceso protegido) 
    ├── /CartContainer/ # Lógica de Carrito y Formulario de Checkout 
    ├── /Item.../ # Catálogo, Card (Item) y Vista Detallada 
    ├── /Navbar/ # Navegación, Búsqueda y Banners 
    ├── /RelatedProducts/ # Lógica de Recomendaciones (UX) 
    └── /WishlistView/ # Lista de Deseos y Carrusel de Empty State

---
## 🗺️ Userflow (Esquema de Flujo de Usuario)

Este esquema detalla los caminos principales que un usuario puede tomar, centrándose en el **Camino Feliz** (**Conversión**) y los flujos auxiliares (**Autenticación** y **Wishlist**).

### 1. Exploración y Detalle (Camino al Producto)

| **Punto de Inicio** | **Acción Principal** | **Destino/Decisión** |

| **Inicio (`/`)** | Búsqueda o Navegación por **Categoría**. | **Listado de Productos** (`/category/:id`) |
| **Listado** | Selección de un producto. | **Detalle de Producto** (`/detail/:id`) |
| **Detalle** | **Añadir al Carrito** o **Añadir a Wishlist**. | **Carrito** (`/cart`) o **Wishlist** (`/wishlist`) |
| **Detalle** | Click en **Producto Relacionado**. | Reinicia la vista en **Detalle** (con **`window.scrollTo(0, 0)`**). |

### 2. Flujo de Conversión (Camino Feliz)

| **Etapa** | **Lógica Clave** | **Notificación / Salida** |

| **Carrito (`/cart`)** | Revisión de ítems (`CartContext`), ajuste de cantidades. | **Continuar Compra** $\rightarrow$ **Checkout** (`/checkout`) |
| **Checkout** | Llenado/**Autocompletado** de formulario (simulado). | Llamada a **`createOrder`** (Firebase). |
| **Confirmación** | Orden generada y Carrito **vaciado**. | Alerta **`SweetAlert2`** con **ID de Orden**. |

### 3. Flujos Auxiliares (Cuenta y Deseos)

| **Flujo** | **Punto de Entrada** | **Lógica** |

| **Autenticación** | **Login** o **Navbar** (Icono de Usuario). | Validación (simulada). Si **`isLoggedIn`** es `true`. |
| **Perfil** | **Dashboard** (`/profile`). | **Acceso Condicional** (protegido). Permite `logout()` o edición. |
| **Lista de Deseos** | **Wishlist** (`/wishlist`). | Revisión de ítems. Permite **Mover a Carrito** (eliminando de *Wishlist*). |
| **Wishlist Vacía** | - | Muestra **`EmptyStateCarousel`** con CTA para volver a la tienda. |

---
## 🚀 Flujos de Usuario y Funcionalidades

El proyecto no solo cubre la **Ruta Feliz** de una compra en línea, sino que está diseñado para **optimizar la conversión y la retención del usuario**.

| **Etapa del Flujo** | **Objetivo y Funcionalidad Integrada** |

| **Exploración** | **Optimizar el hallazgo del producto.** Se implementa un filtro de búsqueda en tiempo real y navegación por categorías para facilitar el acceso rápido al catálogo de productos disponible en todas las rutas. |

| **Interés y Decisión** | **Reforzar la confianza y reducir la duda.** La vista de detalle de cada producto incluye mensajes de servicio explícitos y un componente de **Recomendaciones Cruzadas** o *cross-selling* (`RelatedProducts`). |

| **Conversión (Wishlist/Carrito)** | **Simplificar la acción y motivar la compra.** El sistema de **Wishlist** ofrece una acción directa para *mover* ítems al carrito, y el Carrito utiliza la *persistencia de estado* y un **diseño atractivo de "Empty State"**. |

| **Checkout** | **Reducir la tasa de abandono del carrito.** El `FormCheckout` está diseñado para ser ágil, con **autocompletado simulado**, culminando en una **generación de orden** clara y una notificación de seguimiento "Track Your Order" (`SweetAlert2`). |

### Lista de Funcionalidades

* **1. Exploración del Catálogo y Búsqueda**

    * **Archivos:** `ItemListContainer.jsx`, `SearchContext.jsx`
    * **Lógica:** La búsqueda se aplica en *tiempo real* mediante la función de filtrado (`filteredProducts`), buscando coincidencias en `title`, `category`, y `material` con el objetivo de brindar una exploración más eficiente.

* **2. Producto Detallado y Acciones**

    * **Archivos:** `ItemDetailContainer.jsx`, `RelatedProducts.jsx`
    * **Lógica:** Obtiene datos del producto por `idParam` y refuerza la confianza del usuario al mostrar **mensajes de servicio** (ej: envío rápido, garantía). El componente `RelatedProducts` realiza una *consulta asíncrona* para sugerir ítems, e implementa **`window.scrollTo(0, 0)`** en los enlaces para una mejor transición de página.

* **3. Carrito y Wishlist**

    * **Archivos:** `CartContainer.jsx`, `WishlistView.jsx`, `useWishlist.js`
    * **Lógica Carrito:** Persistencia de ítems y cálculo del `totalPrice` (`toFixed(2)`). Muestra un **Estado Vacío** que utiliza un **Carrusel** dinámico (`EmptyStateCarousel`) mostrando fotos artísticas en entornos naturales.
    * **Lógica Wishlist:** Permite al usuario **mover un ítem del Wishlist al Carrito** en una sola acción, eliminándolo simultáneamente del Wishlist para *optimizar la conversión*. El estado de favorito es visualmente consistente (icono `Heart` en color **`#FF69B4`**) a lo largo de la aplicación y tiene presencia en la barra de navegación.

* **4. Proceso de Checkout y Orden**

    * **Archivos:** `FormCheckout.jsx`, `CartContainer.jsx`
    * **Lógica:** El `FormCheckout` utiliza *inputs controlados* y ofrece una función de **Autocompletado Rápido** (`SIMULATED_USER_DATA`) para agilizar las pruebas. Tras el envío de datos, se llama a la función de Firebase `createOrder`, seguida de una secuencia de alertas **`SweetAlert2`** para confirmar el ID de orden y simular el seguimiento del envío.

* **5. Acceso y Gestión de Cuenta**
    * **Archivos:** `LoginView.jsx`, `UserProfile.jsx`
    * **Lógica:** El *Login* es simulado con credenciales *hardcodeadas*. El `UserProfile` está **protegido** por renderizado condicional, mostrando un *dashboard* completo con información personal y opciones de menú, o redirigiendo al usuario a la vista de login si la sesión está inactiva.

---
## 🎨 Diseño de Experiencia de Usuario e Interfaz (UX/UI)

El diseño del proyecto se centra en la **facilidad de uso**, la **claridad informativa** y el **refuerzo de la confianza**, alineando las decisiones de interfaz directamente con los objetivos de conversión.

### Decisiones de Diseño Estructural y Usabilidad

* **Estructura de Navegación Triple (Navbar):** El componente `Navbar` se descompone en **tres filas horizontales** para gestionar la densidad informativa:

    1. **Banner de Anuncios (`Banner.jsx`):** (Fila Superior) Mensajes promocionales rotativos (**cada 5 segundos**).
    2. **Fila Principal (Top Row):** Contiene el *Logo*, la **barra de Búsqueda Reactiva** y los **indicadores de utilidad** (Login, Wishlist, CartWidget).
    3. **Fila de Categorías (Bottom Row):** (Fila Inferior) Ofrece la navegación estructural del catálogo.

* **Optimización del Flujo de Datos (Checkout):** La función de **Autocompletado Simulado** (`SIMULATED_USER_DATA`) y el uso de *inputs controlados* garantizan una **experiencia de llenado eficiente** para el usuario ya registrado.

* **Manejo de Estados Vacíos:** Las vistas de Carrito y Wishlist vacías emplean el componente **`EmptyStateCarousel.jsx`**. Este carrusel dinámico (**rotación cada 3 segundos**) y las **Llamadas a la Acción (CTA) fuertes** transforman una vista inactiva en una oportunidad de retención.

### *User Feedback* y Contraste Visual

* ***User Feedback* Consistente:** Se utiliza la librería `react-toastify` para notificaciones asincrónicas no intrusivas ("Item añadido con éxito") y la librería **`SweetAlert2`** para alertas críticas de **alto impacto** (ej: Confirmación de Orden y ID), proporcionando una respuesta clara en las etapas de conversión.

* **Contraste de Acentos:** El color **`#FF69B4` (Fucsia)** se reservó como acento de **alto contraste** para el *flujo emocional* (**Wishlist**), diferenciándose del acento de **Éxito** (`#4CAF50`) y del **Acento Cálido** (`#A9543C`).

### Paleta de Colores Destacados

| Variable CSS | Color (HEX) | Propósito en la Interfaz |

| **`--color-primary`** | `#04434F` | *Texto principal*, elementos de **marca** y fondos de navegación. Proporciona una base oscura y profesional. |
| **`--color-secondary`** | `#A9543C` | Botones de acción complementaria y **acento cálido** (terracota). Utilizado para el *hover* y elementos secundarios. |
| **Acento Éxito** | `#4CAF50`| Indicadores de **éxito/disponibilidad** (Carrito, notificaciones de *toast*). |
| **Acento Wishlist** | **`#FF69B4`** | Iconografía y notificaciones del **flujo emocional de deseos**, maximizando la visibilidad. |

---
## 💻 Patrones de Programación y Arquitectura

El proyecto fue construido sobre una arquitectura funcional en React, priorizando la **modularidad** y la **eficiencia en el manejo de datos**.

### 1. Gestión de Estado con React Context API

Se utilizó el **React Context API** para establecer una estructura de **Estado Centralizado** que facilita el acceso a datos críticos:

* ***Persistencia y Aislamiento:***

    * **`CartContext`** | *Estado del Carrito* | Mantiene los datos del carrito (`cartItems`) **guardados en `localStorage`**, asegurando que el estado de la compra **no se pierda al recargar**.
    * **`AuthContext`** | *Estado de Sesión* | Controla el estado **`isLoggedIn`** con **persistencia** local, gestionando el acceso al **`UserProfile`**.
    * **`SearchContext`** | *Control de Filtros* | **Aísla la cadena de búsqueda**, permitiendo que la `Navbar` y el `ItemListContainer` se comuniquen sin depender de su posición jerárquica.

### 2. Lógica Reutilizable con Custom Hooks

Para adherirse al principio **DRY** (*Don't Repeat Yourself*), la lógica compleja se encapsuló en *Custom Hooks*:

* **`useWishlist()`** | *Lógica de Deseos* | **Centraliza todas las operaciones** (adición, remoción, persistencia) del *Wishlist*, permitiendo a los componentes consumirlas de **forma sencilla y clara**.
* **`useEffect`** | *Control de Ciclo de Vida* | Se utiliza para gestionar **tareas asíncronas** y el *data fetching* de Firebase. Activa la carga de productos de **Recomendaciones Cruzadas** solo cuando detecta un **cambio en la dependencia** (`currentProductId`), optimizando la solicitud de datos.

### 3. Control de Flujo con Renderizado Condicional

Se implementó el **Renderizado Condicional** para garantizar la seguridad y una UX consistente:

* ***Protección de Rutas:*** Componentes sensibles como **`UserProfile.jsx`** utilizan condicionales basados en el estado `isLoggedIn` para **restringir el acceso** al *dashboard* o redirigir a la vista de *Login*.
* ***Manejo de Vistas:*** Define si se debe mostrar una cuadrícula de contenido o las **Vistas de Estado Vacío** con el carrusel de recomendación (`EmptyStateCarousel.jsx`).

---
## Conclusión

El proyecto "Simaru" simula una plataforma e-commerce funcional, integrando una interfaz de usuario atractiva con una lógica de negocio clara y organizada. La arquitectura construida es una demostración práctica de cómo aplicar los fundamentos de **Programación Declarativa** de React, priorizando la **modularidad** del código y la **eficiencia en el manejo de datos** para una experiencia de usuario fluida.