export type Users = {
    username: string,
    email: string,
    password: string
}

export type authUser = {
    email: string,
    password: string
}

export type authResponse = {
    email: string,
    username: string,
    token: any;
}