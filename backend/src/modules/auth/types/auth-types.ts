import { Document } from "mongoose";

export interface UserProps extends Document {
  _id: string;
  username: string;
  email: string;
  password: string;
  total_blogs?: number;
  is_verified?: boolean;
  otp: string;
  otp_expiry: Date;
  bio?: string;
  avatar_url?: string;
  is_admin?: boolean;
  date_registered?: Date;
}