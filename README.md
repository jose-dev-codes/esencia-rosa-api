# Esencia Rosa

## Descripción y objetivo

Esencia Rosa es una aplicación móvil para un salón de belleza.

Permite a los clientes:
- Registrarse e iniciar sesión de forma segura.
- Ver y actualizar su perfil.
- Cambiar su contraseña.
- Consultar servicios, especialistas y gestionar citas: crear, reagendar, cancelar, ver próximas e historial.

Permite a la aplicación:
- Proteger las rutas con autenticación JWT.
- Revocar sesiones cerradas para que el token no pueda reutilizarse.
- Validar los datos tanto en el frontend como en el backend.

## Tecnologías utilizadas

**Frontend — `client/`:**
- React Native + Expo
- TypeScript
- Expo Router
- AsyncStorage

**Backend — `server/`:**
- Node.js + Express
- PostgreSQL
- JWT (jsonwebtoken)
- bcryptjs
- express-validator / middlewares propios

**Herramientas:**
- pnpm (no se usa npm)
- Postman para pruebas del backend
- Expo Go para pruebas del frontend
- Git + GitHub para versionamiento

## Requisitos previos

- Node.js LTS instalado
- pnpm instalado
- PostgreSQL instalado y corriendo
- Expo Go instalado en el celular
- Git instalado

## Instalación de dependencias

Desde la raíz del proyecto:

### Backend

```bash
cd server
pnpm install
```

### Frontend

```bash
cd client
pnpm install
```

## Configuración de variables de entorno

### Backend — `server/.env`

```env
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_USER=tu_usuario
DB_PASSWORD=tu_contrasena
DB_NAME=esencia_rosa_db
JWT_SECRET=tu_clave_secreta
JWT_EXPIRES_IN=7d
```

### Frontend — `client/config/api.ts`

Verificar que `API_URL` apunte a la IP del PC donde corre el backend:

```ts
const API_URL = 'http://192.168.1.95:3000/api';
```

Si corres el backend en el mismo PC con Postman, puedes usar:

```ts
const API_URL = 'http://localhost:3000/api';
```

## Pasos para ejecutar el backend y el frontend

### 1. Ejecutar el backend

```bash
cd server
pnpm dev
```

El servidor queda corriendo en `http://localhost:3000`.

### 2. Ejecutar el frontend

```bash
cd client
pnpm start
```

Escanea el código QR con Expo Go.

## Instrucciones para probar las funcionalidades

### Pruebas del backend con Postman

Base: `http://localhost:3000/api`

**Autenticación:**
- `POST /usuarios` — registro
- `POST /auth/login` — inicio de sesión, devuelve token JWT
- `GET /usuarios/perfil` — con header `Authorization: Bearer <token>`
- `PUT /usuarios/:id` — actualizar datos personales, protegido
- `PATCH /usuarios/:id/contrasena` — cambiar contraseña, protegido
- `POST /auth/logout` — cierre de sesión, revoca el token

**Reglas que deben bloquearse:**
- Registro con correo duplicado → `400`
- Perfil sin token → `401`
- Actualizar con teléfono corto → `400`
- Cambiar contraseña débil → `400`
- Perfil con token revocado → `403`

**Citas:**
- `POST /citas` — crear cita
- `PUT /citas/:id` — reagendar cita
- `DELETE /citas/:id` o `PATCH /citas/:id/cancelar` — cancelar cita
- `GET /citas/horas-disponibles?id_especialista=...&id_servicio=...&fecha=...` — horas libres
- `GET /citas/dias-disponibles?id_especialista=...&id_servicio=...&anio=...&mes=...` — días con horas libres
- `GET /citas` — mis citas

**Reglas de citas que deben bloquearse:**
- Crear válida → `201` y crea la fila
- Crear ocupada → `400` con `El especialista ya tiene una cita en esa fecha y hora.`
- Crear con especialista inactivo → `400` con `El especialista no está activo.`
- Crear con servicio inactivo → `400` con `El servicio no está activo.`
- Crear con fecha pasada → `400` con `No se puede crear una cita con una fecha u hora pasada.`
- Crear con especialista que no ofrece el servicio → `400` con `El especialista no ofrece este servicio.`
- Crear con especialista que no trabaja ese día → `400` con `El especialista no trabaja ese día.`
- Crear con hora fuera del horario → `400` con `La hora está fuera del horario del especialista.`
- Editar válida → `200` con `Cita actualizada correctamente.`
- Editar a fecha/hora ocupada por otra → `400` con `ya tiene una cita`
- Editar a la misma fecha/hora de ella misma → `200`, no la bloquea, se excluye con el `id`
- Editar a fecha pasada → `400` con `No se puede actualizar una cita a una fecha u hora pasada.`
- Editar con especialista inactivo / que no ofrece el servicio / que no trabaja ese día / hora fuera del horario → `400` con el mensaje de cada regla
- Editar cita cancelada → `400` con `No se puede editar una cita cancelada.`
- Editar cita completada → `400` con `No se puede editar una cita completada.`
- Cancelar pendiente → `200` con `Cita cancelada correctamente.` y queda en `cancelada`
- Cancelar ya cancelada → `400` con `No se puede cancelar una cita cancelada.`
- Cancelar completada → `400` con `No se puede cancelar una cita completada.`
- Horas/días con servicio inactivo → `400` con `El servicio no está activo.`
- Servicio no encontrado → `404` con `Servicio no encontrado.`
- Especialista no encontrado → `404` con `Especialista no encontrado.`
- Cita no encontrada → `404` con `Cita no encontrada.`

