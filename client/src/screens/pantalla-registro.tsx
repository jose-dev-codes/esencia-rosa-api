
import {
  ScrollView,
  View,
  KeyboardAvoidingView
} from 'react-native';
import {
  actualizarCampo,
  limpiarCampos
} from '@/utils/formulario-utilidades';

import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import Boton from '@/components/boton';
import CampoFormulario from '@/components/campo-formulario';
import MensajeError from '@/components/mensaje-error';
import Encabezado from '@/components/encabezado';
import ModalExito from '@/components/modal-exito';
import { registroStyles } from '@/styles/registro-styles';
import { registrarUsuario } from '@/services/usuario-servicio';

const PantallaRegistro = () => {
  const [nombresUsuario, setNombresUsuario] = useState('');
  const [apellidosUsuario, setApellidosUsuario] = useState('');
  const [correoUsuario, setCorreoUsuario] = useState('');
  const [contrasenaUsuario, setContrasenaUsuario] = useState('');
  const [numeroTelefonoUsuario, setNumeroTelefonoUsuario] = useState('');
  const [fechaNacimientoUsuario, setFechaNacimientoUsuario] = useState('');
  const [alturaEncabezado, setAlturaEncabezado] = useState(0);
  const [mostrarExito, setMostrarExito] = useState(false);
  const [error, setError] = useState('');

  const limpiarFormulario = () => {
    setNombresUsuario('');
    setApellidosUsuario('');
    setCorreoUsuario('');
    setContrasenaUsuario('');
    setNumeroTelefonoUsuario('');
    setFechaNacimientoUsuario('');
    setError('');
  };

  // Registra un nuevo usuario.
  const guardarInformacion = async () => {
    const datosLimpios = limpiarCampos({
      nombresUsuario,
      apellidosUsuario,
      correoUsuario,
      contrasenaUsuario,
      numeroTelefonoUsuario,
      fechaNacimientoUsuario
    });

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
        console.log('Estado HTTP:', resultado.respuesta.status);
        console.log('Respuesta del servidor:', resultado.datos);

        setError(
          resultado.datos.error || 'No fue posible registrar el usuario.'
        );
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
        behavior='padding'
      >
        <View
          style={registroStyles.encabezado}
          onLayout={(evento) =>
            setAlturaEncabezado(evento.nativeEvent.layout.height)
          }
        >
          <Encabezado titulo='Registro'/>
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
            label='Nombres'
            placeholder='Escribe tus nombres'
            value={nombresUsuario}
            icono='account-outline'
            autoCapitalize='words'
            onChangeText={(texto) =>
              actualizarCampo(texto, setNombresUsuario, setError)
            }
          />

          <CampoFormulario
            label='Apellidos'
            placeholder='Escribe tus apellidos'
            value={apellidosUsuario}
            icono='account-multiple-outline'
            autoCapitalize='words'
            onChangeText={(texto) =>
              actualizarCampo(texto, setApellidosUsuario, setError)
            }
          />

          <CampoFormulario
            label='Correo'
            placeholder='ejemplo@correo.com'
            value={correoUsuario}
            icono='email-outline'
            keyboardType='email-address'
            autoCapitalize='none'
            onChangeText={(texto) =>
              actualizarCampo(texto, setCorreoUsuario, setError)
            }
          />

          <CampoFormulario
            label='Contraseña'
            placeholder='Escribe tu contraseña'
            value={contrasenaUsuario}
            icono='lock-outline'
            secureTextEntry
            autoCapitalize='none'
            onChangeText={(texto) =>
              actualizarCampo(texto, setContrasenaUsuario, setError)
            }
          />

          <CampoFormulario
            label='Número de teléfono'
            placeholder='Ej: 3001123456'
            value={numeroTelefonoUsuario}
            icono='phone-outline'
            keyboardType='phone-pad'
            onChangeText={(texto) =>
              actualizarCampo(texto, setNumeroTelefonoUsuario, setError)
            }
          />

          <CampoFormulario
            label='Fecha de nacimiento'
            placeholder='AAAA-MM-DD'
            value={fechaNacimientoUsuario}
            icono='calendar-outline'
            onChangeText={(texto) =>
              actualizarCampo(texto, setFechaNacimientoUsuario, setError)
            }
          />

          {error && <MensajeError mensaje={error} />}

          <View style={registroStyles.contenedorBotones}>
            <Boton
              texto='Registrarse'
              onPress={guardarInformacion}
            />
          </View>

        </ScrollView>

        <ModalExito
          visible={mostrarExito}
          mensaje='Usuario registrado correctamente.'
          onClose={() => setMostrarExito(false)}
        />

      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default PantallaRegistro;
