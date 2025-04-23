# 🚀 Cheatsheet: React + Vite + Tailwind CSS v4 (con SWC y sin PostCSS manual)

## 🧱 1. Crear proyecto Vite + React + TypeScript

```bash
npm create vite@latest chat-ia-linear -- --template react-ts
cd chat-ia-linear
npm install
```

---

## 🔍 2. Instalar ESLint (opcional pero recomendado)

```bash
npm install -D eslint
npx eslint --init
```

---

## 🎨 3. Instalar TailwindCSS + Plugin oficial para Vite + Instalar headless y heroIcons para componentes sin estilos asi se aplica bien con tailwind

```bash
npm install -D tailwindcss @tailwindcss/vite

npm install @heroicons/react
npm install @headlessui/react

```

> ✅ Ya **NO** necesitás `postcss`, `autoprefixer` ni `postcss.config.js`.

---

## ⚙️ 4. Configurar `vite.config.ts` con SWC

```ts
// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
});
```

---

## 💅 5. Estilos globales: `src/index.css`

```css
@import "tailwindcss";
/* src/index.css */
@import "tailwindcss/preflight" @tailwind utilities;
@tailwind utilities;
@custom-variant dark (&:where([data-theme=dark], [data-theme=dark] *));

@layer components {
  .btn {
    @apply px-4 py-2 rounded font-semibold text-white bg-[#1165EC] hover:bg-[#0e5bd1] transition;
  }
  .btn-outlined {
    @apply px-4 py-2 rounded font-semibold text-[#1165EC] bg-white border border-[#1165EC] hover:bg-[#f0f7ff] transition;
  }
  .title {
    @apply text-2xl font-[700];
  }
}

@layer base {
  [data-theme="light"] {
    --theme-bg: #ffffff;
    --theme-fg: #111111;
    --theme-muted: #6b7280;
  }

  [data-theme="dark"] {
    --theme-bg: #111827;
    --theme-fg: #f9fafb;
    --theme-muted: #9ca3af;
  }

  body {
    background-color: var(--theme-bg);
    color: var(--theme-fg);
  }
}
```

> 🎨 Esta configuración permite cambiar temas dinámicamente con `data-theme="dark"` o `"light"`.

---

## 🌙 6. Configuración de Tailwind: `tailwind.config.js`

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

> ❗Ya no es necesario definir `darkMode: 'class'` si usás `data-theme`. Usalo sólo si vas a usar `dark:` en clases.

---

## 🧠 7. Estructura recomendada del proyecto

```
/src
  /components       // UI genéricos
  /modules          // Agente, Memoria, Linear...
  /services         // api/chatgpt.ts, api/linear.ts
  /hooks            // useChat.ts, useLinearAgent.ts
  /context          // ChatContext, MemoriaContext
  /types            // mensajes, intenciones, tareas
  /pages            // ChatPage, SettingsPage, etc.
  App.tsx
  main.tsx
  index.css
```

---

## 🌐 8. React Router (opcional)

```bash
npm install react-router-dom
```

### 🧪 Ejemplo de `App.tsx` con React Router

```tsx
// src/App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DarkModeToggle } from "./components/DarkModeToggle";
import ChatPage from "./pages/ChatPage";
import SettingsPage from "./pages/SettingsPage";

function App() {
  return (
    <BrowserRouter>
      <header className="p-4 flex justify-between items-center bg-[var(--theme-bg)] text-[var(--theme-fg)]">
        <h1 className="text-xl font-bold">Mi App</h1>
        <DarkModeToggle />
      </header>
      <main className="p-4">
        <Routes>
          <Route path="/" element={<ChatPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
```

---

## 🌗 9. Toggle para modo oscuro con `data-theme`

```tsx
// components/DarkModeToggle.tsx
import { useEffect, useState } from "react";

export function DarkModeToggle() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const saved = localStorage.getItem("theme") || "light";
    setTheme(saved);
    document.documentElement.setAttribute("data-theme", saved);
  }, []);

  const toggle = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <button
      onClick={toggle}
      className="p-2 rounded bg-[var(--theme-muted)] text-[var(--theme-fg)]"
    >
      {theme === "dark" ? "☀️ Claro" : "🌙 Oscuro"}
    </button>
  );
}
```

---

## 🌗 10. Custom default page

```tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import reactLogo from "../assets/react.svg";
import viteLogo from "/vite.svg";
import { Button } from "../components/ui/Button";

function DefaultPage() {
  const [count, setCount] = useState(0);
  const navigate = useNavigate(); // 👈 hook para navegar

  const handleStartChat = () => {
    navigate("/chat");
  };

  return (
    <div className="h-[89vh] flex items-center justify-center bg-[var(--theme-bg)] text-[var(--theme-fg)] transition-colors p-4">
      <div className="w-full px-80 text-center">
        <div className="mb-6 p-4 bg-green-500 text-white text-xl rounded shadow">
          Si esto es verde, Tailwind funciona 🎉
        </div>

        <div className="flex items-center justify-center gap-4 mb-6">
          <a href="https://vite.dev" target="_blank">
            <img
              src={viteLogo}
              alt="Vite logo"
              className="w-16 h-16 hover:scale-110 transition-transform"
            />
          </a>
          <a href="https://react.dev" target="_blank">
            <img
              src={reactLogo}
              alt="React logo"
              className="w-16 h-16 hover:scale-110 transition-transform"
            />
          </a>
        </div>

        <h1 className="text-3xl font-bold mb-4">Vite + React</h1>

        {/* ✅ Botón con navegación */}
        <Button onClick={handleStartChat} className="mb-6">
          Empezar a chatear
        </Button>

        <div className="bg-[var(--theme-muted)] p-4 rounded shadow mb-4 w-full">
          <button
            onClick={() => setCount((count) => count + 1)}
            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
          >
            count is {count}
          </button>
          <p className="mt-2">
            Edit{" "}
            <code className="bg-[color:rgba(0,0,0,0.1)] px-1 rounded">
              src/App.tsx
            </code>{" "}
            and save to test HMR
          </p>
        </div>

        <p className="text-[var(--theme-muted)]">
          Click on the Vite and React logos to learn more
        </p>
      </div>
    </div>
  );
}

export default DefaultPage;
```

---

## 🧾 Notas finales

- **Tailwind CSS** reemplaza casi todo el CSS tradicional con utilidades listas para usar.
- **No necesitás configurar PostCSS ni Autoprefixer** con Vite y Tailwind v4.
- **Para temas dinámicos, usá `data-theme` y CSS variables** como en este ejemplo.
- **Vite + React + SWC + Tailwind = setup liviano, rápido y moderno**.

---
