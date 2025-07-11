
# DOCUMENTACIÓN DEL PROYECTO:

## App de reservas - Backend

### Nombre proyecto: JobixApp

Este es el backend del proyecto **Jobix**, una plataforma de reservas de servicios técnicos (electricistas, plomeros, mecánicos, etc.) desarrollada con **Spring Boot**. Este servicio se encarga de gestionar la lógica de negocio, seguridad, acceso a datos y comunicación con el frontend de la aplicación.

---

##  Link del repositorio Frontend & backend
El respositorio contiene tanto el frontend como el backend.

**Nombre del repositorio:** Aplicación de reservas
**Descripción:** Desafio final DH - Frontend y Backend (React y Java Spring Boot)
**Enlace de repositorio:** `https://github.com/alfredmu7/Aplicacion-de-reservas.git`

---
## Ejecutar el proyecto JobixApp (Frontend + Backend) desde tu computadora

Clonar el repositorio: Abre tu terminal y ejecuta: `git clone https://github.com/alfredmu7/Aplicacion-de-reservas.git`

**Backend**
**Asegúrate de tener instalado en tu máquina o pc:**Node.js, npm, Java JDK, Maven, Git, MySQL o H2
1- Dentro del proyecto, ve a la carpeta del backend (por ejemplo, jobix-backend) usando el comando: `cd backend`
2- Si no existe o no esta creada. En el mismo nivel del backend, crea una carpeta para almacenar imágenes subidas: `mkdir img_uploads`
3- Ejecutar el backend: `./mvnw spring-boot:run` o si tienes Maven instalado globalmente: `mvn spring-boot:run`
4- El backend se debería levantar en: `http://localhost:8080`


**Frontend**
**Asegúrate de tener instalado en tu máquina o pc:** 
1- En la terminal ejecuta para hacer las instalaciones correspondientes: `npm install`
2- Ejecutar el frontend: `npm run dev`
3- Esto abrirá la app en: `http://localhost:5173`

**Recuerda:**
1- Algunas funciones como favoritos, reservas o panel de administración requieren que el usuario haya iniciado sesión.
2- Asegúrate de ejecutar frontend y backend en la misma máquina.
---

## Tecnologías utilizadas

- Java 17
- Spring Boot
- Spring Data JPA (Hibernate)
- Spring Security
- MySQL / H2
- Maven
- SendGrid (para notificaciones por email)

---

## Arquitectura general

El proyecto sigue una estructura de capas limpia y organizada:

- **Controller**: recibe y responde las solicitudes HTTP.
- **Service**: contiene la lógica de negocio.
- **Repository**: maneja la persistencia de datos con JPA.
- **Model/Entity**: define las entidades que representan las tablas en la base de datos.
- **Config**: manejo de configuraciones, permisos, accesos y seguridad.

---
## Carga inicial de la base de datos
###  Este proyecto no incluye scripts automáticos para poblar la base de datos.

La base de datos debe alimentarse manualmente, ya sea insertando datos desde el panel de
administración (frontend) o directamente desde un cliente de base de datos (MySQL Workbench u otros).
Por ejemplo, las categorías, features (características), productos, usuarios y demás, deben ser ingresados manualmente al principio (dentro del panel de admin está la opción para agregar cada uno), estos se agregarán en el formulario para agregar nuevo producto (aplica solo para categoría y características).

Tener en cuenta: Al iniciar el proyecto por primera vez, verás una aplicación funcional, pero sin datos pre-cargados.

Con el fin de poder visualizar y comprobar que si se este alimentando la Base de Datos una vez ingresados los datos desde el frontend o la pagina web. 
1- Escribe en tu navegador: localhost:8080/h2-console/
2- Ingresa el password: sa 
3- Clic en botón "Connect"
4- Accederás a la base de datos y podras verificar la informacion que ingresaste desde el frontend

---

## Cuenta establecida desde el backend con rol: ADMIN

En el backend, se reconoce automáticamente como administrador al usuario con el siguiente correo electrónico:

**Email admin**: admin@jobix.com

**Password sugerido**: Ahhhh123!!

Esta cuenta no se encuentra pre-cargada automáticamente. Debes crearla desde el formulario de registro (frontend).

### Pasos para activar el administrador:

1- Entra a la aplicación y regístrate con el correo anterior (email admin).

2- Inicia sesión (login) con los mismos datos.

3- El backend reconocerá el correo admin@jobix.com como cuenta de administrador y activará el acceso al panel de administración, al desplegar la opción de "Mi perfil" en el header de la pagina web.

