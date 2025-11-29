export type TokenPayload = {
    id: string;
    email: string;
    role: string;
    iat?: number;
    exp?: number;
}
