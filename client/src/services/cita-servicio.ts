import AsyncStorage from '@react-native-async-storage/async-storage';
import API_URL from '../../config/api';
import { verificarSesion } from './sesion-servicio';

// Obtiene las citas del usuario autenticado mediante una solicitud al backend.
export const obtenerMisCitas = async () => {
  const token = await AsyncStorage.getItem('token');

  if (!token) return null;

  const respuesta = await fetch(
    `${API_URL}/citas`,
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

// Obtiene la próxima cita del usuario autenticado mediante una solicitud al backend.
export const obtenerProximaCita = async () => {
  const token = await AsyncStorage.getItem('token');

  if (!token) return null;

  const respuesta = await fetch(
    `${API_URL}/citas/proxima`,
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

// Crea una nueva cita mediante una solicitud al backend.
export const crearCita = async (
  idServicio: string,
  fecha: string,
  hora: string,
  idEspecialista: string
) => {
  const token = await AsyncStorage.getItem('token');

  if (!token) return null;

  const respuesta = await fetch(
    `${API_URL}/citas`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      },
      body: JSON.stringify({
        id_servicio: Number(idServicio),
        fecha,
        hora,
        id_especialista: Number(idEspecialista)
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

// Actualiza los datos de una cita mediante una solicitud al backend.
export const actualizarCita = async (
  id: string,
  fecha: string,
  hora: string,
  idEspecialista: string
) => {
  const token = await AsyncStorage.getItem('token');

  if (!token) return null;

  const respuesta = await fetch(
    `${API_URL}/citas/${id}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      },
      body: JSON.stringify({
        fecha,
        hora,
        id_especialista: Number(idEspecialista)
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

// Cancela una cita mediante una solicitud al backend.
export const cancelarCita = async (id: string) => {
  const token = await AsyncStorage.getItem('token');

  if (!token) return null;

  const respuesta = await fetch(
    `${API_URL}/citas/${id}/cancelar`,
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

// Obtiene los días de un mes que tienen al menos una hora libre.
export const obtenerDiasDisponibles = async (
  idEspecialista: string,
  idServicio: string,
  anio: number,
  mes: number,
  idCitaExcluir?: string
) => {
  const token = await AsyncStorage.getItem('token');

  if (!token) return null;

  let url = `${API_URL}/citas/dias-disponibles` +
    `?id_especialista=${idEspecialista}` +
    `&id_servicio=${idServicio}` +
    `&anio=${anio}` +
    `&mes=${mes}`;

  if (idCitaExcluir) {
    url += `&excluirCita=${idCitaExcluir}`
  }

  const respuesta = await fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': token
    }
  });

  const sesionValida = await verificarSesion(respuesta);

  if (!sesionValida) return null;

  const datos = await respuesta.json();

  return {
    respuesta,
    datos
  };
};

export const obtenerHorasDisponibles = async (
  idEspecialista: string,
  fecha: string,
  idServicio: string,
  idCitaExcluir?: string
) => {
  const token = await AsyncStorage.getItem('token');

  if (!token) return null;

  let url = `${API_URL}/citas/horas-disponibles` +
    `?id_especialista=${idEspecialista}` +
    `&fecha=${fecha}` +
    `&id_servicio=${idServicio}`;

  if (idCitaExcluir) {
    url += `&excluirCita=${idCitaExcluir}`;
  }

  const respuesta = await fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': token
    }
  });

  const sesionValida = await verificarSesion(respuesta);

  if (!sesionValida) return null;

  const datos = await respuesta.json();

  return {
    respuesta,
    datos
  };
};
