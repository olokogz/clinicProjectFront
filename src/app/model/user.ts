import { Authorities } from './authorities';
import { PatientAdress } from './parientAdress';

export class User {
    id: number;
    password: string;
    username: string;
    name: string;
    surename: string;
    phoneNumber: number;
    emailAddress: string;
    birthdate: Date;
    gender: string;
    enabled: boolean;
    accountCreationDate: Date;
    authorities: Authorities[];
    patientAdress: PatientAdress[];
}
