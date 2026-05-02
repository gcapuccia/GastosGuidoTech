# 💸 App de Gestión de Gastos para Freelancers

Aplicación web desarrollada con **Next.js + Supabase** para gestionar ingresos, gastos y ahorro mensual de forma simple y visual.

---

## 🚀 Demo

👉 (agregá acá tu link de Vercel cuando lo publiques)

---

## 🧠 Descripción

Esta aplicación permite a freelancers llevar un control claro de sus finanzas:

- Registrar ingresos y gastos
- Visualizar totales y ahorro
- Filtrar por mes y año
- Analizar gastos por categoría
- Exportar datos a Excel

---

## ✨ Features

- 🔐 Autenticación con Supabase (login / registro)
- 💰 Gestión de ingresos y gastos
- 📊 Dashboard con métricas:
  - Ingresos
  - Gastos
  - Ahorro
- 📅 Filtro por mes y año
- 📈 Gráfico de gastos por categoría
- 📤 Exportación a Excel
- 🎨 UI moderna con Tailwind CSS

---

## 🛠️ Tecnologías utilizadas

- ⚛️ Next.js (App Router)
- 🟦 React
- 🎨 Tailwind CSS
- 🧩 Supabase (Auth + Database)
- 📊 Recharts
- 📁 XLSX (exportación a Excel)

---

## 📂 Estructura del proyecto



### 🔹 Descripción

- **app/** → páginas y routing (Next.js)
- **components/** → UI (cards, forms, listas, gráficos)
- **hooks/** → lógica de negocio (estado, controladores)
- **services/** → acceso a datos (Supabase)
- **lib/** → configuración y utilidades

---

## ⚙️ Instalación y uso

### 1. Clonar el repo
- git clone https://github.com/tu-usuario/tu-repo.git
- cd tu-repo
- npm install

###Configurar variables de entorno si vas a usarlo en local
- Crear archivo .env.local:
NEXT_PUBLIC_SUPABASE_URL=tu_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_key
### Ejecutar el proyecto:
npm run dev

