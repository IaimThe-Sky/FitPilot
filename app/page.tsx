import { AppCard } from "@/components/ui/AppCard";
import { layout } from "@/components/ui/design-system";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SectionTitle } from "@/components/ui/SectionTitle";

export default function Home() {
  return (
    <main className={layout.page}>
      <div className={layout.container}>
        <AppCard>
          <SectionTitle eyebrow="FitPilot" title="FitPilot">
            Your AI Fitness Companion
          </SectionTitle>
          <PrimaryButton className="mt-12">Coming Soon</PrimaryButton>
        </AppCard>
      </div>
    </main>
  );
}
