import API_URL from "../../config/api";

// Registra un nuevo usuario.
export const registrarUsuario = async (
  nombres: string,
  apellidos: string,
  correo: string,
  contrasena: string,
  numeroTelefono: string,
  fechaNacimiento: string
) => {
  const respuesta = await fetch(`${API_URL}/usuarios`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      nombres,
      apellidos,
      correo,
      contrasena,
      numero_telefono: numeroTelefono,
      fecha_nacimiento: fechaNacimiento
    }),
  });

  const datos = await respuesta.json();
  return { respuesta, datos };
};

// Consulta todos los usuarios.
export const listarUsuarios = async () => {
  const respuesta = await fetch(`${API_URL}/usuarios`);
  const datos = await respuesta.json();

  return { respuesta, datos };
};

// Consulta un usuario por su ID.
export const consultarUsuarioPorId = async (id: number) => {
  const respuesta = await fetch(`${API_URL}/usuarios/${id}`);
  const datos = await respuesta.json();

  return { respuesta, datos };
};

// Actualiza los datos personales de un usuario.
export const actualizarUsuario = async (
  id: number,
  nombres: string,
  apellidos: string,
  correo: string,
  numeroTelefono: string,
  fechaNacimiento: string
) => {
  const respuesta = await fetch(`${API_URL}/usuarios/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      nombres,
      apellidos,
      correo,
      numero_telefono: numeroTelefono,
      fecha_nacimiento: fechaNacimiento
    }),
  });

  const datos = await respuesta.json();

  return { respuesta, datos };
};

// Elimina un usuario por su ID.
export const eliminarUsuario = async (id: number) => {
  const respuesta = await fetch(`${API_URL}/usuarios/${id}`, {
    method: 'DELETE',
  });

  const datos = await respuesta.json();
  return { respuesta, datos };
};
