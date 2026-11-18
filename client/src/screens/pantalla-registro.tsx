import {
  ScrollView,
  View,
  KeyboardAvoidingView
} from 'react-native';

import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

import {
  actualizarCampo,
  limpiarCampos,
  limpiarError,
  limpiarErroresCampo,
  formatearFechaLarga
} from '@/utils/formulario-utilidades';

import { validarRegistro, ErroresRegistro } from '@/validators/usuario-validador';

import MaskedView from '@react-native-masked-view/masked-view';
import Boton from '@/components/boton';
import CampoFormulario from '@/components/campo-formulario';
import MensajeError from '@/components/mensaje-error';
import Encabezado from '@/components/encabezado';
import ModalExito from '@/components/modal-exito';
import ModalFechaNacimiento from '@/components/modal-fecha-nacimiento';
import SelectorDesplegable from '@/components/selector-desplegable';
import { registroStyles } from '@/styles/registro-styles';
import { registrarUsuario } from '@/services/usuario-servicio';

const PantallaRegistro = () => {
  const [nombresUsuario, setNombresUsuario] = useState('');
  const [apellidosUsuario, setApellidosUsuario] = useState('');
  const [correoUsuario, setCorreoUsuario] = useState('');
  const [contrasenaUsuario, setContrasenaUsuario] = useState('');
  const [numeroTelefonoUsuario, setNumeroTelefonoUsuario] = useState('');
  const [fechaNacimientoUsuario, setFechaNacimientoUsuario] = useState('');
  const [mostrarExito, setMostrarExito] = useState(false);
  const [mostrarCalendario, setMostrarCalendario] = useState(false);
  const [error, setError] = useState('');
  const [errores, setErrores] = useState<ErroresRegistro>({});

  const limpiarFormulario = () => {
    setNombresUsuario('');
    setApellidosUsuario('');
    setCorreoUsuario('');
    setContrasenaUsuario('');
    setNumeroTelefonoUsuario('');
    setFechaNacimientoUsuario('');
    setError('');
    setErrores({});
  };

  const guardarInformacion = async () => {
    limpiarError(setError);
    setErrores({});

    const datosLimpios = limpiarCampos({
      nombresUsuario,
      apellidosUsuario,
      correoUsuario,
      contrasenaUsuario,
      numeroTelefonoUsuario,
      fechaNacimientoUsuario
    });

    const erroresValidacion = validarRegistro(
      datosLimpios.nombresUsuario,
      datosLimpios.apellidosUsuario,
      datosLimpios.correoUsuario,
      datosLimpios.contrasenaUsuario,
      datosLimpios.numeroTelefonoUsuario,
      datosLimpios.fechaNacimientoUsuario
    );

    if (Object.keys(erroresValidacion).length > 0) {
      setErrores(erroresValidacion);
      return;
    }

    try {
      const resultado = await registrarUsuario(
        datosLimpios.nombresUsuario,
        datosLimpios.apellidosUsuario,
        datosLimpios.correoUsuario,
        datosLimpios.contrasenaUsuario,
        datosLimpios.numeroTelefonoUsuario,
        datosLimpios.fechaNacimientoUsuario
      );

      if (!resultado.respuesta.ok) {
        setError(resultado.datos.error);
        return;
      }

      limpiarFormulario();

      setMostrarExito(true);

    } catch (error) {
      console.error('Error al conectar con el servidor.', error);
      setError('No se pudo conectar con el servidor.');
    }
  };

  return (
    <SafeAreaView style={registroStyles.areaSegura}>
      <KeyboardAvoidingView
        style={registroStyles.vistaTeclado}
        behavior="padding"
      >
        <View style={registroStyles.encabezado}>
          <Encabezado titulo='Registro' />
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
              label='Nombres'
              placeholder='Escribe tus nombres'
              value={nombresUsuario}
              icono='account-outline'
              autoCapitalize='words'
              error={errores.nombres}
              onChangeText={(texto) =>
                actualizarCampo(texto, setNombresUsuario, () =>
                  limpiarErroresCampo(setError, setErrores, 'nombres')
                )
              }
            />

            <CampoFormulario
              label='Apellidos'
              placeholder='Escribe tus apellidos'
              value={apellidosUsuario}
              icono='account-multiple-outline'
              autoCapitalize='words'
              error={errores.apellidos}
              onChangeText={(texto) =>
                actualizarCampo(texto, setApellidosUsuario, () =>
                  limpiarErroresCampo(setError, setErrores, 'apellidos')
                )
              }
            />

            <CampoFormulario
              label='Correo'
              placeholder='ejemplo@correo.com'
              value={correoUsuario}
              icono='email-outline'
              keyboardType='email-address'
              autoCapitalize='none'
              error={errores.correo}
              onChangeText={(texto) =>
                actualizarCampo(texto, setCorreoUsuario, () =>
                  limpiarErroresCampo(setError, setErrores, 'correo')
                )
              }
            />

            <CampoFormulario
              label='Contraseña'
              placeholder='Escribe tu contraseña'
              value={contrasenaUsuario}
              icono='lock-outline'
              secureTextEntry
              autoCapitalize='none'
              error={errores.contrasena}
              onChangeText={(texto) =>
                actualizarCampo(texto, setContrasenaUsuario, () =>
                  limpiarErroresCampo(setError, setErrores, 'contrasena')
                )
              }
            />

            <CampoFormulario
              label='Número de teléfono'
              placeholder='Ej: 3001123456'
              value={numeroTelefonoUsuario}
              icono='phone-outline'
              keyboardType='phone-pad'
              error={errores.numeroTelefono}
              onChangeText={(texto) =>
                actualizarCampo(texto, setNumeroTelefonoUsuario, () =>
                  limpiarErroresCampo(setError, setErrores, 'numeroTelefono')
                )
              }
            />

            <SelectorDesplegable
              etiqueta='Fecha de nacimiento'
              icono='calendar-outline'
              valor={fechaNacimientoUsuario
                ? formatearFechaLarga(fechaNacimientoUsuario, true)
                : 'Selecciona una fecha'}
              error={errores.fechaNacimiento}
              alPresionar={() => {
                setMostrarCalendario(true);
                limpiarErroresCampo(setError, setErrores, 'fechaNacimiento');
              }}
            />

            {error && <MensajeError mensaje={error} />}

            <View style={registroStyles.contenedorBotones}>
              <Boton
                texto='Registrarse'
                onPress={guardarInformacion}
              />
            </View>

          </ScrollView>
        </MaskedView>

        <ModalFechaNacimiento
          visible={mostrarCalendario}
          alCerrar={() => setMostrarCalendario(false)}
          fechaSeleccionada={fechaNacimientoUsuario}
          alSeleccionar={(fecha) => setFechaNacimientoUsuario(fecha)}
        />

        <ModalExito
          visible={mostrarExito}
          mensaje='Usuario registrado correctamente.'
          onClose={() => router.replace('/iniciar-sesion')}
        />

      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default PantallaRegistro;
