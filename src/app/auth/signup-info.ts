

export class SignUpInfo{
    username: string;
    password: string;
    enabled: string;
    role: string [];

    constructor(username: string, password: string, enabled: string)
    {
        this.username = username;
        this.password = password;
        this.enabled = enabled;
        this.role = ['user'];
    }
}