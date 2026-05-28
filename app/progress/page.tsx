import { AppLayout } from "@/components/layout/AppLayout";
import { PageContainer } from "@/components/layout/PageContainer";
import { AppCard } from "@/components/ui/AppCard";
import { sectionSpacing } from "@/components/ui/design-system";
import { SectionTitle } from "@/components/ui/SectionTitle";

export default function ProgressPage() {
  return (
    <AppLayout>
      <PageContainer>
        <AppCard variant="hero" className="max-w-3xl">
          <SectionTitle eyebrow="Progress" title="Your progress">
            Calm summaries will help you see what is improving over time.
          </SectionTitle>
        </AppCard>

        <section className={sectionSpacing.grid}>
          <AppCard title="Calories" subtitle="Chart placeholder">
            <div className="h-40 rounded-card border border-border bg-white" />
          </AppCard>
          <AppCard title="Protein" subtitle="Chart placeholder">
            <div className="h-40 rounded-card border border-border bg-white" />
          </AppCard>
          <AppCard title="Steps" subtitle="Chart placeholder">
            <div className="h-40 rounded-card border border-border bg-white" />
          </AppCard>
        </section>

        <AppCard
          title="Progress summary"
          subtitle="A simple weekly summary will appear here."
          className="max-w-3xl"
        >
          <p className="text-lg leading-8 text-muted">
            FitPilot will highlight steady wins, gentle trends, and next steps
            without overwhelming you.
          </p>
        </AppCard>
      </PageContainer>
    </AppLayout>
  );
}
