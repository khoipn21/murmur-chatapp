import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { RouterProps } from "../../models/routerProps";
import { VCMember, VoiceResponse, VoiceSignal } from "@models/voice";
import { userStore } from "@store/userStore";
import { voiceStore } from "@store/voiceStore";
import { getSameSocket } from "@api/getSocket";
import { vcKey } from "@utils/querykeys";

type WSMessage =
	| { action: "joinVoice" | "leaveVoice"; data: VoiceResponse }
	| {
			action: "toggle-mute" | "toggle-deafen";
			data: { id: string; value: boolean };
	  }
	| { action: "voice-signal"; data: VoiceSignal };

export function useVoiceSocket(): void {
	const { guildId } = useParams<keyof RouterProps>() as RouterProps;
	const key = [vcKey, guildId];

	const current = userStore((state) => state.current);

	const [
		inVC,
		setVoiceClients,
		setVoiceJoinUserId,
		setRtcSignalData,
		setVoiceLeaveUserId,
		voiceClients,
		setIsMuted,
		setIsDeafened,
	] = voiceStore((state) => [
		state.inVC,
		state.setVoiceClients,
		state.setVoiceJoinUserId,
		state.setRtcSignalData,
		state.setVoiceLeaveUserId,
		state.voiceClients,
		state.setIsMuted,
		state.setIsDeafened,
	]);

	const cache = useQueryClient();
	const socket = getSameSocket();

	useEffect(() => {
		if (inVC) {
			socket.send(
				JSON.stringify({
					action: "joinVoice",
					room: guildId,
				}),
			);

			const disconnect = (): void => {
				socket.send(
					JSON.stringify({
						action: "leaveVoice",
						room: guildId,
					}),
				);
				socket.close();
			};

			socket.addEventListener("message", (event) => {
				const response: WSMessage = JSON.parse(event.data);
				switch (response.action) {
					case "joinVoice": {
						const { data } = response;
						setVoiceClients(data.clients);

						// Remove the current user from the list
						cache.setQueryData<VCMember[]>(key, (_) =>
							data.clients.filter((e) => e.id !== current?.id),
						);

						if (inVC) {
							setVoiceJoinUserId(data.userId);
						}
						break;
					}

					case "leaveVoice": {
						const { data } = response;
						setVoiceClients(data.clients);

						// Remove the current user from the list
						cache.setQueryData<VCMember[]>(key, (_) =>
							data.clients.filter((e) => e.id !== current?.id),
						);

						if (inVC) {
							setVoiceLeaveUserId(data.userId);
						}
						break;
					}

					case "voice-signal": {
						if (inVC) {
							const { data } = response;
							setRtcSignalData(data);
						}
						break;
					}

					case "toggle-mute": {
						const { data } = response;
						const clients = voiceClients.map((e) => {
							if (e.id === data.id) {
								return { ...e, isMuted: data.value };
							}
							return e;
						});

						setVoiceClients(clients);
						if (data.id === current?.id) {
							setIsMuted(data.value);
						}
						break;
					}

					case "toggle-deafen": {
						const { data } = response;
						const clients = voiceClients.map((e) => {
							if (e.id === data.id) {
								return { ...e, isDeafened: data.value };
							}
							return e;
						});

						setVoiceClients(clients);
						if (data.id === current?.id) {
							setIsDeafened(data.value);
						}
						break;
					}

					default:
						break;
				}
			});

			window.addEventListener("beforeunload", disconnect);

			return () => disconnect();
		}

		return undefined;
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [inVC, socket]);
}
