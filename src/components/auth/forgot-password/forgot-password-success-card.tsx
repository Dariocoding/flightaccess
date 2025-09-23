import * as React from 'react';
import Link from 'next/link';
import { InfoIcon } from 'lucide-react';

import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  type CardProps
} from '@/components/ui/card';
import { Routes } from '@/constants/routes';

export type ForgotPasswordSuccessCardProps = CardProps & {
  email: string;
};

export function ForgotPasswordSuccessCard({
  email,
  ...other
}: ForgotPasswordSuccessCardProps): React.JSX.Element {
  return (
    <Card {...other}>
      <CardHeader>
        <CardTitle>Instrucciones de restablecimiento enviadas</CardTitle>
        <CardDescription>
          Un correo electrónico con un enlace y instrucciones de
          restablecimiento está en camino a{' '}
          <strong className="text-foreground">{email}</strong>.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Alert variant="info">
          <div className="flex flex-row items-start gap-2">
            <InfoIcon className="mt-0.5 size-[18px] shrink-0" />
            <AlertDescription>
              Si no recibes un correo electrónico pronto, verifica que el correo
              electrónico que ingresaste es correcto, revisa tu carpeta de spam
              o contacta al soporte si el problema persiste.
            </AlertDescription>
          </div>
        </Alert>
      </CardContent>
      <CardFooter className="flex justify-center text-sm">
        <Link
          href={Routes.Login}
          className="text-foreground underline"
        >
          Volver a iniciar sesión
        </Link>
      </CardFooter>
    </Card>
  );
}
