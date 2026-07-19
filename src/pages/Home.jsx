import HeroNova from "../components/HeroNova";
import TrustMarquee from "../components/TrustMarquee";
import SelectedSystems from "../components/systems/SelectedSystems";

export default function Home() {
  return (
    <div className="relative">
      <HeroNova />
      <TrustMarquee />
      <SelectedSystems />
    </div>
  );
}
