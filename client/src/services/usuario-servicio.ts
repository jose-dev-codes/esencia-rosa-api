import API_URL from "../../config/api";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { verificarSesion } from './sesion-servicio';

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
  const token = await AsyncStorage.getItem('token');

  if (!token) return null;

  const respuesta = await fetch(`${API_URL}/usuarios/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    },
    body: JSON.stringify({
      nombres,
      apellidos,
      correo,
      numero_telefono: numeroTelefono,
      fecha_nacimiento: fechaNacimiento
    }),
  });

  const sesionValida = await verificarSesion(respuesta);

  if (!sesionValida) return null;

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

// Obtiene el perfil del usuario autenticado.
export const obtenerPerfil = async () => {
  const token = await AsyncStorage.getItem('token');

  if (!token) return null;

  const respuesta = await fetch(
    `${API_URL}/usuarios/perfil`,
    {
      method: 'GET',
      headers: {
        'Authorization': token
      }
    }
  );

  const sesionValida = await verificarSesion(respuesta);

  if (!sesionValida) return null;

  const datos = await respuesta.json();

  return {
    respuesta,
    datos: datos.usuario
  };
};

// Actualiza la contraseña de un usuario.
export const actualizarContrasena = async (
  id: number,
  contrasena: string
) => {
  const token = await AsyncStorage.getItem('token');

  if (!token) return null;

  const respuesta = await fetch(`${API_URL}/usuarios/${id}/contrasena`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    },
    body: JSON.stringify({
      contrasena
    }),
  });

  const sesionValida = await verificarSesion(respuesta);

  if (!sesionValida) return null;

  const datos = await respuesta.json();

  return { respuesta, datos };
};
