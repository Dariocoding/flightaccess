import * as React from 'react';
import { type Metadata } from 'next';

import { AuthContainer } from '@/components/auth/auth-container';
import { VerifyEmailCard } from '@/components/auth/verify-email/verify-email-card';
import { createTitle } from '@/lib/utils';
import type { NextPageProps } from '@/types/next-page-props';

export const metadata: Metadata = {
  title: createTitle('Verificar correo electrónico')
};

export default async function VerifyEmailPage(
  props: NextPageProps & { searchParams: Promise<{ email: string }> }
): Promise<React.JSX.Element> {
  const searchParams = await props.searchParams;
  const email = searchParams.email as string;
  return (
    <AuthContainer maxWidth="sm">
      <VerifyEmailCard email={email} />
    </AuthContainer>
  );
}
