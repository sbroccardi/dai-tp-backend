export class CreateUserDto {
  type: string;
  avatar?: string;
  fullname: string;
  company?: string;
  lat?: number;
  lng?: number;
  address?: string;
  email: string;
  password: string;
  refreshToken?: string;
}
