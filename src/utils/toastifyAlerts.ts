import { toast } from 'react-toastify';

export function errorAlert(message: string) {
	toast.error(message, {
		position: toast.POSITION.BOTTOM_CENTER,
	});
}

export function successAlert(message: string) {
	toast.success(message, {
		position: toast.POSITION.BOTTOM_CENTER,
	});
}
