

export class SignUpInfo{
    username: string;
    password: string;
    name: string;
    surename: string;
    phoneNumber: number;
    emailAddress: string;
    birthdate: Date;
    gender: string;
    enabled: string;
    role: string [];

    constructor(username: string, password: string, name:string, surename:string, phoneNumber:number, emailAddress:string, 
        birthdate: Date, gender:string, enabled: string)
    {
        this.username = username;
        this.password = password;
        this.name = name;
        this.surename = surename;
        this.phoneNumber = phoneNumber;
        this.emailAddress = emailAddress;
        this.birthdate = birthdate;
        this.gender = gender;
        this.enabled = enabled;
        this.role = ['user'];
    }
}