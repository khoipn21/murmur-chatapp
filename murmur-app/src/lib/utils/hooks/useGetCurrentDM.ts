import { useQuery } from "@tanstack/react-query";
import { dmKey } from "@utils/querykeys";
import { DMChannel } from "@models/dm";

export function useGetCurrentDM(channelId: string): DMChannel | undefined {
	const { data } = useQuery<DMChannel[]>({ queryKey: [dmKey] });
	return data?.find((c) => c.id === channelId);
}
