import { AppLayout } from "@/components/layout/AppLayout";
import { PageContainer } from "@/components/layout/PageContainer";
import { AppCard } from "@/components/ui/AppCard";
import { sectionSpacing } from "@/components/ui/design-system";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SectionTitle } from "@/components/ui/SectionTitle";

export default function Home() {
  const exampleCards = [
    {
      title: "Calories",
      subtitle: "Today",
      value: "1,840",
      footer: "Goal: 2,200 kcal",
    },
    {
      title: "Protein",
      subtitle: "Daily intake",
      value: "112g",
      footer: "Goal: 140g",
    },
    {
      title: "Steps",
      subtitle: "Movement",
      value: "8,420",
      footer: "Goal: 10,000 steps",
    },
  ];

  return (
    <AppLayout>
      <PageContainer>
        <AppCard variant="hero" className="max-w-2xl">
          <SectionTitle eyebrow="FitPilot" title="FitPilot">
            Your AI Fitness Companion
          </SectionTitle>
          <PrimaryButton className="mt-12" label="Coming Soon" />

          <div className="mx-auto mt-12 max-w-sm border-t border-border pt-8">
            <p className="mb-4 text-sm font-medium text-muted">
              Example usage
            </p>
            <PrimaryButton label="Start with FitPilot" fullWidth />
          </div>
        </AppCard>

        <section className={sectionSpacing.grid}>
          {exampleCards.map((card) => (
            <AppCard
              key={card.title}
              title={card.title}
              subtitle={card.subtitle}
              footer={
                <p className="text-sm font-medium text-muted">{card.footer}</p>
              }
            >
              <p className="text-4xl font-semibold tracking-tight text-foreground">
                {card.value}
              </p>
            </AppCard>
          ))}
        </section>
      </PageContainer>
    </AppLayout>
  );
}
