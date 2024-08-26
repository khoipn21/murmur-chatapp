import { AxiosResponse } from "axios";
import { request } from "@api/setupAxios";
import { GuildInput } from "@api/dto/GuildInput";
import { InviteInput } from "@api/dto/InviteInput";
import { Member } from "@models/member";
import { Guild } from "@models/guild";
import { VCMember } from "@models/voice";

export const getUserGuilds = (): Promise<AxiosResponse<Guild[]>> =>
	request.get("/guilds");

export const createGuild = (input: GuildInput): Promise<AxiosResponse<Guild>> =>
	request.post("guilds/create", input);

export const joinGuild = (input: InviteInput): Promise<AxiosResponse<Guild>> =>
	request.post("guilds/join", input);

export const getInviteLink = (
	id: string,
	isPermanent: boolean = false,
): Promise<AxiosResponse<string>> =>
	request.get(`guilds/${id}/invite${isPermanent ? "?isPermanent=true" : ""}`);

export const invalidateInviteLinks = (
	id: string,
): Promise<AxiosResponse<boolean>> => request.delete(`guilds/${id}/invite`);

export const getGuildMembers = (id: string): Promise<AxiosResponse<Member[]>> =>
	request.get(`guilds/${id}/members`);

export const getVCMembers = (id: string): Promise<AxiosResponse<VCMember[]>> =>
	request.get(`guilds/${id}/vcmembers`);

export const leaveGuild = (id: string): Promise<AxiosResponse<boolean>> =>
	request.delete(`guilds/${id}`);

export const editGuild = (
	id: string,
	input: FormData,
): Promise<AxiosResponse<boolean>> =>
	request.put(`guilds/${id}`, input, {
		headers: {
			"Content-Type": "multipart/form-data",
		},
	});

export const deleteGuild = (id: string): Promise<AxiosResponse<boolean>> =>
	request.delete(`guilds/${id}/delete`);
