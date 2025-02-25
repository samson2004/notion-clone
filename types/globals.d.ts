import { User } from "./type";

export {}
declare global{
    interface CustomJwtsessionClaims extends User{}
}