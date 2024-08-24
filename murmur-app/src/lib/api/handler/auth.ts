import { AxiosResponse } from "axios";
import { request } from "../setupAxios";
import {
	LoginDTO,
	RegisterDTO,
} from "../dto/AuthInput";
import { Account } from "../../model/account";

export const register = (body: RegisterDTO): Promise<AxiosResponse<Account>> =>
	request.post("/account/register", body);

export const login = (body: LoginDTO): Promise<AxiosResponse<Account>> =>
	request.post("/account/login", body);

export const logout = (): Promise<AxiosResponse> =>
	request.post("/account/logout");