---
## Carga de imágenes de productos
### Es necesario crear una carpeta en el backend para almacenar imágenes 
**Si ya está creada la carpeta `img_uploads` , omitir este paso.
**

Cuando agregues productos con imágenes desde el formulario del administrador, las imágenes se guardarán en una carpeta llamada "img_uploads". Esta carpeta no existe por defecto, así que debes crearla tú mismo antes de poder guardar imágenes.

### Cómo crear la carpeta en el backend:

Antes de guardar un producto, con el finde evitar errores, es necesario:

1- Ubicado en la raíz del proyecto backend, abre la terminal.

2- Ejecuta este comando: mkdir img_uploads (crearás la carpeta en la que se guardarán las imágenes que proporciones desde el frontend, exactamente al crear producto nuevo).

---

## Bitácora de desarrollo del Backend

### Sprint 1 – Configuración inicial y gestión de productos

- Se configuró el entorno base de Spring Boot.
- Se definieron las entidades principales como `Product`, `User` y `Image`.
- Se creó el panel de administración, accesible solo para usuarios con rol `ADMIN`, con endpoints protegidos.
- Se implementó el registro de productos desde el backend, incluyendo nombre, descripción e imágenes.
- Se construyó el servicio para listar y consultar productos.
- Se aplicaron validaciones para datos requeridos.

---

### Sprint 2 – Seguridad y gestión de categorías

- Se implementó el sistema de autenticación y autorización con gestión de sesión con **HttpSession**, asignando un identificador "JSESSIONID" y guardando el ID como una cookie en el navegador.
- Se estableció el control de acceso a rutas según roles (`USER`, `ADMIN`).
- Se creó el servicio de registro e inicio de sesión de usuarios.
- Se integró la funcionalidad para que el administrador gestione productos (editar, eliminar).
- Se añadieron **categorías** y **features/características**, asociadas a los productos.
- Los endpoints permiten obtener categorías activas y asignarlas al crear o editar un producto.

---

### Sprint 3 – Reservas, favoritos y reseñas

- Se desarrolló el sistema de **reservas**, con validación de disponibilidad de fechas.
- Se evitó la creación de reservas en días previamente ocupados.
- Se implementó el endpoint para agregar productos a favoritos por parte de los usuarios.
- Se crearon los servicios para que el usuario pueda **puntuar y comentar** los servicios una vez finalizados.
- Se añadieron políticas asociadas a los productos para su visualización desde el frontend.
- Se implementaron endpoints para búsquedas y filtrados de productos.

---

### Sprint 4 – Flujo completo de reserva

- Se completó el flujo de reservas: búsqueda por fechas, selección de producto y confirmación.
- Solo los usuarios autenticados pueden hacer una reserva.
- Se creó el endpoint para obtener el **historial de reservas** del usuario.
- Se habilitó una funcionalidad de comunicación directa entre el usuario y el técnico (estructura preparada).
- Se integró el servicio de envío de **correo de confirmación** tras una reserva, utilizando SendGrid.
- Se aplicaron mejoras en el control de errores, seguridad y limpieza del código.

---

## Endpoints principales

| Recurso    | Método | Ruta                     | Descripción                   |
|------------|--------|--------------------------|-------------------------------|
| Auth       | POST   | `/auth/register`         | Registro de usuario           |
| Auth       | POST   | `/auth/login`            | Inicio de sesión              |
| Productos  | GET    | `/product`               | Listar productos              |
| Productos  | POST   | `/products`              | Crear producto (solo admin)   |
| Categorías | GET    | `/categories`            | Listar categorías             |
| Reservas   | POST   | `/reservations`          | Crear reserva                 |
| Favoritos  | POST   | `/favorites/{productId}` | Agregar producto a favoritos  |
| Reseñas    | POST   | `/reviews`               | Calificar y comentar producto |
| User       | GET    | `/users`                 | Usuarios                      |



## Tests

Se utilizó JUnit y Mockito para el testeo de servicios y controladores.

### Inicio de sesion

En esta clase de pruebas `AuthControllerSessionTest` se aplicaron tests de integración para la autenticación de usuarios usando sesiones **(HttpSession)** en una aplicación Spring Boot. Se realizaron dos pruebas principales: la primera valída que un nuevo usuario puede registrarse exitosamente mediante una solicitud **POST** al endpoint /api/auth/register, esperando una respuesta satisfactoria (200 OK). 

