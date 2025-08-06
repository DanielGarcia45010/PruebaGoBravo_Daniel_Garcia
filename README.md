# PruebaGoBravo_Daniel_Garcia
# 📰 RSS Aggregator

Este proyecto es un **agregador de fuentes RSS** que combina entradas de múltiples feeds, las ordena por fecha de publicación y las muestra en un frontend visual y fácil de leer. Toda la información se actualiza automáticamente cada 24 horas.

---

## 📌 Características principales

- 🔄 Agrega múltiples feeds RSS.
- 🧠 Muestra título, resumen, imagen destacada y fecha de publicación.
- 🕒 Se actualiza automáticamente cada 24 horas (configurado con `@Scheduled`).
- ✅ Interfaz amigable y responsiva en Angular.
- 📦 Generación de archivo `entries.json` para ser consumido por el frontend.
- 🧩 Proyecto Fullstack: **Spring Boot + Angular 18**.

---

## ⚙️ Decisiones técnicas

- Se usó **Spring Boot** con programación automática (`@Scheduled`) para generar el archivo `entries.json` una vez al día sin intervención manual.
- El uso de **Rome (rometools)** permite leer y parsear los feeds RSS de forma confiable.
- Se usó **Angular 18** con servicios (`HttpClient`) para consumir el archivo JSON generado por el backend.
- No se utilizan bases de datos, lo que reduce la complejidad para desplegarlo o probarlo rápidamente en cualquier entorno.

---

## ♻️ Escalabilidad

- El proyecto puede escalar fácilmente para:
  - Incluir más fuentes RSS agregándolas al `RssAggregatorService`.
  - Sustituir el almacenamiento por archivos con una base de datos para persistencia a largo plazo.
  - Servir `entries.json` desde un CDN o almacenamiento en la nube.
- La lógica está desacoplada entre frontend y backend, permitiendo una evolución independiente de cada uno.
- Se puede dockerizar fácilmente para entornos productivos (opcional en futuras versiones).

---

## 🚀 Cómo correr el proyecto

### Requisitos previos

- Java 17+
- Node.js 18+
- Angular CLI 18+
- Maven
- Git

### 1. Correr el backend
mvnw.cmd clean install
mvnw.cmd spring-boot:run

### 2. Correr el frontend
cd frontend
npm install
ng serve


Desarrollado por: Daniel Garcia
