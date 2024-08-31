export const verifyEmail = (token: string) =>
    instance.post(`/api/auth/verify-email/${token}`);