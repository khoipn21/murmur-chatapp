import { useQuery } from "@tanstack/react-query";
import { Channel } from "@models/channel";
import { cKey } from "@utils/querykeys";

export function useGetCurrentChannel(
	channelId: string,
	guildId: string,
): Channel | undefined {
	const { data } = useQuery<Channel[]>({ queryKey: [cKey, guildId] });
	return data?.find((c) => c.id === channelId);
}
