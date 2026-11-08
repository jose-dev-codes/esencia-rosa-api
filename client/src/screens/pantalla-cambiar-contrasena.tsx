import {
  KeyboardAvoidingView,
  ScrollView,
  View
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { useState, useEffect } from 'react';
import { router } from 'expo-router';

import {
  obtenerPerfil,
  actualizarContrasena
} from '@/services/usuario-servicio';
import {
  actualizarCampo,
  limpiarError,
  limpiarCampos,
  limpiarErroresCampo
} from '@/utils/formulario-utilidades';
import {
  validarCambioContrasena,
  ErroresCambioContrasena
} from '@/validators/usuario-validador';

import Encabezado from '@/components/encabezado';
import Boton from '@/components/boton';
import CampoFormulario from '@/components/campo-formulario';
import ModalExito from '@/components/modal-exito';
import MensajeError from '@/components/mensaje-error';
import PantallaCarga from '@/components/pantalla-carga';

import { registroStyles } from '@/styles/registro-styles';

const PantallaCambiarContrasena = () => {
  const [idUsuario, setIdUsuario] = useState<number | null>(null);
  const [contrasena, setContrasena] = useState('');
  const [confirmarContrasena, setConfirmarContrasena] = useState('');

  const [error, setError] = useState('');
  const [errores, setErrores] = useState<ErroresCambioContrasena>({});
  const [mostrarExito, setMostrarExito] = useState(false);
  const [cargando, setCargando] = useState(true);
  const [alturaEncabezado, setAlturaEncabezado] = useState(0);

  useEffect(() => {
    const cargarPerfil = async () => {
      const resultado = await obtenerPerfil();

      if (resultado) {
        setIdUsuario(resultado.datos.id_usuario);
      }

      setCargando(false);
    };

    cargarPerfil();
  }, []);

  // Envía la nueva contraseña al backend
  const guardarContrasena = async () => {
    limpiarError(setError);
    setErrores({});

    if (!idUsuario) {
      setError('No se pudo cargar el perfil.');
      return;
    }

    const datosLimpios = limpiarCampos({
      contrasena,
      confirmarContrasena
    });

    const erroresValidacion = validarCambioContrasena(
      datosLimpios.contrasena,
      datosLimpios.confirmarContrasena
    );

    if (Object.keys(erroresValidacion).length > 0) {
      setErrores(erroresValidacion);
      return;
    }

    try {
      const resultado = await actualizarContrasena(
        idUsuario,
        datosLimpios.contrasena
      );

      if (!resultado) {
        setError('Tu sesión expiró. Inicia sesión de nuevo.');
        return;
      }

      if (resultado && !resultado.respuesta.ok) {
        setError(resultado.datos.error);
        return;
      }

      if (resultado?.respuesta.ok) {
        setMostrarExito(true);
      }

    } catch (error) {
      console.error('Error al conectar con el servidor.');
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
          <Encabezado titulo='Cambiar contraseña' />
        </View>

        <ScrollView
          style={{
            paddingTop: alturaEncabezado + 40,
            marginTop: 5
          }}
          contentContainerStyle={registroStyles.contenedor}
          keyboardShouldPersistTaps='handled'
        >
          <CampoFormulario
            label='Nueva contraseña'
            placeholder='Escribe tu nueva contraseña'
            value={contrasena}
            icono='lock-outline'
            secureTextEntry
            autoCapitalize='none'
            error={errores.contrasena}
            onChangeText={(texto) =>
              actualizarCampo(texto, setContrasena, () =>
                limpiarErroresCampo(setError, setErrores, 'contrasena')
              )
            }
          />

          <CampoFormulario
            label='Confirmar contraseña'
            placeholder='Repite tu nueva contraseña'
            value={confirmarContrasena}
            icono='lock-check-outline'
            secureTextEntry
            autoCapitalize='none'
            error={errores.confirmarContrasena}
            onChangeText={(texto) =>
              actualizarCampo(texto, setConfirmarContrasena, () =>
                limpiarErroresCampo(setError, setErrores, 'confirmarContrasena')
              )
            }
          />

          {error && <MensajeError mensaje={error} />}

          <View style={registroStyles.contenedorBotones}>
            <Boton
              texto='Guardar contraseña'
              onPress={guardarContrasena}
            />
          </View>
        </ScrollView>

        <ModalExito
          visible={mostrarExito}
          mensaje='Contraseña actualizada correctamente.'
          onClose={() => router.replace('/perfil')}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default PantallaCambiarContrasena;
