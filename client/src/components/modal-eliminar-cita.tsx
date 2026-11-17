import { Modal, Text, View } from 'react-native';
import { modalBaseStyles } from '@/styles/modal-base-styles';
import Boton from '@/components/boton';

type ModalEliminarCitaProps = {
  visible: boolean,
  alCerrar: () => void,
  alConfirmar: () => void
};

const ModalEliminarCita = ({
  visible,
  alCerrar,
  alConfirmar
}: ModalEliminarCitaProps) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType='fade'
      onRequestClose={alCerrar}
    >
      <View style={modalBaseStyles.fondoModal}>
        <View style={modalBaseStyles.modalContenido}>
          <Text style={modalBaseStyles.tituloModal}>Cancelar cita</Text>

          <Text style={modalBaseStyles.mensajeModal}>
            ¿Estas seguro de que deseas cancelar esta cita?
          </Text>

          <Text style={modalBaseStyles.advertenciaModal}>
            Si confirmas, no podrás reagendarla.
          </Text>

          <View style={modalBaseStyles.botonesModal}>
            <Boton
              texto='No'
              onPress={alCerrar}
              flex={1}
              borderRadius={8}
              variante='secundario'
              paddingHorizontal={10}
            />

            <Boton
              texto='Si, cancelar'
              onPress={alConfirmar}
              flex={1}
              borderRadius={8}
              sinSombra
              paddingHorizontal={10}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalEliminarCita;
