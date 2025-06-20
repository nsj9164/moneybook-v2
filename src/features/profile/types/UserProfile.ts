import { UUID } from "@/types/ids";

export interface IUserProfile {
  id: UUID;
  email: string;
  name?: string;
  profileImage?: string;
  note?: string;
  provider: string;
  created_at?: Date;
}
