import { AppLayout } from "@/components/layout/AppLayout";
import { PageContainer } from "@/components/layout/PageContainer";
import { ConsistencyCard } from "@/components/progress/ConsistencyCard";
import { ProgressSummary } from "@/components/progress/ProgressSummary";
import { WeightTrendChart } from "@/components/progress/WeightTrendChart";
import { AppCard } from "@/components/ui/AppCard";
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

        <ProgressSummary />
        <WeightTrendChart />
        <ConsistencyCard />
      </PageContainer>
    </AppLayout>
  );
}
