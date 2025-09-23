'use client';

import * as React from 'react';
import { toast } from 'sonner';

import { resendEmailConfirmation } from '@/actions/auth/resend-email-confirmation';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  type CardProps
} from '@/components/ui/card';

export type VerifyEmailExpiredCardProps = CardProps & {
  email: string;
};

export function VerifyEmailExpiredCard({
  email,
  ...other
}: VerifyEmailExpiredCardProps): React.JSX.Element {
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
  return (
    <Card {...other}>
      <CardHeader>
        <CardTitle>Verificación de correo electrónico ha expirado</CardTitle>

        <CardDescription>
          Lo sentimos, tu verificación de correo electrónico ha expirado!
          Necesitas solicitar una verificación nuevamente.
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-center gap-1 text-sm text-muted-foreground">
        No recibiste un correo electrónico?
        <Button
          type="button"
          variant="link"
          className="h-fit px-0.5 py-0 text-foreground underline"
          disabled={isResendingEmailVerification}
          onClick={handleResendEmailVerification}
        >
          Reenviar correo electrónico de verificación
        </Button>
      </CardFooter>
    </Card>
  );
}
