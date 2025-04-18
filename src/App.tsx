import { SplitLayout } from "./components/layouts/SplitLayout";
import { HeroSection } from "./components/sections/HeroSection";
import { AuthSection } from "./components/sections/AuthSection";

function App() {
  return <SplitLayout left={<HeroSection />} right={<AuthSection />} />;
  /* return (
    <div className="text-3xl text-green-500 font-bold p-10">
      ✅ Tailwind 적용됨!
    </div>
  ); */
}

export default App;
