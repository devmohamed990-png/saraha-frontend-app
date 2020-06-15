import { BackendResponsePersonDTO } from "./PersonDTO";
import { BackendResponseUserDTO } from './UserDTO';
import { BackendRecievePersonDTO } from './PersonDTO';

export class BackendResponseMessageDTO {

    public messageID: number;
    public message: string;
    public user: BackendResponseUserDTO;
    public person: BackendResponsePersonDTO[];
}

export class BackendReciveMessageDTO {

    public messageID: number;
    public message: string;
    public user: BackendResponseUserDTO;
    public person: BackendRecievePersonDTO;
}