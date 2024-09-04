import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { getSocket } from "@api/getSocket";
import { userStore } from "@store/userStore";
import { rKey } from "@utils/querykeys";
import { homeStore } from "@store/homeStore";
import { FriendRequest } from "@models/friends";

type WSMessage = { action: "add_request"; data: FriendRequest };

function useRequestSocket(): void {
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

		socket.addEventListener("message", (event) => {
			const response: WSMessage = JSON.parse(event.data);
			switch (response.action) {
				case "add_request": {
					cache.setQueryData<FriendRequest[]>([rKey], (data) =>
						[...(data ?? []), response.data].sort((a, b) =>
							a.username.localeCompare(b.username),
						),
					);
					break;
				}

				default:
					break;
			}
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

export default useRequestSocket;
