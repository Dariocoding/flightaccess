'use client';

import { useRouter } from 'next/navigation';
import NiceModal, { type NiceModalHocProps } from '@ebay/nice-modal-react';
import { FormProvider, type SubmitHandler } from 'react-hook-form';
import { toast } from 'sonner';

import { deleteAccount } from '@/actions/account/delete-account';
import { logOut } from '@/actions/auth/log-out';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { DialogFooter } from '@/components/ui/dialog';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle
} from '@/components/ui/drawer';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel
} from '@/components/ui/form';
import { MediaQueries } from '@/constants/media-queries';
import { Routes } from '@/constants/routes';
import { useEnhancedModal } from '@/hooks/use-enhanced-modal';
import { useMediaQuery } from '@/hooks/use-media-query';
import { useZodForm } from '@/hooks/use-zod-form';
import { cn } from '@/lib/utils';
import {
  deleteAccountSchema,
  type DeleteAccountSchema
} from '@/schemas/account/delete-account-schema';

export type DeleteAccountModalProps = NiceModalHocProps;

export const DeleteAccountModal = NiceModal.create<DeleteAccountModalProps>(
  () => {
    const modal = useEnhancedModal();
    const router = useRouter();
    const mdUp = useMediaQuery(MediaQueries.MdUp, { ssr: false });
    const methods = useZodForm({
      schema: deleteAccountSchema,
      mode: 'all'
    });
    const title = '¿Eliminar cuenta?';
    const description =
      'Por favor, confirma que entiendes lo que estás haciendo marcando la casilla de abajo.';
    const canSubmit =
      !methods.formState.isSubmitting && methods.watch('statement') === true;
    const onSubmit: SubmitHandler<DeleteAccountSchema> = async () => {
      if (!canSubmit) {
        return;
      }
      const result = await deleteAccount();
      if (result) {
        if (!result.serverError && !result.validationErrors) {
          toast.success('Cuenta eliminada');
          modal.handleClose();
          const result = await logOut({ redirect: false });
          if (!result?.serverError && !result?.validationErrors) {
            router.push(Routes.Login);
          } else {
            toast.error('No se pudo cerrar sesión');
          }
        } else {
          toast.error('No se pudo eliminar la cuenta');
        }
      }
    };
    const renderForm = (
      <form
        className={cn('text-sm leading-relaxed', !mdUp && 'px-4')}
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        <FormField
          control={methods.control}
          name="statement"
          render={({ field }) => (
            <FormItem className="mx-1 mb-4 flex flex-row items-center gap-3">
              <FormControl>
                <Checkbox
                  checked={field.value === true}
                  onCheckedChange={(checked) =>
                    field.onChange(checked === true ? true : undefined)
                  }
                  disabled={methods.formState.isSubmitting}
                />
              </FormControl>
              <FormLabel className="leading-2 cursor-pointer">
                No podré acceder a la organización y sus datos nuevamente.
              </FormLabel>
            </FormItem>
          )}
        />
      </form>
    );
    const renderButtons = (
      <>
        <Button
          type="button"
          variant="outline"
          onClick={modal.handleClose}
        >
          Cancelar
        </Button>
        <Button
          type="button"
          variant="destructive"
          disabled={!canSubmit}
          loading={methods.formState.isSubmitting}
          onClick={methods.handleSubmit(onSubmit)}
        >
          Eliminar
        </Button>
      </>
    );
    return (
      <FormProvider {...methods}>
        {mdUp ? (
          <AlertDialog open={modal.visible}>
            <AlertDialogContent
              className="max-w-sm"
              onClose={modal.handleClose}
              onAnimationEndCapture={modal.handleAnimationEndCapture}
            >
              <AlertDialogHeader>
                <AlertDialogTitle>{title}</AlertDialogTitle>
                <AlertDialogDescription>{description}</AlertDialogDescription>
              </AlertDialogHeader>
              {renderForm}
              <DialogFooter>{renderButtons}</DialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        ) : (
          <Drawer
            open={modal.visible}
            onOpenChange={modal.handleOpenChange}
          >
            <DrawerContent>
              <DrawerHeader className="text-left">
                <DrawerTitle>{title}</DrawerTitle>
                <DrawerDescription>{description}</DrawerDescription>
              </DrawerHeader>
              {renderForm}
              <DrawerFooter className="flex-col-reverse pt-4">
                {renderButtons}
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        )}
      </FormProvider>
    );
  }
);
