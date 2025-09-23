import * as React from 'react';
import Link from 'next/link';

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  type CardProps
} from '@/components/ui/card';
import { Routes } from '@/constants/routes';

export function VerifyEmailSuccessCard(props: CardProps): React.JSX.Element {
  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Correo electrónico verificado</CardTitle>
        <CardDescription>
          Tu correo electrónico ha sido verificado. Ahora puedes iniciar sesión
          con tu cuenta.
        </CardDescription>
      </CardHeader>
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
