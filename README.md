# 🎨 Cult Hunter

**Cult Hunter** es una plataforma web diseñada para artistas y emprendedores que necesitan mostrar su trabajo de forma profesional, moderna y personalizable.

Pensado especialmente para tatuadores, marcas de ropa y creadores visuales, Cult Hunter permite tener una presencia online atractiva sin necesidad de conocimientos técnicos.

---

## 🚀 Demo

🚧 Proyecto en desarrollo

---

## ✨ Características principales

* 🖼️ Galería visual moderna para mostrar trabajos
* 🎨 Personalización de estilos (colores, tipografía, layouts)
* 📦 Gestión de contenido (posts, imágenes, categorías)
* ⚡ Rendimiento optimizado con Next.js
* 🔐 Panel de administración privado (solo admins)
* ☁️ Backend integrado con Supabase

---

## 🎯 Objetivo del proyecto

Crear una solución lista para vender a:

* Tatuadores
* Marcas de ropa
* Artistas digitales
* Emprendedores creativos

La idea es ofrecer una web profesional lista para usar, sin que el cliente tenga que programar nada.

---

## 🛠️ Tech Stack

* **Frontend:** Next.js (App Router)
* **Estilos:** TailwindCSS
* **Backend / DB:** Supabase
* **Lenguaje:** TypeScript

---

## 📁 Estructura del proyecto

/app → rutas principales
/components → componentes reutilizables
/lib → configuración (Supabase, utils)
/services → lógica de negocio
/types → tipado TypeScript

---

## ⚙️ Instalación

1. Clonar el repositorio:

git clone https://github.com/tuusuario/tahm-cult.git
cd tahm-cult

2. Instalar dependencias:

npm install

3. Configurar variables de entorno:

Crear un archivo `.env.local`:

NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key

4. Ejecutar el proyecto:

npm run dev

---

## 🔐 Autenticación

Actualmente el sistema de autenticación está:

* Disponible solo para administradores
* Oculto al usuario final
* Usado para gestionar contenido internamente

---

## 📌 Roadmap

* [ ] Sistema multi-cliente (multi-tenant)
* [ ] Panel de administración visual
* [ ] Editor de contenido (tipo CMS)
* [ ] Deploy automático por cliente
* [ ] Integración de pagos
* [ ] Dominio personalizado por cliente

---

## 💡 Modelo de negocio

Tahm Cult está pensado como un producto digital:

* Venta de páginas personalizadas
* Suscripción mensual (hosting + mantenimiento)
* Posible expansión a SaaS

---

## 🤝 Contribución

Proyecto en desarrollo activo.

---

## 👨‍💻 Autor

**Maximo Garmasar Vazquez**
Frontend Developer

* GitHub: https://github.com/maximogarmasarvazquez
* LinkedIn: https://www.linkedin.com/in/maximogarmasarvazquez/

---

## 📄 Licencia

MIT License
