import {
  View,
  KeyboardAvoidingView,
  ScrollView
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { useEffect, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaskedView from '@react-native-masked-view/masked-view';

import Boton from '@/components/boton';
import Encabezado from '@/components/encabezado';
import CampoFormulario from '@/components/campo-formulario';
import CajaDescripicion from '@/components/caja-descripcion';
import ModalExito from '@/components/modal-exito';
import MensajeError from '@/components/mensaje-error';

import {
  ErroresServicio,
  validarDatosServicio
} from '@/validators/servicio-validador';
import {
  actualizarCampo,
  limpiarError,
  limpiarCampos,
  limpiarErroresCampo
} from '@/utils/formulario-utilidades';
import { actualizarServicio } from '@/services/servicio-servicio';
import { obtenerRol } from '@/services/sesion-servicio';

import { registroStyles } from '@/styles/registro-styles';

const PantallaActualizarServicio = () => {
  const {
    id_servicio,
    nombre,
    descripcion,
    costo,
    duracion_minutos,
    estado
  } = useLocalSearchParams();

  const [nombreServicio, setNombreServicio] = useState(
    typeof nombre === 'string' ? nombre : ''
  );
  const [descripcionServicio, setDescripcionServicio] = useState(
    typeof descripcion === 'string' ? descripcion : ''
  );
  const [costoServicio, setCostoServicio] = useState(
    typeof costo === 'string' ? costo.replace('.00', '') : ''
  );
  const [duracionServicio, setDuracionServicio] = useState(
    typeof duracion_minutos === 'string' ? duracion_minutos : ''
  );
  const [rol, setRol] = useState('');
  const [mostrarExito, setMostrarExito] = useState(false);
  const [error, setError] = useState('');
  const [errores, setErrores] = useState<ErroresServicio>({});

  useEffect(() => {
    const verificarRol = async () => {
      const rol = await obtenerRol();
      setRol(rol);
    };

    verificarRol();
  }, []);

  useEffect(() => {
    if (rol && rol !== 'admin') {
      router.replace('/servicios');
    }
  }, [rol]);

  const guardarServicio = async () => {
    limpiarError(setError);
    setErrores({});

    const datosLimpios = limpiarCampos({
      nombreServicio,
      descripcionServicio,
      costoServicio,
      duracionServicio
    });

    const erroresValidacion = validarDatosServicio(
      datosLimpios.nombreServicio,
      datosLimpios.descripcionServicio,
      datosLimpios.costoServicio,
      datosLimpios.duracionServicio
    );

    if (Object.keys(erroresValidacion).length > 0) {
      setErrores(erroresValidacion);
      return;
    }

    const id = typeof id_servicio === 'string' ? id_servicio : '';
    try {
      const resultado = await actualizarServicio(
        id,
        datosLimpios.nombreServicio,
        datosLimpios.descripcionServicio,
        datosLimpios.costoServicio,
        datosLimpios.duracionServicio
      );

      if (resultado && !resultado.respuesta.ok) {
        setError(resultado.datos.error);
        return;
      }

      if (resultado?.respuesta.ok) {
        setMostrarExito(true);
      }
    } catch (error) {
      console.error('Error al conectar con el servcidor.');
      setError('No se pudo conectar con el servidor.');
    }
  };

  if (!rol) return null;
  if (rol !== 'admin') return null;

  return (
    <SafeAreaView style={registroStyles.areaSegura}>
      <KeyboardAvoidingView
        style={registroStyles.vistaTeclado}
        behavior='padding'
      >
        <View style={registroStyles.encabezado}>
          <Encabezado titulo='Editar servicio' />
        </View>

        <MaskedView
          style={{ flex: 1 }}
          maskElement={
            <LinearGradient
              colors={[
                'transparent',
                'black',
                'black',
                'transparent'
              ]}
              locations={[0, 0.015, 0.985, 1]}
              style={{ flex: 1 }}
            />
          }
        >
          <ScrollView
            style={{ paddingTop: 30 }}
            contentContainerStyle={registroStyles.contenedor}
            keyboardShouldPersistTaps='handled'
          >
            <CampoFormulario
              label='Nombre'
              placeholder='Escribe el nombre del servicio'
              value={nombreServicio}
              icono='creation'
              autoCapitalize='sentences'
              error={errores.nombreServicio}
              onChangeText={(texto) =>
                actualizarCampo(texto, setNombreServicio, () =>
                  limpiarErroresCampo(setError, setErrores, 'nombreServicio')
                )
              }
            />

            <CampoFormulario
              label='Costo'
              placeholder='Costo del servicio (Ej: 5000)'
              value={costoServicio}
              icono='cash-multiple'
              autoCapitalize='none'
              keyboardType='numeric'
              error={errores.costoServicio}
              sufijo='$'
              onChangeText={(texto) =>
                actualizarCampo(texto, setCostoServicio, () =>
                  limpiarErroresCampo(setError, setErrores, 'costoServicio')
                )
              }
            />

            <CampoFormulario
              label='Duración'
              placeholder='Tiempo en minutos'
              value={duracionServicio}
              icono='clock-outline'
              autoCapitalize='none'
              keyboardType='numeric'
              error={errores.duracionServicio}
              sufijo='min'
              onChangeText={(texto) =>
                actualizarCampo(texto, setDuracionServicio, () =>
                  limpiarErroresCampo(setError, setErrores, 'duracionServicio')
                )
              }
            />

            <CajaDescripicion
              texto='Descripción'
              valor={descripcionServicio}
              errores={errores.descripcionServicio}
              alCambiartexto={(texto) =>
                actualizarCampo(texto, setDescripcionServicio, () =>
                  limpiarErroresCampo(setError, setErrores, 'descripcionServicio')
                )
              }
            />

            {error && <MensajeError mensaje={error} />}

            <View style={registroStyles.contenedorBotones}>
              <Boton
                texto='Actualizar'
                onPress={guardarServicio}
              />
            </View>
          </ScrollView>

          <ModalExito
            visible={mostrarExito}
            mensaje='Servicio actualizado correctamente.'
            onClose={() => router.replace('/servicios')}
          />
        </MaskedView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default PantallaActualizarServicio;
