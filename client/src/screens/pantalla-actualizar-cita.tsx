import { useState } from 'react';
import {
  ScrollView,
  View,
  KeyboardAvoidingView
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import Encabezado from '@/components/encabezado';
import Boton from '@/components/boton';
import ModalExito from '@/components/modal-exito';
import SelectorDesplegable from '@/components/selector-desplegable';
import ModalEspecialistas from '@/components/modal-especialistas';
import ModalFecha from '@/components/modal-fecha';
import ModalHora from '@/components/modal-hora';
import MensajeError from '@/components/mensaje-error';
import PantallaCarga from '@/components/pantalla-carga';

import { useDisponibilidadCita } from '@/hooks/disponibilidad-cita';
import {
  formatearFechaLarga,
  formatearHora12,
  limpiarCampos,
  limpiarError
} from '@/utils/formulario-utilidades';
import { limpiarErroresCampo } from '@/utils/formulario-utilidades';
import { actualizarCita } from '@/services/cita-servicio';
import { validarCita, ErroresCita } from '@/validators/cita-validador';
import { registroStyles } from '@/styles/registro-styles';

const PantallaActualizarCita = () => {
  const router = useRouter();
  const { id, id_servicio, id_especialista, fecha, hora } = useLocalSearchParams();

  const [alturaEncabezado, setAlturaEncabezado] = useState(0);
  const [errores, setErrores] = useState<ErroresCita>({});
  const [error, setError] = useState('');
  const [modalEspecialistasVisible, setModalEspecialistasVisible] = useState(false);
  const [modalFechaVisible, setModalFechaVisible] = useState(false);
  const [modalHoraVisible, setModalHoraVisible] = useState(false);
  const [mostrarExito, setMostrarExito] = useState(false);

  const {
    idServicio,
    fechaCita,
    setFechaCita,
    horaCita,
    setHoraCita,
    especialistaCita,
    setEspecialistaCita,
    especialistas,
    diasDisponibles,
    horasDisponibles,
    mesVisible,
    setMesVisible,
    anioVisible,
    mesVisibleNumero,
    cargando
  } = useDisponibilidadCita({
    idServicioInicial: id_servicio as string,
    especialistaInicial: id_especialista as string,
    fechaInicial: fecha as string,
    horaInicial: hora as string,
    idCitaExcluir: id as string
  });

  const guardarCambios = async () => {
    limpiarError(setError);
    setErrores({});

    const datosLimpios = limpiarCampos({
      idServicio,
      fechaCita,
      horaCita,
      especialistaCita
    });

    const erroresValidacion = validarCita(
      datosLimpios.fechaCita,
      datosLimpios.horaCita,
      datosLimpios.especialistaCita,
      datosLimpios.idServicio
    );

    if (Object.keys(erroresValidacion).length > 0) {
      setErrores(erroresValidacion);
      return;
    }

    try {
      const resultado = await actualizarCita(
        id as string,
        datosLimpios.fechaCita,
        datosLimpios.horaCita,
        datosLimpios.especialistaCita
      );

      if (resultado && !resultado.respuesta.ok) {
        setError(resultado.datos.error);
        return;
      }

      if (resultado?.respuesta.ok) setMostrarExito(true);

    } catch (error) {
      console.error('Error al conectar con el servidor.', error);
      setError('No se pudo conectar con el servidor.');
    }
  };

  if (cargando) return <PantallaCarga />;

  return (
    <SafeAreaView style={registroStyles.areaSegura}>
      <KeyboardAvoidingView
        style={registroStyles.vistaTeclado}
        behavior='padding'
      >
        <View
          style={registroStyles.encabezado}
          onLayout={(evento) =>
            setAlturaEncabezado(evento.nativeEvent.layout.height)
          }
        >
          <Encabezado titulo='Reagendar cita' />
        </View>

        <ScrollView
          style={{
            paddingTop: alturaEncabezado + 40,
            marginTop: 5
          }}
          contentContainerStyle={registroStyles.contenedor}
          keyboardShouldPersistTaps='handled'
        >
          <SelectorDesplegable
            etiqueta='Especialista'
            icono='account-outline'
            valor={especialistaCita
              ? (() => {
                  const especialista = especialistas.find((especialista) =>
                    especialista.id_usuario.toString() === especialistaCita
                  );
                  return especialista
                    ? `${especialista.nombres} ${especialista.apellidos}`
                    : '';
                })()
              : 'Selecciona un especialista'
            }
            error={errores.especialistaCita}
            alPresionar={() => {
              setModalEspecialistasVisible(true);
              limpiarErroresCampo(setError, setErrores, 'especialistaCita')
            }}
          />

          <SelectorDesplegable
            etiqueta='Fecha'
            icono='calendar-outline'
            valor={fechaCita
              ? formatearFechaLarga(fechaCita, true)
              : 'Selecciona una fecha'
            }
            deshabilitado={especialistaCita === ''}
            error={errores.fechaCita}
            alPresionar={() => {
              if (especialistaCita) setModalFechaVisible(true);
              limpiarErroresCampo(setError, setErrores, 'fechaCita')
            }}
          />

          <SelectorDesplegable
            etiqueta='Hora'
            icono='clock-outline'
            valor={horaCita
              ? formatearHora12(horaCita)
              : 'Selecciona una hora'
            }
            deshabilitado={fechaCita === ''}
            error={errores.horaCita}
            alPresionar={() => {
              if (fechaCita) setModalHoraVisible(true);
              limpiarErroresCampo(setError, setErrores, 'horaCita')
            }}
          />

          {error && <MensajeError mensaje={error} />}

          <View style={registroStyles.contenedorBotones}>
            <Boton
              texto='Guardar cambios'
              onPress={guardarCambios}
            />
          </View>
        </ScrollView>

        <ModalEspecialistas
          visible={modalEspecialistasVisible}
          alCerrar={() => setModalEspecialistasVisible(false)}
          especialistas={especialistas}
          alSeleccionar={(id) => {
            setEspecialistaCita(id);
            setErrores((prev) => ({
              ...prev,
              especialistaCita: '',
              fechaCita: '',
              horaCita: ''
            }));
            setError('');
          }}
        />

        <ModalFecha
          visible={modalFechaVisible}
          alCerrar={() => setModalFechaVisible(false)}
          anioVisible={anioVisible}
          mesVisible={mesVisible}
          mesVisibleNumero={mesVisibleNumero}
          diasDisponibles={diasDisponibles}
          fechaCita={fechaCita}
          alCambiarMes={setMesVisible}
          alSeleccionar={(fecha) => {
            setFechaCita(fecha);
            setErrores((prev) => ({
              ...prev,
              fechaCita: '',
              horaCita: ''
            }));
            setError('');
          }}
        />

        <ModalHora
          visible={modalHoraVisible}
          alCerrar={() => setModalHoraVisible(false)}
          horasDisponibles={horasDisponibles}
          alSeleccionar={(hora) => {
            setHoraCita(hora);
            setErrores((prev) => ({
              ...prev,
              horaCita: ''
            }));
            setError('');
          }}
        />

        <ModalExito
          visible={mostrarExito}
          mensaje='Cita actualizada correctamente.'
          onClose={() => router.back()}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default PantallaActualizarCita;
