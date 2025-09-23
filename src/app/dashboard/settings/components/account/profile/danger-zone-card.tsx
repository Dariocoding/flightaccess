'use client';

import * as React from 'react';
import NiceModal from '@ebay/nice-modal-react';

import { DeleteAccountModal } from '@/app/dashboard/settings/components/account/profile/delete-account-modal';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  type CardProps
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export function DangerZoneCard(props: CardProps): React.JSX.Element {
  const handleShowDeleteAccountModal = (): void => {
    NiceModal.show(DeleteAccountModal);
  };
  return (
    <Card {...props}>
      <CardContent className="pt-6">
        <p className="text-sm font-normal text-muted-foreground">
          Eliminar tu cuenta es irreversible. Todos tus datos serán eliminados
          permanentemente de nuestros servidores.
        </p>
      </CardContent>
      <Separator />
      <CardFooter className="flex w-full justify-end pt-6">
        <Button
          type="button"
          variant="destructive"
          size="default"
          onClick={handleShowDeleteAccountModal}
        >
          Eliminar cuenta
        </Button>
      </CardFooter>
    </Card>
  );
}
