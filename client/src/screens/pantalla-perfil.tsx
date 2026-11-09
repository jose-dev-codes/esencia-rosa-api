import { Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState, useCallback } from 'react';
import { useFocusEffect, router } from 'expo-router';
import { obtenerPerfil } from '@/services/usuario-servicio';
import { cerrarSesion } from '@/services/sesion-servicio';
import { formatearFechaLarga } from '@/utils/formulario-utilidades';
import Encabezado from '@/components/encabezado';
import Boton from '@/components/boton';
import BarraNavegacion from '@/components/barra-navegacion';
import PantallaCarga from '@/components/pantalla-carga';

import { perfilStyles } from '@/styles/perfil-styles';

const PantallaPerfil = () => {
  const [usuario, setUsuario] = useState<any>(null);
  const [cargando, setCargando] = useState(true);

  useFocusEffect(
    useCallback(() => {
      const cargarPerfil = async () => {
        setCargando(true);

        const resultado = await obtenerPerfil();

        if (resultado) setUsuario(resultado.datos);

        setCargando(false);
      };

      cargarPerfil();
    }, [])
  );

  const iniciales = usuario
    ? `${usuario.nombres?.charAt(0) ?? ''}${usuario.apellidos?.charAt(0) ?? ''}`
      .toUpperCase()
    : '';

  const manejarCerrarSesion = async () => {
    await cerrarSesion();
    router.replace('/iniciar-sesion');
  };

  if (cargando) return <PantallaCarga />;

  return (
    <SafeAreaView style={perfilStyles.contenedor}>
      <View style={perfilStyles.encabezado}>
        <Encabezado titulo='Mi perfil' />
      </View>

      <View style={perfilStyles.contenido}>
        <View style={perfilStyles.tarjetaPerfil}>
          <View style={perfilStyles.avatar}>
            <Text style={perfilStyles.iniciales}>
              {iniciales}
            </Text>
          </View>

          <Text style={perfilStyles.nombre}>
            {usuario?.nombres} {usuario?.apellidos}
          </Text>

          <Text style={perfilStyles.correo}>
            {usuario?.correo}
          </Text>
        </View>

        <View style={perfilStyles.tarjetaInformacion}>
          <View style={perfilStyles.filaInformacion}>
            <MaterialCommunityIcons
              name='phone-outline'
              size={23}
              color='#E42BB8'
            />

            <View style={perfilStyles.detalleInformacion}>
              <Text style={perfilStyles.etiqueta}>Teléfono</Text>
              <Text style={perfilStyles.dato}>{usuario?.numero_telefono}</Text>
            </View>
          </View>

          <View style={perfilStyles.filaInformacion}>
            <MaterialCommunityIcons
              name='calendar-month-outline'
              size={23}
              color='#E42BB8'
            />

            <View style={perfilStyles.detalleInformacion}>
              <Text style={perfilStyles.etiqueta}>Fecha de nacimiento</Text>
              <Text style={perfilStyles.dato}>
                {usuario?.fecha_nacimiento
                  ? formatearFechaLarga(usuario.fecha_nacimiento, true)
                  : ''}
              </Text>
            </View>
          </View>
        </View>

        <Text style={perfilStyles.tituloSeccion}>Editar información</Text>
        <View style={perfilStyles.opciones}>
          <TouchableOpacity
            style={perfilStyles.filaOpcion}
            onPress={() => router.push('/actualizar-usuario')}
          >
            <MaterialCommunityIcons
              name='account-edit-outline'
              size={23}
              color='#E42BB8'
            />

            <Text style={perfilStyles.textoOpcion}>
              Actualizar datos personales
            </Text>

            <MaterialCommunityIcons
              name='chevron-right'
              size={24}
              color='#8F1568'
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={perfilStyles.filaOpcion}
            onPress={() => router.push('/cambiar-contrasena')}
          >
            <MaterialCommunityIcons
              name='lock-reset'
              size={23}
              color='#E42BB8'
            />

            <Text style={perfilStyles.textoOpcion}>
              Cambiar contraseña
            </Text>

            <MaterialCommunityIcons
              name='chevron-right'
              size={24}
              color='#8F1568'
            />
          </TouchableOpacity>
        </View>

        <Boton
          texto='Cerrar sesión'
          onPress={manejarCerrarSesion}
          variante='secundario'
        />
      </View>

      <View style={perfilStyles.navegacion}>
        <BarraNavegacion />
      </View>
    </SafeAreaView>
  );
};

export default PantallaPerfil;
