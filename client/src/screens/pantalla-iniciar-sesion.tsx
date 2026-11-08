import {
  KeyboardAvoidingView,
  ScrollView,
  View
} from 'react-native';

import { router } from 'expo-router';
import { useState } from 'react';
import { validarInicioSesion, ErroresInicioSesion } from '@/validators/auth-validador';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { iniciarSesion } from '@/services/auth-servicio';
import {
  actualizarCampo,
  limpiarError,
  limpiarCampos,
  limpiarErroresCampo
} from '@/utils/formulario-utilidades';

import Boton from '@/components/boton';
import CampoFormulario from '@/components/campo-formulario';
import MensajeError from '@/components/mensaje-error';
import Encabezado from '@/components/encabezado';
import { SafeAreaView } from 'react-native-safe-area-context';
import { iniciarSesionStyles } from '@/styles/iniciar-sesion-styles';

const PantallaIniciarSesion = () => {
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState('');
  const [errores, setErrores] = useState<ErroresInicioSesion>({});
  const [alturaEncabezado, setAlturaEncabezado] = useState(0);

  const manejarInicioSesion = async () => {
    limpiarError(setError);
    setErrores({});

    const datosLimpios = limpiarCampos({
      correo,
      contrasena
    });

    const erroresValidacion = validarInicioSesion(
      datosLimpios.correo,
      datosLimpios.contrasena
    );

    // Si algún campo tiene error, se marcan y no se envía nada al servidor
    if (Object.keys(erroresValidacion).length > 0) {
      setErrores(erroresValidacion);
      return;
    }

    try {
      const { respuesta, datos } = await iniciarSesion(
        datosLimpios.correo,
        datosLimpios.contrasena
      );

      if (!respuesta.ok) {
        setError(datos.error);
        return;
      }

      await AsyncStorage.setItem('token', datos.token);
      router.replace('/inicio');

    } catch (error) {
      console.error('Error al conectar con el servidor.', error);
      setError('No se pudo conectar con el servidor.');
    }
  };

  return (
    <SafeAreaView style={iniciarSesionStyles.areaSegura}>
      <KeyboardAvoidingView
        style={iniciarSesionStyles.vistaTeclado}
        behavior='padding'
      >
        <View
          style={iniciarSesionStyles.encabezado}
          onLayout={(evento) =>
            setAlturaEncabezado(evento.nativeEvent.layout.height)
          }
        >
          <Encabezado titulo='Inicio de sesión' />
        </View>

        <ScrollView
          style={{
            paddingTop: alturaEncabezado + 40,
            marginTop: 5
          }}
          contentContainerStyle={iniciarSesionStyles.contenedor}
          keyboardShouldPersistTaps="handled"
        >

          <CampoFormulario
            label='Correo electrónico'
            placeholder='ejemplo@correo.com'
            value={correo}
            keyboardType='email-address'
            autoCapitalize='none'
            icono='email-outline'
            error={errores.correo}
            onChangeText={(texto) =>
              actualizarCampo(texto, setCorreo, () =>
                limpiarErroresCampo(setError, setErrores, 'correo')
              )
            }
          />

          <CampoFormulario
            label='Contraseña'
            placeholder='Ingresa tu contraseña'
            value={contrasena}
            secureTextEntry
            icono='lock-outline'
            error={errores.contrasena}
            onChangeText={(texto) =>
              actualizarCampo(texto, setContrasena, () =>
                limpiarErroresCampo(setError, setErrores, 'contrasena')
              )
            }
          />

          {error && <MensajeError mensaje={error} />}

          <View style={iniciarSesionStyles.contenedorBotones}>

            <Boton
              texto='Iniciar sesión'
              onPress={manejarInicioSesion}
            />

            <Boton
              texto='Volver al inicio'
              onPress={() =>
                router.canGoBack()
                  ? router.back()
                  : router.replace('/')
              }
            />

          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default PantallaIniciarSesion;
