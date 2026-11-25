import { obtenerError, Requisito } from '@/utils/formulario-utilidades';

export type ErroresServicio = {
  nombreServicio?: string;
  descripcionServicio?: string;
  costoServicio?: string;
  duracionServicio?: string
};

export const validarDatosServicio = (
  nombreServicio: string,
  descripcionServicio: string,
  costoServicio: string,
  duracionServicio: string
) => {
  const errores: ErroresServicio = {};

  // Validación del nombre del servicio
  const requisitosNombreServicio: Requisito[] = [
    {
      condicion: nombreServicio.trim().length > 0,
      mensaje: 'El nombre del servicio es obligatorio.'
    },
    {
      condicion: nombreServicio.trim().length >= 3,
      mensaje: 'El nombre debe tener mínimo 3 caracteres.'
    },
    {
      condicion: nombreServicio.trim().length <= 50,
      mensaje: 'El nombre debe tener máximo 50 carcateres.'
    },
  ];

  const errorNombreServicio = obtenerError(requisitosNombreServicio);
  if (errorNombreServicio) errores.nombreServicio = errorNombreServicio;

  // Validación de la descripción del servicio
  const requisitosDescripcionServicio: Requisito[] = [
    {
      condicion: descripcionServicio.trim().length > 0,
      mensaje: 'La descripción es obligatoria.'
    },
    {
      condicion: descripcionServicio.trim().length >= 5,
      mensaje: 'la descripción debe tener al menos 5 caracteres.'
    },
    {
      condicion: descripcionServicio.trim().length <= 500,
      mensaje: 'La descripción debe tener máximo 500 caracteres.'
    },
  ];

  const errorDescripcionServicio = obtenerError(requisitosDescripcionServicio);
  if (errorDescripcionServicio) {
    errores.descripcionServicio = errorDescripcionServicio;
  }

  // Validación del costo del servicio
  const costoNumero = Number(costoServicio);
  const requisitosCostoServicio: Requisito[] = [
    {
      condicion: costoServicio.trim().length > 0,
      mensaje: 'El costo es obligatorio.'
    },
    {
      condicion: !isNaN(costoNumero),
      mensaje: 'El costo solo debe tener números.'
    },
    {
      condicion: costoNumero > 0,
      mensaje: 'El costo debe ser mayor a cero.'
    },
    {
      condicion: costoNumero <= 99999999.99,
      mensaje: 'El costo no puede ser mayor a 99999999.99.'
    },
  ];

  const errorCostoServicio = obtenerError(requisitosCostoServicio);
  if (errorCostoServicio) errores.costoServicio = errorCostoServicio;

  // Validación de la duración del servicio
  const duracionNumero = Number(duracionServicio);
  const requisitosDuracionServicio: Requisito[] = [
    {
      condicion: duracionServicio.trim().length > 0,
      mensaje: 'La duración es obligatoria.'
    },
    {
      condicion: !isNaN(duracionNumero),
      mensaje: 'La duración solo debe tener números.'
    },
    {
      condicion: Number.isInteger(duracionNumero),
      mensaje: 'La duración debe ser un número entero.'
    },
    {
      condicion: duracionNumero > 0,
      mensaje: 'la duración debe ser mayor a cero.'
    },
  ];

  const errorDuracionServicio = obtenerError(requisitosDuracionServicio);
  if (errorDuracionServicio) errores.duracionServicio = errorDuracionServicio;

  return errores;
};
