import Axios from "axios";

export const request = Axios.create({
	baseURL: `${import.meta.env.VITE_APP_API}/api`,
	withCredentials: true,
});
