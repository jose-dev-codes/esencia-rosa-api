import {
  KeyboardAvoidingView,
  ScrollView,
  View,
  ActivityIndicator
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState, useEffect } from 'react';
import { router } from 'expo-router';

import {
  obtenerPerfil,
  actualizarUsuario
} from '@/services/usuario-servicio';
import {
  actualizarCampo,
  limpiarError,
  limpiarCampos,
  limpiarErroresCampo
} from '@/utils/formulario-utilidades';
import {
  validarActualizacion,
  ErroresActualizacion
} from '@/validators/usuario-validador';

import Encabezado from '@/components/encabezado';
import Boton from '@/components/boton';
import CampoFormulario from '@/components/campo-formulario';
import ModalExito from '@/components/modal-exito';
import MensajeError from '@/components/mensaje-error';
import PantallaCarga from '@/components/pantalla-carga';

import { registroStyles } from '@/styles/registro-styles';

const PantallaActualizarUsuario = () => {
  const [idUsuario, setIdUsuario] = useState<number | null>(null);
  const [nombres, setNombres] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [correo, setCorreo] = useState('');
  const [numeroTelefono, setNumeroTelefono] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');

  const [error, setError] = useState('');
  const [errores, setErrores] = useState<ErroresActualizacion>({});
  const [mostrarExito, setMostrarExito] = useState(false);
  const [cargando, setCargando] = useState(true);
  const [alturaEncabezado, setAlturaEncabezado] = useState(0);

  useEffect(() => {
    const cargarPerfil = async () => {
      const resultado = await obtenerPerfil();

      if (resultado) {
        const usuario = resultado.datos;

        setIdUsuario(usuario.id_usuario);
        setNombres(usuario.nombres ?? '');
        setApellidos(usuario.apellidos ?? '');
        setCorreo(usuario.correo ?? '');
        setNumeroTelefono(usuario.numero_telefono ?? '');
        setFechaNacimiento(
          usuario.fecha_nacimiento
            ? usuario.fecha_nacimiento.slice(0, 10)
            : ''
        );
      }

      setCargando(false);
    };

    cargarPerfil();
  }, []);

  // Envía los datos actualizados al backend
  const guardarCambios = async () => {
    limpiarError(setError);
    setErrores({});

    if (!idUsuario) {
      setError('No se pudo cargar el perfil.');
      return;
    }

    const datosLimpios = limpiarCampos({
      nombres,
      apellidos,
      correo,
      numeroTelefono,
      fechaNacimiento
    });

    const erroresValidacion = validarActualizacion(
      datosLimpios.nombres,
      datosLimpios.apellidos,
      datosLimpios.correo,
      datosLimpios.numeroTelefono,
      datosLimpios.fechaNacimiento
    );

    if (Object.keys(erroresValidacion).length > 0) {
      setErrores(erroresValidacion);
      return;
    }

    try {
      const resultado = await actualizarUsuario(
        idUsuario,
        datosLimpios.nombres,
        datosLimpios.apellidos,
        datosLimpios.correo,
        datosLimpios.numeroTelefono,
        datosLimpios.fechaNacimiento
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
          <Encabezado titulo='Actualizar datos' />
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
            placeholder='Tus nombres'
            value={nombres}
            icono='account-outline'
            error={errores.nombres}
            onChangeText={(texto) =>
              actualizarCampo(texto, setNombres, () =>
                limpiarErroresCampo(setError, setErrores, 'nombres')
              )
            }
          />

          <CampoFormulario
            label='Apellidos'
            placeholder='Tus apellidos'
            value={apellidos}
            icono='account-outline'
            error={errores.apellidos}
            onChangeText={(texto) =>
              actualizarCampo(texto, setApellidos, () =>
                limpiarErroresCampo(setError, setErrores, 'apellidos')
              )
            }
          />

          <CampoFormulario
            label='Correo'
            placeholder='correo@ejemplo.com'
            value={correo}
            icono='email-outline'
            error={errores.correo}
            onChangeText={(texto) =>
              actualizarCampo(texto, setCorreo, () =>
                limpiarErroresCampo(setError, setErrores, 'correo')
              )
            }
          />

          <CampoFormulario
            label='Teléfono'
            placeholder='Ej: 3001123456'
            value={numeroTelefono}
            icono='phone-outline'
            error={errores.numeroTelefono}
            onChangeText={(texto) =>
              actualizarCampo(texto, setNumeroTelefono, () =>
                limpiarErroresCampo(setError, setErrores, 'numeroTelefono')
              )
            }
          />

          <CampoFormulario
            label='Fecha de nacimiento'
            placeholder='AAAA-MM-DD'
            value={fechaNacimiento}
            icono='calendar-month-outline'
            error={errores.fechaNacimiento}
            onChangeText={(texto) =>
              actualizarCampo(texto, setFechaNacimiento, () =>
                limpiarErroresCampo(setError, setErrores, 'fechaNacimiento')
              )
            }
          />

          {error && <MensajeError mensaje={error} />}

          <View style={registroStyles.contenedorBotones}>
            <Boton
              texto='Guardar cambios'
              onPress={guardarCambios}
            />
          </View>
        </ScrollView>

        <ModalExito
          visible={mostrarExito}
          mensaje='Datos actualizados correctamente.'
          onClose={() => router.replace('/perfil')}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default PantallaActualizarUsuario;
