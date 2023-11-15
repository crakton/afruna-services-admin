import { AxiosError, isAxiosError } from "axios";
import { redirect } from "next/navigation";
import { toast } from "react-toastify";

import { TErrorResponse } from "../types/auth.types";

export function handleAuthErrors(error: AxiosError<TErrorResponse>) {
	if (isAxiosError(error)) {
		if (error.response) {
			if (
				error.response.data.message === "jwt expired" ||
				error.response.data.message === "jwt malformed"
			) {
				toast.error(error.response.data.message)
				redirect('/auth')
			}
			//successful request with server response.
			else
				toast.error(error.response.data.message as string, {
					position: "top-center",
					autoClose: 5000,
					hideProgressBar: true,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: "colored",
				});
			return error.response.data;
		} else if (error.request) {
			// request made but no server response
			toast.warn("Sorry! Something happened with us", {
				position: "top-center",
				autoClose: 5000,
				hideProgressBar: true,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "colored",
			});
			return error.request;
		} else {
            throw Error(JSON.stringify(error));
		}
	} else {
		/* toast.error("Make sure you have an active internet connection!", {
			position: "top-center",
			autoClose: 5000,
			hideProgressBar: true,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: "colored",
		}); */
		console.error(JSON.stringify(error));
		return error;
	}
}