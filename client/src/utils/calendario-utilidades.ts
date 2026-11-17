export const obtenerDiasEnMes = (anio: number, mesNumero: number) => {
  return new Date(anio, mesNumero + 1, 0).getDate();
};

export const obtenerPrimerDiaSemana = (anio: number, mesNumero: number) => {
  const diaSemana = new Date(anio, mesNumero, 1).getDay();
  return (diaSemana + 6) % 7;
};

export const construirFechaDia = (
  anio: number,
  mesNumero: number,
  dia: number
) => {
  return (
    `${anio}-` +
    `${String(mesNumero + 1).padStart(2, '0')}-` +
    `${String(dia).padStart(2, '0')}`
  );
};

export const esDiaDisponible = (dia: number, diasDisponibles: number[]) => {
  return diasDisponibles.includes(dia);
};
