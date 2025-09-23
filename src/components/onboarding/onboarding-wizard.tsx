'use client';

import * as React from 'react';
import { type SubmitHandler } from 'react-hook-form';
import { toast } from 'sonner';

import { completeOnboarding } from '@/actions/onboarding/complete-onboarding';
import { completeOrganizationOnlyOnboarding } from '@/actions/onboarding/complete-organization-only-onboarding';
import { completeUserOnlyOnboarding } from '@/actions/onboarding/complete-user-only-onboarding';
import { OnboardingOrganizationStep } from '@/components/onboarding/onboarding-organization-step';
import { OnboardingProfileStep } from '@/components/onboarding/onboarding-profile-step';
import { StepIndicator } from '@/components/onboarding/step-indicator';
import { FormProvider } from '@/components/ui/form';
import { Logo } from '@/components/ui/logo';
import type { getOnboardingData } from '@/data/onboarding/get-onboarding-data';
import { useZodForm } from '@/hooks/use-zod-form';
import { cn } from '@/lib/utils';
import {
  completeOnboardingSchema,
  type CompleteOnboardingSchema
} from '@/schemas/onboarding/complete-onboarding-schema';
import {
  completeOrganizationOnboardingSchema,
  type CompleteOrganizationOnboardingSchema
} from '@/schemas/onboarding/complete-organization-onboarding-schema';
import {
  completeUserOnboardingSchema,
  type CompleteUserOnboardingSchema
} from '@/schemas/onboarding/complete-user-onboarding-schema';
import { FileUploadAction } from '@/types/file-upload-action';

enum Step {
  Organization,
  Profile
}

const headers: Record<string, string> = {
  [Step.Organization]: 'Detalles de la organización',
  [Step.Profile]: 'Configura tu perfil'
};

const descriptions: Record<string, string> = {
  [Step.Organization]:
    'Solo necesitamos algunos datos básicos para configurar tu organización. Podrás editar esto más adelante.',
  [Step.Profile]:
    'Verifica si la información del perfil es correcta. Podrás cambiar esto más adelante en la página de configuración de la cuenta.'
};

export type OnboardingWizardProps = React.HtmlHTMLAttributes<HTMLDivElement> &
  Awaited<ReturnType<typeof getOnboardingData>>;

export function OnboardingWizard({
  organization,
  user,
  className,
  ...other
}: OnboardingWizardProps): React.JSX.Element {
  const [currentStep, setCurrentStep] = React.useState<Step>(
    !organization.completedOnboarding ? Step.Organization : Step.Profile
  );
  const methods = useZodForm({
    schema:
      !user.completedOnboarding && !organization.completedOnboarding
        ? completeOnboardingSchema
        : user.completedOnboarding
          ? completeOrganizationOnboardingSchema
          : completeUserOnboardingSchema,
    mode: 'all',
    defaultValues: {
      organizationName: organization?.name ?? '',
      action: FileUploadAction.None,
      image: user?.image,
      name: user?.name ?? 'Unkown'
    }
  });
  const steps: Step[] = [];
  if (!organization.completedOnboarding) {
    steps.push(Step.Organization);
  }
  if (!user.completedOnboarding) {
    steps.push(Step.Profile);
  }
  const currentStepIndex = steps.indexOf(currentStep);
  const isLastStep = currentStepIndex === steps.length - 1;
  const formValues = methods.getValues();
  const isOrganizationBasicDetailsValid =
    steps.includes(Step.Organization) &&
    completeOrganizationOnboardingSchema.safeParse(formValues).success;
  const isAccountProfileValid =
    steps.includes(Step.Profile) &&
    completeUserOnboardingSchema.safeParse(formValues).success;
  const canSubmit =
    !methods.formState.isSubmitting && methods.formState.isValid;
  const handleScrollToTop = (): void => {
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
  };
  const onSubmit: SubmitHandler<
    | CompleteOnboardingSchema
    | CompleteOrganizationOnboardingSchema
    | CompleteUserOnboardingSchema
  > = async (values) => {
    if (!canSubmit) {
      return;
    }

    if (!user.completedOnboarding && !organization.completedOnboarding) {
      const result = await completeOnboarding(
        values as CompleteOnboardingSchema
      );
      if (result?.serverError || result?.validationErrors) {
        toast.error('No se pudo completar el onboarding');
        return;
      }
    } else if (!user.completedOnboarding) {
      const variables = values as CompleteUserOnboardingSchema;
      const result = await completeUserOnlyOnboarding({
        action: variables.action,
        image: variables.image,
        name: variables.name,
        phone: variables.phone
      });
      if (result?.serverError || result?.validationErrors) {
        toast.error('No se pudo completar el onboarding');
        return;
      }
    } else if (!organization.completedOnboarding) {
      const variables = values as CompleteOrganizationOnboardingSchema;
      const result = await completeOrganizationOnlyOnboarding({
        organizationName: variables.organizationName
      });
      if (result?.serverError || result?.validationErrors) {
        toast.error('No se pudo completar el onboarding');
        return;
      }
    }
    toast.success('Onboarding completado');
  };
  const handleNext = (): void => {
    if (currentStep === Step.Organization && isOrganizationBasicDetailsValid) {
      if (isLastStep) {
        methods.handleSubmit(onSubmit)();
        return;
      } else {
        setCurrentStep(Step.Profile);
        handleScrollToTop();
      }
    }

    if (currentStep === Step.Profile && isAccountProfileValid) {
      methods.handleSubmit(onSubmit)();
      return;
    }
  };
  return (
    <div
      className={cn('flex flex-col pb-1.5', className)}
      {...other}
    >
      <div className="mx-auto mt-6">
        <div className="flex items-center justify-center">
          <Logo />
        </div>
      </div>
      <div className="mx-auto w-full max-w-lg p-4 sm:p-8 md:p-12">
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <div className="flex w-48 flex-col gap-4">
              <p className="text-sm text-muted-foreground">
                Paso {currentStepIndex + 1} de {steps.length}
              </p>
              <StepIndicator
                steps={steps}
                currentStep={currentStep}
                setCurrentStep={setCurrentStep as (value: number) => void}
              />
            </div>
            <h1 className="text-3xl font-medium">{headers[currentStep]}</h1>
            <p className="text-base text-muted-foreground">
              {descriptions[currentStep]}
            </p>
            {currentStep === Step.Organization && (
              <OnboardingOrganizationStep
                next={handleNext}
                canNext={
                  isOrganizationBasicDetailsValid &&
                  !methods.formState.isSubmitting
                }
                loading={methods.formState.isSubmitting}
                isLastStep={isLastStep}
              />
            )}

            {currentStep === Step.Profile && (
              <OnboardingProfileStep
                email={user?.email ?? ''}
                next={handleNext}
                canNext={
                  isAccountProfileValid && !methods.formState.isSubmitting
                }
                loading={methods.formState.isSubmitting}
                isLastStep={isLastStep}
              />
            )}
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
