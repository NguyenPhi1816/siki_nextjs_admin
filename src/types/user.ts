export interface IAuthResponse {
  Id: number;
  FirstName: string;
  LastName: string;
  Address: string;
  PhoneNumber: string;
  Gender: string;
  DateOfBirth: string;
  Avatar: string | null;
  Email: string;
  roles: string[];
}
