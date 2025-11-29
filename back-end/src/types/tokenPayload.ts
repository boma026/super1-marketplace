export type TokenPayload = {
    id: number;
    email: string;
    role: string;
    iat?: number;
    exp?: number;
}
