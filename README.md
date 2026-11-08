# Esencia Rosa

## Descripción y objetivo

Esencia Rosa es una aplicación móvil para un salón de belleza.

Permite a los clientes:
- Registrarse e iniciar sesión de forma segura.
- Ver y actualizar su perfil.
- Cambiar su contraseña.
- Consultar servicios, especialistas y citas (en desarrollo).

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
- Node.js + 【entity-Express¦canonical_name=Express】
- PostgreSQL
- JWT (jsonwebtoken)
- bcryptjs
- 【entity-express¦canonical_name=Express】-validator / middlewares propios

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

### Pruebas del frontend con Expo Go

1. **Registro:** registrar usuario nuevo → debe salir `ModalExito` y llevar a iniciar sesión.
2. **Iniciar sesión:** entrar con correo y contraseña correctos → debe entrar a `/inicio`.
3. **Perfil:** debe mostrar datos reales, header `Mi perfil`.
4. **Actualizar usuario:** cambiar teléfono → debe actualizarse y verse en perfil.
5. **Cambiar contraseña:** poner nueva + confirmar igual → debe salir `ModalExito` y volver a perfil.
6. **Cerrar sesión:** debe volver a login. La contraseña vieja ya no entra, la nueva sí.

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
