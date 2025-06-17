import { CardSection } from "@/components/common/layout/CardSection";
import { AlertCircle, ArrowRight } from "lucide-react";
import { AdviceCard } from "./AdviceCard";

export const Advice = () => {
  return (
    <CardSection title={"예산 조언"} className={"space-y-4"}>
      <AdviceCard />
    </CardSection>
  );
};
