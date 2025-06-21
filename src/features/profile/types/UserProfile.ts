import { UUID } from "@/types/ids";

export interface IUserProfile {
  id: UUID;
  email: string;
  name?: string;
  profileImage?: string;
  note?: string;
  provider: "kakao" | "google";
  createdAt: Date;
}
