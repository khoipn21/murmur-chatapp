import { useQuery } from "@tanstack/react-query";
import { gKey } from "@utils/querykeys";
import { Guild } from "@models/guild";

export function useGetCurrentGuild(guildId: string): Guild | undefined {
	const { data: guildData } = useQuery<Guild[]>({ queryKey: [gKey] });
	return guildData?.find((g) => g.id === guildId);
}
