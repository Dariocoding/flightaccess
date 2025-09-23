import * as React from 'react';
import { type Metadata } from 'next';

import { AuthContainer } from '@/components/auth/auth-container';
import { TotpCodeCard } from '@/components/auth/totp/totp-code-card';
import { createTitle } from '@/lib/utils';
import type { NextPageProps } from '@/types/next-page-props';

type SearchParams = {
  token?: string;
  expiry?: string;
};

export const metadata: Metadata = {
  title: createTitle('Confirm via authenticator app')
};

export default async function TotpPage(
  props: NextPageProps & { searchParams: Promise<SearchParams> }
): Promise<React.JSX.Element> {
  const searchParams = await props.searchParams;
  if (!searchParams.token) {
    return <AuthContainer>Missing token param.</AuthContainer>;
  }
  if (!searchParams.expiry) {
    return <AuthContainer>Missing expiry param.</AuthContainer>;
  }

  return (
    <AuthContainer maxWidth="sm">
      <TotpCodeCard
        token={searchParams.token}
        expiry={searchParams.expiry}
      />
    </AuthContainer>
  );
}
