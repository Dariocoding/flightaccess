import * as React from 'react';
import Link from 'next/link';
import { AlertCircleIcon } from 'lucide-react';

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

export type AuthErrorCardProps = CardProps & {
  errorMessage: string;
};

export function AuthErrorCard({
  errorMessage,
  ...other
}: AuthErrorCardProps): React.JSX.Element {
  return (
    <Card {...other}>
      <CardHeader>
        <CardTitle>Error de autenticación</CardTitle>
        <CardDescription>
          Ocurrió un error al iniciar sesión. Regresa a la pantalla de inicio de
          sesión y vuelve a intentarlo.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Alert variant="destructive">
          <div className="flex flex-row items-center gap-2 text-sm">
            <AlertCircleIcon className="size-[18px] shrink-0" />
            <AlertDescription>{errorMessage}</AlertDescription>
          </div>
        </Alert>
      </CardContent>
      <CardFooter className="flex justify-center text-sm">
        <Link
          href={Routes.Login}
          className="text-muted-foreground underline"
        >
          Volver a iniciar sesión
        </Link>
      </CardFooter>
    </Card>
  );
}
