// Convierte "14:30" a minutos desde medianoche: 870.
// Sirve para comparar y calcular huecos libres.
export const horaAMinutos = (hora) => {
	const [horaTexto, minutoTexto] = hora.split(":");

	const horaNumero = parseInt(horaTexto, 10);
	const minutoNumero = parseInt(minutoTexto, 10);

	return horaNumero * 60 + minutoNumero;
};

// Convierte minutos desde medianoche a "HH:MM".
// Ej: 870 -> "14:30".
// Sirve para devolver las horas libres al front.
export const minutosAHora = (minutos) => {
	const horaNumero = Math.floor(minutos / 60);
	const minutoNumero = minutos % 60;

	return (
		`${String(horaNumero).padStart(2, "0")}:` +
		`${String(minutoNumero).padStart(2, "0")}`
	);
};
