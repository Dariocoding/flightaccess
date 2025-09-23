import * as React from 'react';
import Link from 'next/link';

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  type CardProps
} from '@/components/ui/card';
import { Routes } from '@/constants/routes';

export function InvitationAlreadyAcceptedCard(
  props: CardProps
): React.JSX.Element {
  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Invitación ya aceptada</CardTitle>
        <CardDescription>
          Si crees que has llegado a este mensaje por error, por favor habla con
          el administrador de tu equipo y pide que te inviten nuevamente. En
          caso de que tengas una cuenta, puedes intentar{' '}
          <Link
            href={Routes.Login}
            className="text-foreground underline"
          >
            iniciar sesión
          </Link>{' '}
          en su lugar.
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
