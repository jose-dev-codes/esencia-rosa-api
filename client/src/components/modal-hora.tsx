import {
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { modalBaseStyles } from '@/styles/modal-base-styles';
import { formatearHora12 } from '@/utils/formulario-utilidades';

import Boton from './boton';

type Props = {
  visible: boolean,
  alCerrar: () => void,
  horasDisponibles: string[],
  alSeleccionar: (hora: string) => void
};

const ModalHora = ({
  visible,
  alCerrar,
  horasDisponibles,
  alSeleccionar
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
            Selecciona una hora
          </Text>

          <ScrollView style={modalBaseStyles.listaOpciones}>
            {horasDisponibles.map((hora) => (
              <TouchableOpacity
                key={hora}
                onPress={() => {
                  alSeleccionar(hora);
                  alCerrar();
                }}
                style={modalBaseStyles.opcion}
              >
                <Text style={modalBaseStyles.textoOpcion}>
                  {formatearHora12(hora)}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

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

export default ModalHora;
