import { BackendResponseCountryDTO, BackendReceiveCountryDTO } from './CountryDTO';
import { BackendResponseMessageDTO, BackendReciveMessageDTO } from './MessageDTO';
import { BackendResponseRoleDTO, BackendReciveRoleDTO } from './RoleDTO';

export class BackendResponseUserDTO {

    public userID: number;
    public userFirstName: string;
    public userLastName: string;
    public userEmail: string;
    public userUsername: string;
    public userPassword: string;
    public userGeneder: boolean;
    public userBirthDay: any;
    public userPhone: string;
    public userCountry: BackendResponseCountryDTO;
    public userMessages: BackendResponseMessageDTO[];
    public userRole: BackendResponseRoleDTO;
}

export class BackendReceiveUserDTO {

    public userID: number;
    public userFirstName: string;
    public userLastName: string;
    public userEmail: string;
    public userUsername: string;
    public userPassword: string;
    public userGeneder: boolean;
    public userBirthDay: Date;
    public userPhone: string;
    public userCountry: BackendReceiveCountryDTO;
    public userMessages: BackendReciveMessageDTO[];
    public userRole: BackendReciveRoleDTO;
}