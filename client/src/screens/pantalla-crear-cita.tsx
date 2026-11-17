import {
  KeyboardAvoidingView,
  ScrollView,
  View
} from 'react-native';

import { crearCita } from '@/services/cita-servicio';
import { useState } from 'react';
import { router } from 'expo-router';
import {
  limpiarError,
  limpiarCampos,
  limpiarErroresCampo,
  formatearHora12,
  formatearFechaLarga
} from '@/utils/formulario-utilidades';
import { validarCita, ErroresCita } from '@/validators/cita-validador';
import { SafeAreaView } from 'react-native-safe-area-context';
import { registroStyles } from '@/styles/registro-styles';
import { useDisponibilidadCita } from '@/hooks/disponibilidad-cita';

import Encabezado from '@/components/encabezado';
import Boton from '@/components/boton';
import SelectorDesplegable from '@/components/selector-desplegable';
import ModalExito from '@/components/modal-exito';
import ModalServicios from '@/components/modal-servicios';
import ModalEspecialistas from '@/components/modal-especialistas';
import ModalFecha from '@/components/modal-fecha';
import ModalHora from '@/components/modal-hora';
import MensajeError from '@/components/mensaje-error';

const PantallaCrearCita = () => {
  const [modalServiciosVisible, setModalServiciosVisible] = useState(false);
  const [error, setError] = useState('');
  const [errores, setErrores] = useState<ErroresCita>({});
  const [mostrarExito, setMostrarExito] = useState(false);
  const [alturaEncabezado, setAlturaEncabezado] = useState(0);
  const [modalEspecialistasVisible, setModalEspecialistasVisible] = useState(false);
  const [modalFechaVisible, setModalFechaVisible] = useState(false);
  const [modalHoraVisible, setModalHoraVisible] = useState(false);

  const {
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
    mesVisibleNumero
  } = useDisponibilidadCita();

  // Envía los datos de la cita al backend y muestra un mensaje si se crea correctamente.
  const guardarCita = async () => {
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
      const resultado = await crearCita(
        datosLimpios.idServicio,
        datosLimpios.fechaCita,
        datosLimpios.horaCita,
        datosLimpios.especialistaCita
      );

      if (resultado && !resultado.respuesta.ok) {
        setError(resultado.datos.error);
        return;
      }

      if (resultado?.respuesta.ok) {
        setMostrarExito(true);
      }
    } catch (error) {
      console.error('Error al conectar con el sevidor.');
      setError('No se pudo conectar con el servidor.');
    }
  };


  return (
    <SafeAreaView style={registroStyles.areaSegura}>
      <KeyboardAvoidingView
        style={registroStyles.vistaTeclado}
        behavior="padding"
      >
        <View style={registroStyles.encabezado}
          onLayout={(evento) =>
            setAlturaEncabezado(evento.nativeEvent.layout.height)
          }
        >
          <Encabezado titulo='Agendar cita' />
        </View>

        <ScrollView
          style={{
            paddingTop: alturaEncabezado + 40,
            marginTop: 5
          }}
          contentContainerStyle={registroStyles.contenedor}
          keyboardShouldPersistTaps="handled"
        >

          <SelectorDesplegable
            etiqueta='Servicio'
            icono='creation'
            valor={idServicio
              ? servicios.find((servicio) =>
                  servicio.id_servicio.toString() === idServicio
                )?.nombre ?? ''
              : 'Selecciona un servicio'
            }
            error={errores.idServicio}
            alPresionar={() => {
              setModalServiciosVisible(true);
              limpiarErroresCampo(setError, setErrores, 'idServicio');
            }}
          />

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
                    : ''
                })()
              : 'Selecciona un especialista'
            }
            deshabilitado={idServicio === ''}
            error={errores.especialistaCita}
            alPresionar={() => {
              setModalEspecialistasVisible(true);
              limpiarErroresCampo(setError, setErrores, 'especialistaCita');
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
              limpiarErroresCampo(setError, setErrores, 'fechaCita');
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
              limpiarErroresCampo(setError, setErrores, 'horaCita');
            }}
          />

          {error && <MensajeError mensaje={error} />}

          <View style={registroStyles.contenedorBotones}>
            <Boton
              texto='Agendar'
              onPress={guardarCita}
            />
          </View>

        </ScrollView>

        <ModalServicios
          visible={modalServiciosVisible}
          alCerrar={() => setModalServiciosVisible(false)}
          servicios={servicios}
          alSeleccionar={(id) => {
            setIdServicio(id);
            setErrores({});
            setError('');
          }}
        />

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
          mensaje='Cita creada correctamente.'
          onClose={() => router.replace('/citas')}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default PantallaCrearCita;
