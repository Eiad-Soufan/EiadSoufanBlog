import HeroNova from "../components/HeroNova";
import SelectedSystems from "../components/systems/SelectedSystems";

export default function Home() {
  return (
    <div className="relative">
      <HeroNova />
      <SelectedSystems />
    </div>
  );
}
