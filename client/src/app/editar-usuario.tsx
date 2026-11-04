import { useLocalSearchParams } from 'expo-router';
import PantallaEditarUsuario from '../screens/pantalla-editar-usuario';

const EditarUsuario = () => {
  const { id } = useLocalSearchParams<{ id: string }>();

  return <PantallaEditarUsuario id={Number(id)} />;
};

export default EditarUsuario;
