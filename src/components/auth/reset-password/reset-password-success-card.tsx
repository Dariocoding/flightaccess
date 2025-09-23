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

export function ResetPasswordSuccessCard(props: CardProps): React.JSX.Element {
  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Contraseña actualizada</CardTitle>
        <CardDescription>
          Tu contraseña ha sido actualizada. Usa tu nueva contraseña para
          iniciar sesión.
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
