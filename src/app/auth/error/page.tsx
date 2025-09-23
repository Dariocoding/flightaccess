import * as React from 'react';
import { type Metadata } from 'next';

import { AuthContainer } from '@/components/auth/auth-container';
import { AuthErrorCard } from '@/components/auth/error/auth-error-card';
import { AuthErrorCode, authErrorMessages } from '@/lib/auth/errors';
import { createTitle } from '@/lib/utils';
import type { NextPageProps } from '@/types/next-page-props';

export const metadata: Metadata = {
  title: createTitle('Auth Error')
};

export default async function AuthErrorPage(
  props: NextPageProps & { searchParams: Promise<{ error: string }> }
): Promise<React.JSX.Element> {
  const searchParams = await props.searchParams;
  const error = searchParams.error as string;
  const errorMessage =
    error in authErrorMessages
      ? authErrorMessages[error as AuthErrorCode]
      : authErrorMessages[AuthErrorCode.UnknownError];
  return (
    <AuthContainer maxWidth="sm">
      <AuthErrorCard errorMessage={errorMessage} />
    </AuthContainer>
  );
}
