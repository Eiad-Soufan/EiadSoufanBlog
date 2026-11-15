import PageHero from "../components/PageHero";
import ImpactMetrics from "../components/ImpactMetrics";
import TrustMarquee from "../components/TrustMarquee";
import SelectedSystems from "../components/systems/SelectedSystems";

export default function Home() {
  return (
    <div className="relative">
      <PageHero page="home" />
      <div className="site-container py-8 lg:py-12">
        <ImpactMetrics />
      </div>
      <TrustMarquee />
      <SelectedSystems />
    </div>
  );
}
