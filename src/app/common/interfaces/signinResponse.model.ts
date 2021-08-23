import {ERole} from "./ERole";

export interface SigninResponse {
  "id": number;
  "firstname": string;
  "lastname": string;
  "username": string;
  "email": string;
  "roles": ERole;
  "accessToken": string;
  "tokenType": string;
}
