export class BackendResponsePersonDTO {

    public personID: number;
    public personName: string;
    public personEmail: string;
    public personGeneder: boolean;
    public personImage: string;
}

export class BackendRecievePersonDTO {

    public PersonID: number;
    public PersonName: string;
    public PersonUsername: string;
    public PersonGeneder: boolean;
    public PersonImage: ImageData;
}