**Refactor en `citaServicio.js`:**
- `validarServicio(id_servicio)` — revisa que exista y esté activo, la usan `crear`, `editar`, `horas` y `días`, sin repetir el bloquecito.
- `validarCita(id, accion)` — hace el `buscarCitaPorId`, revisa `noEncontrada` y que no esté cancelada ni completada, con el mensaje `No se puede ${accion} una cita...`, la usan `editar` y `cancelar`.
- `validarEspecialista` — revisa que exista, que sea especialista/admin y que esté activo.
- Controller `crear` y `actualizar` ya leen los 2 `404`, de servicio y de especialista.

### Pruebas del frontend con Expo Go

1. **Registro:** registrar usuario nuevo → debe salir `ModalExito` y llevar a iniciar sesión.
2. **Iniciar sesión:** entrar con correo y contraseña correctos → debe entrar a `/inicio`.
3. **Perfil:** debe mostrar datos reales, header `Mi perfil`.
4. **Actualizar usuario:** cambiar teléfono → debe actualizarse y verse en perfil.
5. **Cambiar contraseña:** poner nueva + confirmar igual → debe salir `ModalExito` y volver a perfil.
6. **Cerrar sesión:** debe volver a login. La contraseña vieja ya no entra, la nueva sí.
7. **Citas — Crear:** entrar a `crear-cita`, elegir servicio activo, especialista activo que sí hace ese servicio, fecha futura con días disponibles, hora libre → debe salir `ModalExito` y salir en `Próximas`.
8. **Citas — Reagendar:** en `Próximas`, dar `Reagendar`, cambiar fecha/hora a otra libre → debe salir `ModalExito` y cambiar en la lista.
9. **Citas — Cancelar:** en `Próximas`, dar `Cancelar` → debe salir `ModalEliminarCita` con `Cancelar cita`, `¿Estás seguro...?`, `Si confirmas, no podrás reagendarla.` y botones `No` y `Sí, cancelar` en una sola línea. Dar `No` no cancela. Dar `Sí, cancelar` → debe salir `ModalExito` con `Cita cancelada con exito.` y pasar a `Historial` en cancelada.
10. **Citas — Pestañas y estado:** `Próximas` solo muestra `pendiente`, `Historial` solo `cancelada` y `completada`. Botones `Reagendar` y `Cancelar` solo salen en `pendiente`. Iconos de estado: `pendiente` reloj con `?` rosado `#D922AC`, `cancelada` círculo con `X` rojo `#D63031`, `completada` círculo con check verde oscuro `#00875A`.
11. **Citas — Vacíos y scroll:** si no hay citas, debe salir `¡No tienes citas agendadas!` o `¡Historial vacío!` sin caerse. La barra de scroll solo se ve cuando las citas superan el alto de la pantalla y se mueve suave.
12. **Citas — Modales:** `ModalEliminarCita` y `ModalExito` van al final del árbol en `PantallaCitas`, después del botón flotante, para que el `MaskedView` no interfiera y el `fade` sí se note al abrir y al cerrar.

## Metodología de versionamiento

- Rama principal: `main` — siempre estable.
- Ramas de módulo: `modulo/autenticacion`, `modulo/servicios`, `modulo/citas`, `modulo/especialistas`.
- Ramas de funcionalidad: `funcionalidad/nombre`.
- Commits en español, descriptivos.
- Pruebas antes de integrar.
- Merge local, sin Pull Requests como habitual.
- No se usa rama `desarrollo` permanente.

## Estado actual

- **Hito 1:** estructura del proyecto y módulo de gestión de usuarios.
- **Hito 2:** implementación del módulo de autenticación e integración con usuarios.
    - Registro, inicio de sesión, perfil, actualizar usuario, cambiar contraseña.
    - Protección de rutas con JWT.
    - Revocación de tokens con `tokens_revocados`.
    - Validaciones en frontend y backend.
    - Pruebas de regresión en Postman y Expo Go aprobadas.
- **Hito 3:** implementación del módulo de citas.
    - Crear, reagendar, cancelar, listar próximas e historial, horas y días disponibles.
    - Validaciones en backend: servicio y especialista activos, especialista ofrece el servicio, trabaja ese día, hora dentro del horario, fecha no pasada, no ocupada, no editar ni cancelar cita cancelada o completada.
    - Refactor: `validarServicio` y `validarCita` sin repetir código, `404` de servicio y especialista leídos en controller.
    - Frontend: crear, reagendar y cancelar con modales, pestañas, iconos de estado, botones solo en pendiente, vacíos y scroll.
    - Pruebas de regresión en Postman y Expo Go aprobadas.
