# Mini Paint con React + Tailwind – Prueba Técnica Front-End Senior

Este proyecto fue desarrollado como parte de una **prueba técnica** para una posición de _Desarrollador Front-End Senior_. El objetivo era construir una aplicación web interactiva tipo “paint”, basada en una grilla de celdas.

---
## Pagina del deploy

https://paint-proyect-with-react.vercel.app/

---

## 🎯 Objetivo del test

> Implementar una red de celdas cuadradas (100 columnas por pantalla completa) que permita dibujar imágenes simples:
>
> - Click izquierdo activa o desactiva la celda.
> - Click derecho despliega un selector de color personalizado.
> - Debe permitir pintar arrastrando el mouse.
> - No debe generar scroll vertical: toda la grilla se ajusta al alto visible.

---

## 🧠 Decisiones técnicas

Aunque una opción natural para este tipo de UI podría haber sido usar `<canvas>` o jQuery (permitidos por las bases del test), decidí **usar React y TailwindCSS** para:

- Mostrar mi dominio de React + Tailwind que es lo que busca la posicion.
- Aplicar principios de eficiencia en el renderizado, incluso con **más de 5.000 celdas en pantalla**.
- Diseñar el código pensando en escalabilidad y mantenimiento.
- Trabaje utilizando gitflow

### 🔍 Enfoque en performance

El proyecto está optimizado para un uso intensivo de celdas, con estrategias como:

- Separación inteligente de estado y renderizado.
- Componentes livianos y memoizados donde corresponde.
- Renderizado reactivo y controlado para evitar cuellos de botella.

Podés revisar el código para ver más detalles sobre cómo se abordaron estas optimizaciones.

---

## 🛠️ Tecnologías utilizadas

- **React 19** + **Vite 6**
- **TypeScript 5**
- **TailwindCSS 4**
- **React Colorful** para el selector de color.
- **Lucide Icons** para íconos SVG modernos.
- Linter con **ESLint** y plugins para React y hooks.

---

## 🚀 Cómo correr el proyecto

1. Cloná el repositorio:

```bash
git clone https://github.com/tu-usuario/proyecto-paint.git
cd proyecto-paint
```


2. Cambia de rama en github:

```bash
git checkout dev
o
git checkout prod
```

3. Obten los cambios:

```bash
git pull
```

4. Instalá las dependencias:

```bash
npm install
```

5. Iniciá el servidor de desarrollo:

```bash
npm run dev
```

6. También podés compilarlo con:

```bash
npm run build
```

7. O ver la app compilada localmente con:

```bash
npm run preview
```

---

## 📁 Estructura del proyecto

- `src/components`: Componentes como `Cell`, `ColorPicker`.
- `src/context`: estados globales.
- `src/utils`: Helpers y funciones auxiliares.

---

## ✅ Estado actual

Funcionalidades completas según requisitos del test. Código modular, tipado, y optimizado.

---

## 🤖 Créditos

_Readme creado con asistencia de [ChatGPT](https://chat.openai.com) para claridad, estructura y estilo._
