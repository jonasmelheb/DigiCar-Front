import { Role } from "./Role";

export interface SigninResponse {
  "id": number;
  "firstname": string;
  "lastname": string;
  "username": string;
  "email": string;
  "roles": Role;
  "accessToken": string;
  "tokenType": string;
}
