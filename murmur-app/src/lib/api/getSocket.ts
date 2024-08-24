import ReconnectingWebSocket from "reconnecting-websocket";

export const getSocket = (): ReconnectingWebSocket =>
	new ReconnectingWebSocket(import.meta.env.VITE_APP_WS!);

let socket: ReconnectingWebSocket | null = null;
export const getSameSocket = (): ReconnectingWebSocket => {
	if (!socket) {
		socket = new ReconnectingWebSocket(import.meta.env.VITE_APP_WS!);
	}

	return socket;
};
