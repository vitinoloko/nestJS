import { ReturnUserDtos } from "src/user/dtos/returnUser.dto";

export interface ReturnLogi {
    user: ReturnUserDtos;
    accessToken: string;
}