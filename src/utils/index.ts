export const getCurrentDate = () => {
  const date = new Date();
  const day = () => {
    const day = date.getDate();
    if (day < 10) {
      return `0${day}`;
    }
    return day;
  };
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = () => {
    const minutes = date.getMinutes();
    if (minutes < 10) {
      return `0${minutes}`;
    }
    return minutes;
  };
  // Aclaraciones:
  // Por alguna razon al momento de escribir esto el mes esta desfazado por uno, por eso el arreglo.
  // Si se intenta obtener los minutos o los dias cuando estos son menores a 10 (ejemplo si son las 21:04 o es el 01 de diciembre)
  // te devuelve un numero solo y quiero que sea consistente con el formato habitual (con el 0 adelante), por eso mismo son funciones

  const formatedDate = `${day()}/${month}/${year},${hours}:${minutes()}`;
  return formatedDate;
};
