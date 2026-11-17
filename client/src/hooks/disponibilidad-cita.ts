import { useState, useEffect, useRef } from 'react';
import {
  obtenerServicios,
  obtenerEspecialistasPorServicio,
  obtenerDiasDisponibles,
  obtenerHorasDisponibles
} from '../services/cita-servicio';

export const useDisponibilidadCita = (opciones?: {
  idServicioInicial?: string;
  especialistaInicial?: string;
  fechaInicial?: string;
  horaInicial?: string;
  idCitaExcluir?: string
}) => {
  const idCitaExcluir = opciones?.idCitaExcluir;

  const [idServicio, setIdServicio] = useState(opciones?.idServicioInicial ?? '');
  const [fechaCita, setFechaCita] = useState(opciones?.fechaInicial ?? '');
  const [horaCita, setHoraCita] = useState(opciones?.horaInicial ?? '');
  const [especialistaCita, setEspecialistaCita] = useState(opciones?.especialistaInicial ?? '');
  const [servicios, setServicios] = useState<any[]>([]);
  const [especialistas, setEspecialistas] = useState<any[]>([]);
  const [diasDisponibles, setDiasDisponibles] = useState<number[]>([]);
  const [horasDisponibles, setHorasDisponibles] = useState<string[]>([]);
  const [mesVisible, setMesVisible] = useState(new Date());
  const [cargando, setCargando] = useState(!!opciones?.idServicioInicial);

  const anioVisible = mesVisible.getFullYear();
  const mesVisibleNumero = mesVisible.getMonth();

  const esPrimerRender = useRef(true);

  useEffect(() => {
    const tiempo = setTimeout(() => {
      esPrimerRender.current = false;
    }, 0);
    return () => clearTimeout(tiempo);
  }, []);

  useEffect(() => {
    const cargarServicios = async () => {
      const resultado = await obtenerServicios();

      if (resultado) setServicios(resultado.datos);
    };

    cargarServicios();
  }, []);

  useEffect(() => {
    const cargarEspecialistas = async () => {
      setCargando(true);

      if (!idServicio) {
        setEspecialistas([]);
        setCargando(false);
        return;
      }

      const resultado = await obtenerEspecialistasPorServicio(idServicio);
      if (resultado) setEspecialistas(resultado.datos);

      setCargando(false);
    };

    if (!esPrimerRender.current) {
      setEspecialistaCita('');
      setFechaCita('');
      setHoraCita('');
    }

    cargarEspecialistas();
  }, [idServicio]);

  useEffect(() => {
    if (esPrimerRender.current) return;

    setFechaCita('');
    setHoraCita('');
    setDiasDisponibles([]);
    setHorasDisponibles([]);
  }, [especialistaCita]);

  useEffect(() => {
    const cargarDias = async () => {
      if (!especialistaCita || !idServicio) {
        setDiasDisponibles([]);
        return;
      }

      const resultado = await obtenerDiasDisponibles(
        especialistaCita,
        idServicio,
        anioVisible,
        mesVisibleNumero + 1,
        idCitaExcluir
      );

      if (resultado && Array.isArray(resultado.datos)) {
        setDiasDisponibles(resultado.datos);
      } else {
        setDiasDisponibles([]);
      }
    };

    cargarDias();
  }, [especialistaCita, idServicio, anioVisible, mesVisibleNumero]);

  useEffect(() => {
    const cargarHoras = async () => {
      if (!especialistaCita || !idServicio || !fechaCita) {
        setHorasDisponibles([]);
        return;
      }

      const resultado = await obtenerHorasDisponibles(
        especialistaCita,
        fechaCita,
        idServicio,
        idCitaExcluir
      );

      if (resultado) setHorasDisponibles(resultado.datos);
    };

    cargarHoras();
  }, [especialistaCita, idServicio, fechaCita]);

  useEffect(() => {
    if (esPrimerRender.current) return;

    setHoraCita('');
  }, [fechaCita]);

  return {
    idServicio,
    setIdServicio,
    fechaCita,
    setFechaCita,
    horaCita,
    setHoraCita,
    especialistaCita,
    setEspecialistaCita,
    servicios,
    especialistas,
    diasDisponibles,
    horasDisponibles,
    mesVisible,
    setMesVisible,
    anioVisible,
    mesVisibleNumero,
    cargando
  };
};