La segunda prueba simula el flujo completo de autenticación: registra un usuario, luego realiza el inicio de sesión con sus credenciales mediante **POST** a `/api/auth/login`, y finalmente verifica que se haya creado correctamente una sesión de usuario comprobando que existe el atributo SPRING_SECURITY_CONTEXT en la sesión **(HttpSession)**. Estas pruebas garantizan que el mecanismo de login con sesión funcione correctamente de extremo a extremo.

---

### Realizar reserva con éxito

En la clase `ConfirmReservationDetailsTest` se aplicó una prueba unitaria con Mockito enfocada en el servicio de reservas. El test simula el comportamiento de los repositorios (`UserRepository` y `ProductRepository`) para verificar que el método `prepareReservationForm` del `ReservationService` construya correctamente una reserva temporal con los datos del usuario autenticado, el producto seleccionado y el rango de fechas.

Se usaron objetos `@Mock` para evitar dependencias reales de base de datos, y se utilizaron `when(...).thenReturn(...)` para simular las respuestas de los métodos `findById`. Finalmente, con varias aserciones (`assertEquals`), se validó que los atributos del objeto `Reservation` devuelto coincidan con los datos simulados, asegurando que la lógica del servicio funcione como se espera.

---

### Eliminación de productos

En la clase `ProductControllerTest` se implementó una prueba de integración para verificar la eliminación de productos desde el controlador. Usando `@SpringBootTest` y `@AutoConfigureMockMvc`, se simula una petición HTTP DELETE al endpoint `/api/product/{id}` como un usuario con rol `ADMIN` (mediante `@WithMockUser`).

Primero, se crea y guarda una categoría en la base de datos, luego se crea un producto asociado a dicha categoría y también se guarda. La prueba realiza la solicitud de eliminación mediante `mockMvc.perform(delete(...))` y valída que la respuesta tenga un estado `200 OK`. Finalmente, se comprueba que el producto ya no exista en la base de datos con `assertFalse(deleted.isPresent())`, asegurando así que la operación fue exitosa.

---

### Creación de productos 

En la clase `ProductCreationTest` se llevó a cabo una prueba de integración para validar la creación de productos asociados a una categoría. Usando `@SpringBootTest` y `@AutoConfigureMockMvc`, junto con `@WithMockUser(roles = "ADMIN")`, se simula una petición **POST** al endpoint `/api/product` enviando un producto en formato JSON con nombre, descripción y una categoría previamente guardada.

Antes de cada test, se limpia la base de datos y se crea una categoría simulada en el método `@BeforeEach`. Luego, en la prueba principal, se realiza la petición de creación y se espera un estado `201 Created`. Finalmente, se recuperan todos los productos guardados para verificar que se haya creado uno solo, y se comprueba que el nombre y la categoría del producto coincidan con los valores enviados.

---

### Disponibilidad de fechas

En la clase `ReservationControllerTest` se implementó una prueba unitaria enfocada en el endpoint de disponibilidad de fechas. Utilizando `@WebMvcTest` con exclusión de configuraciones de seguridad (`SecurityAutoConfiguration` y `SecurityFilterAutoConfiguration`), se simuló el comportamiento del controlador `ReservationController` aislado del resto de la aplicación. Se usaron mocks de `ReservationService` y `UserService` para evitar llamadas reales a la lógica de negocio.

La prueba `shouldReturnBookedDatesForProduct` verifica que el endpoint `/api/reservations/product/1/availability` responda correctamente con un listado de fechas ocupadas. Se simula el retorno de fechas desde el servicio, y luego se comprueba que la respuesta HTTP sea `200 OK`, que el contenido sea JSON y que contenga exactamente las fechas esperadas. Esta prueba asegura que la lógica del controlador funcione correctamente y que los datos se devuelvan en el formato previsto.

---

### Lógica de validación de fechas superpuestas

En la clase `ReservationOverlappingTest` se implementó una prueba unitaria utilizando Mockito para verificar la lógica de validación de fechas en el servicio de reservas. El objetivo fue asegurar que el sistema impida crear una nueva reserva cuando las fechas se superponen con una ya existente. Se simularon los repositorios (`ReservationRepository`, `ProductRepository`, `UserRepository`) y se inyectaron en `ReservationService`.

La prueba `shouldNotAllowReservationIfDatesOverlap` crea un producto y simula una reserva existente. Luego intenta realizar una nueva reserva para el mismo producto, generando un conflicto de fechas. Gracias al uso de `when(...).thenReturn(...)`, el mock del repositorio devuelve la reserva en conflicto, y el test valída que el método `createReservation` lanza una excepción `IllegalArgumentException` con el mensaje esperado. Esta prueba garantiza que la lógica de prevención de solapamiento de fechas funcione correctamente.









