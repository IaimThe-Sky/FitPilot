import { AppLayout } from "@/components/layout/AppLayout";
import { PageContainer } from "@/components/layout/PageContainer";
import { OnboardingFlow } from "@/components/onboarding/OnboardingFlow";

export default function OnboardingPage() {
  return (
    <AppLayout>
      <PageContainer>
        <OnboardingFlow />
      </PageContainer>
    </AppLayout>
  );
}
