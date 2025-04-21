import { SplitLayout } from "@/components/layouts/SplitLayout";
import { AuthSection } from "@/components/sections/AuthSection";
import { HeroSection } from "@/components/sections/HeroSection";

const Login = () => {
  return <SplitLayout left={<HeroSection />} right={<AuthSection />} />;
};

export default Login;
