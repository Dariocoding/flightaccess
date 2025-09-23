'use client';

import * as React from 'react';
import { REGEXP_ONLY_DIGITS_AND_CHARS } from 'input-otp';
import { type SubmitHandler } from 'react-hook-form';
import { toast } from 'sonner';

import { resendEmailConfirmation } from '@/actions/auth/resend-email-confirmation';
import { verifyEmailWithOtp } from '@/actions/auth/verify-email-with-otp';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  type CardProps
} from '@/components/ui/card';
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormProvider
} from '@/components/ui/form';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot
} from '@/components/ui/input-otp';
import { useZodForm } from '@/hooks/use-zod-form';
import {
  verifyEmailWithOtpSchema,
  type VerifyEmailWithOtpSchema
} from '@/schemas/auth/verify-email-with-otp-schema';

export type VerifyEmailCardProps = CardProps & {
  email: string;
};

export function VerifyEmailCard({
  email,
  ...other
}: VerifyEmailCardProps): React.JSX.Element {
  // Resend
  const [isResendingEmailVerification, setIsResendingEmailVerification] =
    React.useState<boolean>(false);
  const handleResendEmailVerification = async (): Promise<void> => {
    setIsResendingEmailVerification(true);
    const result = await resendEmailConfirmation({ email });
    if (!result?.serverError && !result?.validationErrors) {
      toast.success('Correo electrónico de verificación reenviado');
    } else {
      toast.error('No se pudo reenviar la verificación');
    }
    setIsResendingEmailVerification(false);
  };
  // Verify with OTP
  const methods = useZodForm({
    schema: verifyEmailWithOtpSchema,
    mode: 'onSubmit',
    defaultValues: {
      otp: ''
    }
  });
  const canSubmit = !methods.formState.isSubmitting;
  const onSubmit: SubmitHandler<VerifyEmailWithOtpSchema> = async (values) => {
    if (!canSubmit) {
      return;
    }
    const result = await verifyEmailWithOtp(values);
    if (result?.serverError || result?.validationErrors) {
      toast.error('No se pudo verificar el correo electrónico');
    }
  };
  return (
    <FormProvider {...methods}>
      <Card {...other}>
        <CardHeader>
          <CardTitle>Por favor, verifica tu correo electrónico</CardTitle>
          <CardDescription>
            Tu registro ha sido exitoso. Te hemos enviado un correo electrónico
            con un enlace de verificación.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            className="flex flex-col gap-4"
            onSubmit={methods.handleSubmit(onSubmit)}
          >
            <p className="text-sm text-muted-foreground">
              Alternativamente, puedes usar el código de verificación en el
              correo electrónico para verificar tu cuenta.
            </p>
            <FormField
              control={methods.control}
              name="otp"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col items-center space-y-0">
                  <FormControl>
                    <InputOTP
                      {...field}
                      maxLength={6}
                      pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                      disabled={methods.formState.isSubmitting}
                      onComplete={methods.handleSubmit(onSubmit)}
                    >
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              variant="default"
              disabled={!canSubmit}
              loading={methods.formState.isSubmitting}
            >
              Verificar
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center gap-1 text-sm text-muted-foreground">
          No recibiste un correo electrónico?
          <Button
            type="button"
            variant="link"
            className="h-fit px-0.5 py-0 text-foreground underline"
            disabled={
              methods.formState.isSubmitting || isResendingEmailVerification
            }
            onClick={handleResendEmailVerification}
          >
            Reenviar
          </Button>
        </CardFooter>
      </Card>
    </FormProvider>
  );
}
