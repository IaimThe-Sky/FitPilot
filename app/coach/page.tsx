import { AppLayout } from "@/components/layout/AppLayout";
import { PageContainer } from "@/components/layout/PageContainer";
import { AppCard } from "@/components/ui/AppCard";
import { fields } from "@/components/ui/design-system";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SectionTitle } from "@/components/ui/SectionTitle";

export default function CoachPage() {
  return (
    <AppLayout>
      <PageContainer>
        <AppCard variant="hero" className="max-w-3xl">
          <SectionTitle eyebrow="Coach" title="AI coach">
            Ask simple fitness questions and get calm guidance.
          </SectionTitle>
        </AppCard>

        <AppCard
          title="Chat"
          subtitle="AI chat placeholder"
          className="max-w-3xl"
        >
          <div className="space-y-4">
            <div className="rounded-card border border-border bg-white px-6 py-5">
              <p className="text-base leading-7 text-muted">
                Hi, I&apos;m your FitPilot coach. What would you like help with
                today?
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <label className="flex-1">
                <span className="sr-only">Message your coach</span>
                <input
                  className={fields.input}
                  placeholder="Type a question"
                  disabled
                />
              </label>
              <PrimaryButton
                label="Send"
                fullWidth
                className="sm:w-auto"
                disabled
              />
            </div>
          </div>
        </AppCard>
      </PageContainer>
    </AppLayout>
  );
}
