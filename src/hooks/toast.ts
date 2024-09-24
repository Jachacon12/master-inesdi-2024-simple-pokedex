import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastType } from 'models';

/**
 * Displays a toast notification with a message and type.
 * @param message The message to display.
 * @param type The type of toast (success, warning, etc.).
 */
export const showToaster = (message: string, type: ToastType): void => {
  if (type === 'success') {
    toast.success(message);
  } else if (type === 'warning') {
    toast.warn(message);
  }
};
