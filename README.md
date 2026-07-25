#  Cafetería - Frontend Web

Interfaz gráfica de usuario para el sistema de punto de venta (POS) e inventario de cafetería. Diseñada con una arquitectura de cliente ligero consumiendo una API REST desarrollada en Spring Boot.

---

## Repositorio del Backend

Para que la interfaz funcione con datos reales, requiere tener en ejecución la API del backend. Puedes revisar y clonar el repositorio del servidor en el siguiente enlace:

 **[Ir al Repositorio del Backend (Spring Boot API)](https://github.com/Anton-2012/POS-Backend-SBoot)**

---

## Tecnologías Utilizadas

* **HTML5 & CSS3:** Maquetado semántico e interfaz adaptable.
* **Bootstrap 5:** Diseño responsivo, componentes visuales (tablas, cards, navbars) y utilidades de estilo.
* **JavaScript (Vanilla - ES6+):** Manipulación dinámica del DOM y manejo de peticiones asíncronas mediante `Fetch API`.
* **SweetAlert2:** Modales interactivos para confirmación de acciones y retroalimentación de usuario.

---

## Módulos del Sistema

*  **Gestión de Productos (`index.html`):** Consulta y administración del inventario de productos de la cafetería.
*  **Colaboradores (`Empleado.html`):** Control y registro del personal/empleados.
*  **Historial de Ventas (`Ventas.html`):** Registro de transacciones con opción de filtrado y desactivación/cancelación lógica de ventas.
*  **Realizar Venta (`NuevaVenta.html`):** Interfaz de Punto de Venta (POS) estructurada en dos columnas: catálogo interactivo a la izquierda y resumen/ticket con cálculo de total a la derecha.

---

## Instrucciones de Ejecución

1. **Asegurar el Backend:** Clonar e iniciar el proyecto `POS-Backend-SBoot` en el puerto por default (`http://localhost:8080`).
2. **Clonar este repositorio:**
   ```bash
   git clone [https://github.com/Anton-2012/POS-Frontend-Vanilla.git](https://github.com/Anton-2012/POS-Frontend-Vanilla.git)