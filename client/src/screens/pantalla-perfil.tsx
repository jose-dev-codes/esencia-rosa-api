import { Text, View, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import Encabezado from '@/components/encabezado';
import Boton from '@/components/boton';
import BarraNavegacion from '@/components/barra-navegacion';

import { perfilStyles } from '@/styles/perfil-styles';

const PantallaPerfil = () => {
  // Datos provisionales mientras conectamos el perfil con el backend.
  const usuario = {
    nombres: 'Nombre del usuario',
    apellidos: 'Apellidos del usuario',
    correo: 'correo@ejemplo.com',
    telefono: '300 000 000',
    fechaNacimiento: 'AAAA-MM-DD',
  };

  const iniciales = `${usuario.nombres.charAt(0)}${usuario.apellidos.charAt(0)}`;

  return (
    <SafeAreaView style={perfilStyles.contenedor}>
      <View style={perfilStyles.encabezado}>
        <Encabezado titulo='Perfil' />
      </View>

      <View style={perfilStyles.contenido}>
        <View style={perfilStyles.tarjetaPerfil}>
          <View style={perfilStyles.avatar}>
            <Text style={perfilStyles.iniciales}>
              {iniciales}
            </Text>
          </View>

          <Text style={perfilStyles.nombre}>
            {usuario.nombres} {usuario.apellidos}
          </Text>

          <Text style={perfilStyles.correo}>
            {usuario.correo}
          </Text>
        </View>

        <View style={perfilStyles.tarjetaInformacion}>
          <Text style={perfilStyles.tituloSeccion}>
            Información personal
          </Text>

          <View style={perfilStyles.filaInformacion}>
            <MaterialCommunityIcons
              name='phone-outline'
              size={22}
              color='#E42BB8'
            />

            <View style={perfilStyles.detalleInformacion}>
              <Text style={perfilStyles.etiqueta}>Teléfono</Text>
              <Text style={perfilStyles.dato}>
                {usuario.telefono}
              </Text>
            </View>
          </View>

          <View style={perfilStyles.filaInformacion}>
            <MaterialCommunityIcons
              name='calendar-month-outline'
              size={22}
              color='#E42BB8'
            />

            <View style={perfilStyles.detalleInformacion}>
              <Text style={perfilStyles.etiqueta}>
                Fecha de nacimiento
              </Text>
              <Text style={perfilStyles.dato}>
                {usuario.fechaNacimiento}
              </Text>
            </View>
          </View>
        </View>

        <View style={perfilStyles.opciones}>
          <TouchableOpacity
            style={perfilStyles.filaOpcion}
            onPress={() => {}}
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
            onPress={() => {}}
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
          onPress={() => {}}
        />
      </View>

      <View style={perfilStyles.navegacion}>
        <BarraNavegacion />
      </View>
    </SafeAreaView>
  );
};

export default PantallaPerfil;
