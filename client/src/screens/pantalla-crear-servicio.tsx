import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  ScrollView
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState } from 'react';

import {
  actualizarCampo,
  limpiarCampos,
  limpiarError,
  limpiarErroresCampo
} from '@/utils/formulario-utilidades';
import {
  ErroresServicio,
  validarDatosServicio
} from '@/validators/servicio-validador';

import MaskedView from '@react-native-masked-view/masked-view';
import Boton from '@/components/boton';
import CampoFormulario from '@/components/campo-formulario';
import MensajeError from '@/components/mensaje-error';
import Encabezado from '@/components/encabezado';
import ModalExito from '@/components/modal-exito';
import CajaDescripicion from '@/components/caja-descripcion';

import { registroStyles } from '@/styles/registro-styles';
import { serviciosStyles } from '@/styles/servicios-styles';
import { campoFormularioStyles } from '@/styles/campo-formulario-styles';
import { crearServicio } from '@/services/servicio-servicio';
import { obtenerRol } from '@/services/sesion-servicio';
import { router } from 'expo-router';

const PantallaCrearServicio = () => {
  const [nombreServicio, setNombreServicio] = useState('');
  const [costoServicio, setCostoServicio] = useState<string>('');
  const [duracionServicio, setDuracionServicio] = useState<string>('');
  const [descripcionServicio, setDescripcionServicio] = useState('');
  const [mostrarExito, setMostrarExito] = useState(false);
  const [rol, setRol] = useState('');
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

    try {
      const resultado = await crearServicio(
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
        behavior="padding"
      >
        <View style={registroStyles.encabezado}>
          <Encabezado titulo='Crear servicio' />
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
            keyboardShouldPersistTaps="handled"
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
                texto='Guardar'
                onPress={guardarServicio}
              />
            </View>
          </ScrollView>

          <ModalExito
            visible={mostrarExito}
            mensaje='Servicio creado correctamente.'
            onClose={() => router.replace('/servicios')}
          />
        </MaskedView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default PantallaCrearServicio;
