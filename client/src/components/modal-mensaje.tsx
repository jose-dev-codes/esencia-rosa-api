import {
  Modal,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { modalBaseStyles } from '@/styles/modal-base-styles';

import Boton from './boton';

type Props = {
  visible: boolean,
  titulo: string,
  mensaje: string,
  alCerrar: () => void
};

const ModalMensaje = ({
  visible,
  titulo,
  mensaje,
  alCerrar
}: Props) => {

  return (
    <Modal
      visible={visible}
      transparent
      animationType='fade'
      onRequestClose={alCerrar}
    >
      <View style={modalBaseStyles.fondoModal}>
        <View style={modalBaseStyles.modalContenido}>
          <Text style={modalBaseStyles.tituloModal}>
            {titulo}
          </Text>

          <View style={styles.textoConIcono}>
            <MaterialCommunityIcons
              name='alert-outline'
              size={40}
              color='#E42BB8'
            />
            <View style={styles.cajaTexto}>
              <Text
                style={[
                  modalBaseStyles.textoOpcion,
                  styles.textoMensaje
                ]}
              >
                {mensaje}
              </Text>
            </View>
          </View>

          <View style={{ marginTop: 20 }}>
            <Boton
              texto='Cerrar'
              onPress={alCerrar}
              borderRadius={8}
              sinSombra
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  textoConIcono: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  textoMensaje: {
    width: '100%',
    flexWrap: 'wrap'
  },
  cajaTexto: {
    flex: 1,
    minHeight: 0
  }
});

export default ModalMensaje;
