import { LucideIcon } from "lucide-react";

export interface ActionCard {
  to: string;
  title: string;
  description: string;
  icon: LucideIcon;
  iconColor: string;
  iconBg: string;
  delay: number;
}
