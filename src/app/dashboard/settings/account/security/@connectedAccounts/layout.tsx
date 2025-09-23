import * as React from 'react';

import { PasswordLoginHint } from '@/app/dashboard/settings/components/account/security/password-login-hint';
import { AnnotatedSection } from '@/components/ui/annotated';

export default function ConnectedAccountsLayout({
  children
}: React.PropsWithChildren): React.JSX.Element {
  return (
    <>
      <AnnotatedSection
        title="Cuentas conectadas"
        description="Inicia sesión más rápido a tu cuenta vinculándola a Google o Microsoft."
      >
        {children}
      </AnnotatedSection>
      <PasswordLoginHint />
    </>
  );
}
