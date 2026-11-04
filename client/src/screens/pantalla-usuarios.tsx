import { useCallback, useState } from "react";
import {
  ScrollView,
  Text,
  View,
  Modal,
  TouchableOpacity,
  Alert
} from 'react-native';

import { useFocusEffect } from "expo-router";
import { SafeAreaView } from 'react-native-safe-area-context';
import { listarUsuarios, eliminarUsuario } from "@/services/usuario-servicio";
import Encabezado from "@/components/encabezado";
import ModalExito from "@/components/modal-exito";
import { usuariosStyles } from "@/styles/usuarios-styles";
import { router } from 'expo-router';

import BotonTarjeta from "@/components/boton-tarjeta";

type Usuario = {
  id_usuario: number;
  nombres: string;
  apellidos: string;
  correo: string;
  numero_telefono: string;
  fecha_nacimiento: string;
  rol: string;
  estado: string;
};

const PantallaUsuarios = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState<number | null>(null);
  const [mostrarExito, setMostrarExito] = useState(false);

  // Consulta los usuarios y actualiza el listado.
  const cargarUsuarios = async () => {
    const resultado = await listarUsuarios();

    if (resultado.respuesta.ok) {
      setUsuarios(resultado.datos.usuarios);
    }
  };

  // Muestra la confirmación para eliminar el usuario seleccionado.
  const mostrarConfirmacionEliminacion = (id: number) => {
    setUsuarioSeleccionado(id);
    setModalVisible(true);
  };

  // Elimina el usuario seleccionado.
  const confirmarEliminacion = async (id: number) => {
    try {
      const resulatdo = await eliminarUsuario(id);

      if (resulatdo.respuesta.ok) {
        setMostrarExito(true);
        return;
      }

      Alert.alert(
        'Error',
        resulatdo.datos.error || 'No se pudo eliminar el usuario.'
      );

    } catch (error) {
      console.error('Error al eliminar el usuario:', error);
      Alert.alert('Error', 'No se pudo conectar con el servidor.');
    }
  };

  // Actualiza el listado cada vez que la pantalla recibe el foco.
  useFocusEffect(
    useCallback(() => {
      cargarUsuarios();
    }, [])
  );

  return (
    <SafeAreaView style={usuariosStyles.areaSegura}>
      <View style={usuariosStyles.encabezado}>
        <Encabezado titulo='Usuarios registrados' />
      </View>

      <Modal
        visible={modalVisible}
        transparent
        animationType='fade'
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={usuariosStyles.fondoModal}>
          <View style={usuariosStyles.modal}>
            <Text style={usuariosStyles.tituloModal}>
              Eliminar usuario
            </Text>

            <Text style={usuariosStyles.mensajeModal}>
              ¿Estás seguro de que deseas eliminar este usuario?
            </Text>

            <View style={usuariosStyles.botonesModal}>
              <TouchableOpacity
                style={usuariosStyles.botonNo}
                onPress={() => setModalVisible(false)}
              >
                <Text style={usuariosStyles.textoBotonNo}>No</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={usuariosStyles.botonSi}
                onPress={() => {
                  setModalVisible(false);
                  if (usuarioSeleccionado !== null) {
                    confirmarEliminacion(usuarioSeleccionado);
                  }
                }}
              >
                <Text style={usuariosStyles.textoBotonSi}>
                  Sí, eliminar
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <ModalExito
        visible={mostrarExito}
        mensaje='Usuario eliminado correctamente.'
        onClose={() => {
          setMostrarExito(false);
          cargarUsuarios();
        }}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={usuariosStyles.contenedor}
      >
        {usuarios.length > 0 ? (
          usuarios.map((usuario) => (
            <View
              key={usuario.id_usuario}
              style={usuariosStyles.tarjeta}
            >
              <Text style={usuariosStyles.nombre}>
                {usuario.nombres} {usuario.apellidos}
              </Text>

              <View style={usuariosStyles.separador} />

              <Text style={usuariosStyles.dato}>
                Correo: {usuario.correo}
              </Text>

              <Text style={usuariosStyles.dato}>
                Teléfono: {usuario.numero_telefono}
              </Text>

              <Text style={usuariosStyles.dato}>
                Fecha de nacimiento: {usuario.fecha_nacimiento}
              </Text>

              <View style={usuariosStyles.filaDatos}>
                <Text style={usuariosStyles.dato}>
                  Rol: {usuario.rol}
                </Text>

                <Text style={usuariosStyles.dato}>
                  Estado: {usuario.estado}
                </Text>
              </View>

              <View style={{ flexDirection: 'row', gap: 10 }}>
                <BotonTarjeta
                  texto='Editar'
                  onPress={() =>
                    router.push({
                      pathname: '/editar-usuario',
                      params: { id: usuario.id_usuario.toString() }
                    })
                  }
                  flex={1}
                />

                <BotonTarjeta
                  texto='Eliminar'
                  onPress={() => mostrarConfirmacionEliminacion(usuario.id_usuario)}
                  flex={1}
                  variante='peligro'
                />
              </View>
            </View>
          ))
        ) : (
            <View style={usuariosStyles.listaVacia}>
              <Text style={usuariosStyles.mensajeVacio}>
                No hay usuarios registrados.
              </Text>
            </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default PantallaUsuarios;
