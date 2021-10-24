export interface IDnc {
    id: number;
    address: string;
    name: string;
    publisher: string;
    notes: string;
    date: string;
    territory_id: number;
    territory: ITerritory;
    description: string;
}

export interface IUser {
    id: number;
    congregation: ICongregation;
    email: string;
    name: string;
    role: string;

}

export interface ICongregation {
    id: number;
    api_access?: boolean;
    name: string;
}

export interface ITerritory {
    id: number;
    name: string;
}