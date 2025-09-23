import * as React from 'react';

import { AnnotatedSection } from '@/components/ui/annotated';

export default function OrganizationDetailsLayout({
  children
}: React.PropsWithChildren): React.JSX.Element {
  return (
    <AnnotatedSection
      title="Detalles de la organización"
      description="Detalles básicos sobre tu organización."
    >
      {children}
    </AnnotatedSection>
  );
}
