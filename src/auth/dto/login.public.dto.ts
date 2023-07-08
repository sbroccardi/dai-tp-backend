export class LoginPublicDto {
  idToken: string;
  serverAuthCode: string;
  scopes: Array<string>;
  user: {
    email: string;
    id: string;
    givenName: string;
    familyName: string;
    photo: string; // url
    name: string; // full name
  };
}
