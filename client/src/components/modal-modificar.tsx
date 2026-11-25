import { Modal, Text, View } from 'react-native';
import { modalBaseStyles } from '@/styles/modal-base-styles';
import Boton from '@/components/boton';

type ModalModificarProps = {
  visible: boolean,
  accion: string,
  nombre: string,
  adjetivo: string,
  advertencia?: string,
  alCerrar: () => void,
  alConfirmar: () => void
};

const capitalizarPalabra = (palabra: string) =>
  palabra.charAt(0).toUpperCase() + palabra.slice(1).toLocaleLowerCase();

const ModalModificar = ({
  visible,
  accion,
  nombre,
  adjetivo,
  advertencia,
  alCerrar,
  alConfirmar
}: ModalModificarProps) => {
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
            {`${capitalizarPalabra(accion)} ${nombre}`}
          </Text>

          <Text style={modalBaseStyles.mensajeModal}>
            {`¿Estas seguro de que deseas ${accion} ${adjetivo} ${nombre}`}
          </Text>

          {advertencia && (
            <Text style={modalBaseStyles.advertenciaModal}>
              {advertencia}
            </Text>
          )}

          <View style={[
            modalBaseStyles.botonesModal,
            !advertencia ? { marginTop: 5 } : null
          ]}>
            <Boton
              texto='No'
              onPress={alCerrar}
              flex={1}
              borderRadius={8}
              variante='secundario'
              paddingHorizontal={10}
            />

            <Boton
              texto={`Si, ${accion}`}
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

export default ModalModificar;
