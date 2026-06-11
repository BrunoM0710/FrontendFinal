import { toast } from "react-toastify";

export const mostrarExito = (mensaje) => {
  toast.success(mensaje);
};

export const mostrarError = (mensaje) => {
  toast.error(mensaje);
};

export const mostrarInfo = (mensaje) => {
  toast.info(mensaje);
};
