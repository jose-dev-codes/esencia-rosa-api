export const limpiarError = (
  setter: (texto: string) => void
) => {
  setter('');
};

export const actualizarCampo = (
  texto: string,
  setter: (texto: string) => void,
  setterError: (texto: string) => void
) => {
  setter(texto);
  limpiarError(setterError);
};

export const limpiarCampos = (datos: Record<string, string>) => {
  const datosLimpios: Record<string, string> = {};

  Object.keys(datos).forEach((campo) => {
    datosLimpios[campo] = datos[campo].trim();
  });

  return datosLimpios;
};
