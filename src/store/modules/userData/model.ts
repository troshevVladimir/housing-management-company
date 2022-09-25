export type User = {
    name: string
    role: string
}


export type Users = Array<User>
export interface UserData {
    userName: string
    role: string
    id: string | number
}