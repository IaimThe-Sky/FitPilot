import { AppLayout } from "@/components/layout/AppLayout";
import { PageContainer } from "@/components/layout/PageContainer";
import { DashboardOverview } from "@/components/dashboard/DashboardOverview";

export default function DashboardPage() {
  return (
    <AppLayout>
      <PageContainer>
        <DashboardOverview />
      </PageContainer>
    </AppLayout>
  );
}
