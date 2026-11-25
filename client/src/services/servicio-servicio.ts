import AsyncStorage from '@react-native-async-storage/async-storage';
import API_URL from '../../config/api';
import { verificarSesion } from './sesion-servicio';

// Trae los servicios, para user y admin, el back filtra por rol.
export const obtenerServicios = async () => {
  const token = await AsyncStorage.getItem('token');

  if (!token) return null;

  const respuesta = await fetch(
    `${API_URL}/servicios`,
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
    datos
  };
};

// Obtiene los especialistas de un servicio.
export const obtenerEspecialistasPorServicio = async (idServicio: string) => {
  const token = await AsyncStorage.getItem('token');

  if (!token) return null;

  const respuesta = await fetch(
    `${API_URL}/servicios/${idServicio}/especialistas`,
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
    datos
  };
};

// Crea un nuevo servicio mediante una solicitud al backend.
export const crearServicio = async (
  nombre: string,
  descripcion: string,
  costo: string,
  duracionMinutos: string
) => {
  const token = await AsyncStorage.getItem('token');

  if (!token) return null;

  const respuesta = await fetch(
    `${API_URL}/servicios`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      },
      body: JSON.stringify({
        nombre,
        descripcion,
        costo: Number(costo),
        duracion_minutos: Number(duracionMinutos)
      })
    }
  );

  const sesionValida = await verificarSesion(respuesta);
  if (!sesionValida) return null;

  const datos = await respuesta.json();

  return {
    respuesta,
    datos
  };
};

// Actualiza un servicio mediante una solicitud al backend.
export const actualizarServicio = async (
  id: string,
  nombre: string,
  descripcion: string,
  costo: string,
  duracionMinutos: string
) => {
  const token = await AsyncStorage.getItem('token');

  if (!token) return null;

  const respuesta = await fetch(
    `${API_URL}/servicios/${id}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      },
      body: JSON.stringify({
        nombre,
        descripcion,
        costo: Number(costo),
        duracion_minutos: Number(duracionMinutos)
      })
    }
  );

  const sesionValida = await verificarSesion(respuesta);

  if (!sesionValida) return null;

  const datos = await respuesta.json();

  return {
    respuesta,
    datos
  };
};

// Elimina un servicio mediante una solicitud al backend.
export const eliminarServicio = async (id: string) => {
  const token = await AsyncStorage.getItem('token');

  if (!token) return null;

  const respuesta = await fetch(
    `${API_URL}/servicios/${id}`,
    {
      method: 'DELETE',
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
    datos
  };
};

// Habilita un servicio mediante una solicitud al backend.
export const habilitarServicio = async (id: string) => {
  const token = await AsyncStorage.getItem('token');

  if (!token) return null;

  const respuesta = await fetch(
    `${API_URL}/servicios/${id}/habilitar`,
    {
      method: 'PATCH',
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
    datos
  };
};

// Inhabilita un servicio mediante una solicitud al backend.
export const inhabilitarServicio = async (id: string) => {
  const token = await AsyncStorage.getItem('token');

  if (!token) return null;

  const respuesta = await fetch(
    `${API_URL}/servicios/${id}/inhabilitar`,
    {
      method: 'PATCH',
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
    datos
  };
};
