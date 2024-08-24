import { AxiosResponse } from "axios";
import { request } from "../setupAxios";
import { Account } from "../../model/account";
export const getAccount = (): Promise<AxiosResponse<Account>> =>
	request.get("/account");

export const updateAccount = (
	body: FormData,
): Promise<AxiosResponse<Account>> =>
	request.put("/account", body, {
		headers: {
			"Content-Type": "multipart/form-data",
		},
	});
