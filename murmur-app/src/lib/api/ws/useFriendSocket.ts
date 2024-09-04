import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { getSocket } from "@api/getSocket";
import { userStore } from "@store/userStore";
import { fKey } from "@utils/queryKeys";
import { homeStore } from "@store/homeStore";
import { Friend } from "@models/friends";

type WSMessage =
	| {
			action: "toggle_online" | "toggle_offline" | "remove_friend";
			data: string;
	  }
	| { action: "requestCount"; data: number }
	| { action: "add_friend"; data: Friend };

function useFriendSocket(): void {
	const current = userStore((state) => state.current);
	const setRequests = homeStore((state) => state.setRequests);
	const cache = useQueryClient();

	useEffect((): any => {
		const socket = getSocket();
		socket.send(
			JSON.stringify({
				action: "joinUser",
				room: current?.id,
			}),
		);

		socket.send(JSON.stringify({ action: "getRequestCount" }));

		socket.addEventListener("message", (event) => {
			const response: WSMessage = JSON.parse(event.data);
			console.log("Received WebSocket message:", response);
			console.log("Current user ID:", current?.id);
			console.log("Friends query key:", [fKey]);
			switch (response.action) {
				case "toggle_online": {
					cache.setQueryData<Friend[]>([fKey], (d) => {
						if (!d) return [];
						return d.map((f) =>
							f.id === response.data ? { ...f, isOnline: true } : f,
						);
					});
					break;
				}

				case "toggle_offline": {
					cache.setQueryData<Friend[]>([fKey], (d) => {
						if (!d) return [];
						return d.map((f) =>
							f.id === response.data ? { ...f, isOnline: false } : f,
						);
					});
					break;
				}

				case "requestCount": {
					setRequests(response.data);
					break;
				}

				case "add_friend": {
					cache.setQueryData<Friend[]>([fKey], (data) =>
						[...(data ?? []), response.data].sort((a, b) =>
							a.username.localeCompare(b.username),
						),
					);
					break;
				}

				case "remove_friend": {
					cache.setQueryData<Friend[]>([fKey], (data) => [
						...(data?.filter((m) => m.id !== response.data) ?? []),
					]);
					break;
				}

				default:
					break;
			}
		});

		socket.addEventListener("open", () => {
			console.log("WebSocket connection opened");
			socket.send(JSON.stringify({ action: "toggleOnline" }));
		});

		socket.addEventListener("close", () => {
			console.log("WebSocket connection closed");
		});

		return () => {
			socket.send(
				JSON.stringify({
					action: "leaveRoom",
					room: current?.id,
				}),
			);

			socket.close();
		};
	}, [cache, current, setRequests]);
}

export default useFriendSocket;
