import { BackendResponseUserDTO } from './UserDTO';

export class BackendResponseRoleDTO {

    public roleID: number;
    public role: string;
    public permissions: BackendResponseUserDTO[];
}

export class BackendReciveRoleDTO {

    public roleID: number;
    public role: string;
}