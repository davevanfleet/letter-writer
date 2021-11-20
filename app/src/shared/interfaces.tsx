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
  account_access: boolean;
}

export interface ICongregation {
  id: number;
  api_access?: boolean;
  name: string;
}

export interface ITerritory {
  id: number;
  name: string;
  assignments: IAssignment[];
}

export interface IAssignment {
  id: number;
  user: IUser;
  checked_out: string;
  checked_in?: string;
  territory: { id: number; name: string };
  contacts: IContact[];
}

export interface IContact {
  id: number;
  name: string;
  address: string;
  phone: string;
  phone_type: 'mobile|landline';
  lang: string;
}
