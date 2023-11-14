import { IUserBio } from "../IUser";

export interface ILogin {
    email: string;
    password: string
}

export interface ISignUp {
    email: string;
    password: string;
    confirmPassword: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    country: string;
}

export interface IInitialLoginState {
    isAuthenticated: boolean,
    userBio: IUserBio
}
