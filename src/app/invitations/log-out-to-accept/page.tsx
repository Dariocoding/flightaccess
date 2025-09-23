import * as React from 'react';
import { type Metadata } from 'next';
import { redirect } from 'next/navigation';
import { validate as uuidValidate } from 'uuid';

import { AuthContainer } from '@/components/auth/auth-container';
import { LogOutToAcceptCard } from '@/components/invitations/log-out-to-accept-card';
import { Routes } from '@/constants/routes';
import { dedupedAuth } from '@/lib/auth';
import { getBaseUrl } from '@/lib/urls/get-base-url';
import { createTitle } from '@/lib/utils';
import type { NextPageProps } from '@/types/next-page-props';

type SearchParams = {
  token?: string;
};

export const metadata: Metadata = {
  title: createTitle('Cerrar sesión para aceptar invitación')
};

export default async function LogOutToAcceptPage(
  props: NextPageProps & { searchParams: Promise<SearchParams> }
): Promise<React.JSX.Element> {
  const session = await dedupedAuth();
  if (!session) {
    const searchParams = await props.searchParams;
    return redirect(
      searchParams.token && uuidValidate(searchParams.token)
        ? `${getBaseUrl()}${Routes.InvitationRequest}/${searchParams.token}`
        : Routes.Root
    );
  }

  const searchParams = await props.searchParams;
  return (
    <AuthContainer maxWidth="sm">
      <LogOutToAcceptCard token={searchParams.token} />
    </AuthContainer>
  );
}
