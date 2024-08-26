import { AxiosResponse } from "axios";
import { request } from "../setupAxios";
import { LoginDTO, RegisterDTO, ChangePasswordInput } from "../dto/AuthInput";
import { Account } from "../../models/account";

export const register = (body: RegisterDTO): Promise<AxiosResponse<Account>> =>
	request.post("/account/register", body);

export const login = (body: LoginDTO): Promise<AxiosResponse<Account>> =>
	request.post("/account/login", body);

export const logout = (): Promise<AxiosResponse> =>
	request.post("/account/logout");

export const changePassword = (
	body: ChangePasswordInput,
): Promise<AxiosResponse> => request.put("/account/change-password", body);
