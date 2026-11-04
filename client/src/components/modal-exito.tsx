import { useEffect } from 'react';

import {
  Modal,
  Text,
  View
} from 'react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { modalExitoStyles } from '@/styles/modal-exito-styles';

type ModalExitoProps = {
  visible: boolean,
  mensaje: string,
  onClose: () => void
};

// Componente reutilizable para mostrar mensajes de éxito.
const ModalExito = ({
  visible,
  mensaje,
  onClose
}: ModalExitoProps) => {
  useEffect(() => {
    if (!visible) return;

    const temporizador = setTimeout(() => {
      onClose();
    }, 2000);

    return () => clearTimeout(temporizador);

  }, [visible, onClose]);

  return (
    <Modal
      visible={visible}
      transparent
      animationType='fade'
    >
      <View style={modalExitoStyles.fondoModal}>
        <View style={modalExitoStyles.modal}>

          <MaterialCommunityIcons
            name='check-circle-outline'
            size={110}
            color='#E42BB8'
            style={{ marginBottom: 5 }}
          />

          <Text style={modalExitoStyles.mensajeModal}>
            {mensaje}
          </Text>

        </View>
      </View>
    </Modal>
  );
};

export default ModalExito;
