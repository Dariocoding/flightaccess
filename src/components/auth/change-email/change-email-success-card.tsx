import * as React from 'react';
import Link from 'next/link';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  type CardProps
} from '@/components/ui/card';
import { Routes } from '@/constants/routes';

export type ChangeEmailSuccessCardProps = CardProps & {
  email: string;
};

export function ChangeEmailSuccessCard({
  email,
  ...other
}: ChangeEmailSuccessCardProps): React.JSX.Element {
  return (
    <Card {...other}>
      <CardHeader>
        <CardTitle className="text-xl">Correo electrónico cambiado</CardTitle>
        <CardDescription>
          Tu correo electrónico ha sido cambiado a <strong>{email}</strong>.
          Como resultado, has sido desconectado y debes iniciar sesión
          nuevamente.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-center text-sm text-muted-foreground">
          <Link
            href={Routes.Login}
            className="text-foreground underline"
          >
            Ir a iniciar sesión
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
