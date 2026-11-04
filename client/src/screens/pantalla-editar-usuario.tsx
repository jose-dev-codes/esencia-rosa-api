import {
    ScrollView,
    View,
    KeyboardAvoidingView
} from 'react-native';

import {
    actualizarCampo,
    limpiarCampos
} from '@/utils/formulario-utilidades';

import { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

import {
    actualizarUsuario,
    consultarUsuarioPorId
} from '@/services/usuario-servicio';

import Boton from '@/components/boton';
import CampoFormulario from '@/components/campo-formulario';
import MensajeError from '@/components/mensaje-error';
import Encabezado from '@/components/encabezado';
import ModalExito from '@/components/modal-exito';
import { registroStyles } from '@/styles/registro-styles';

type PantallaEditarUsuarioProps = {
  id: number;
};

const PantallaEditarUsuario = ({
  id
}: PantallaEditarUsuarioProps) => {
  const [nombresUsuario, setNombresUsuario] = useState('');
  const [apellidosUsuario, setApellidosUsuario] = useState('');
  const [correoUsuario, setCorreoUsuario] = useState('');
  const [numeroTelefonoUsuario, setNumeroTelefonoUsuario] = useState('');
  const [fechaNacimientoUsuario, setFechaNacimientoUsuario] = useState('');

  const [alturaEncabezado, setAlturaEncabezado] = useState(0);
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(true);
  const [mostrarExito, setMostrarExito] = useState(false);

  // Consulta los datos del usuario seleccionado.
  useEffect(() => {
    const cargarUsuario = async () => {
      try {
        const resulatdo = await consultarUsuarioPorId(id);

        if (!resulatdo.respuesta.ok) {
          setError(resulatdo.datos.error || 'No fue posible consultar el usuario.');
          return;
        }

        const usuario = resulatdo.datos.usuario;

        setNombresUsuario(usuario.nombres);
        setApellidosUsuario(usuario.apellidos);
        setCorreoUsuario(usuario.correo);
        setNumeroTelefonoUsuario(usuario.numero_telefono);
        setFechaNacimientoUsuario(
          usuario.fecha_nacimiento
            ? usuario.fecha_nacimiento.substring(0, 10)
            : ''
        );

      } catch (error) {
        console.error('Error al consultar el usuario.', error);
        setError('No se puedo conectar con el servidor.');
      } finally {
        setCargando(false);
      }
    };

    cargarUsuario();
  }, [id]);

  // Actualiza los datos personales del usuario.
  const guardarInformacion = async () => {
    const datosLimpios = limpiarCampos({
      nombresUsuario,
      apellidosUsuario,
      correoUsuario,
      numeroTelefonoUsuario,
      fechaNacimientoUsuario
    });

    try {
      const resultado = await actualizarUsuario(
        id,
        datosLimpios.nombresUsuario,
        datosLimpios.apellidosUsuario,
        datosLimpios.correoUsuario,
        datosLimpios.numeroTelefonoUsuario,
        datosLimpios.fechaNacimientoUsuario
      );

      if (!resultado.respuesta.ok) {
        setError(resultado.datos.error || 'No fue posible actualizar el usuario.');
        return;
      }

      setMostrarExito(true);

    } catch (error) {
      console.error('Error al actualizar el usuario.', error);
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
          <Encabezado titulo='Editar usuario' />
        </View>

        <ScrollView
          style={{
            paddingTop: alturaEncabezado + 40,
            marginTop: 5
          }}
          contentContainerStyle={registroStyles.contenedor}
          keyboardShouldPersistTaps='handled'
        >
          {cargando ? null : (
            <>
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
                  texto='Guardar cambios'
                  onPress={guardarInformacion}
                />
              </View>
            </>
          )}
        </ScrollView>

        <ModalExito
          visible={mostrarExito}
          mensaje='Usuario actualizado correctamente.'
          onClose={() => {
            setMostrarExito(false);
            router.back();
          }}
        />

      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default PantallaEditarUsuario;
