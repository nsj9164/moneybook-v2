import { UUID } from "@/types/ids";

export type ProviderType = string | null;

export interface User {
  id: UUID;
  email: string;
  name?: string;
  profileImage?: string;
  provider: ProviderType;
  createdAt: Date;
}

export interface AuthContextType {
  user: User | null;
  userId: UUID | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  logout: () => void;
}
