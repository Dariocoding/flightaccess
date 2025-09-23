import * as React from 'react';
import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { Routes } from '@/constants/routes';
import { dedupedAuth } from '@/lib/auth';
import { getPathname } from '@/lib/network/get-pathname';
import { createTitle } from '@/lib/utils';

export const metadata: Metadata = {
  title: createTitle('Auth')
};

async function isChangeEmailRoute(): Promise<boolean> {
  const pathname = await getPathname();
  return !!pathname && pathname.startsWith(Routes.ChangeEmail);
}

export default async function AuthLayout({
  children
}: React.PropsWithChildren): Promise<React.JSX.Element> {
  const session = await dedupedAuth();
  if (!(await isChangeEmailRoute()) && session) {
    return redirect(Routes.Home);
  }
  return (
    <div>
      <main className="flex flex-col items-center justify-center">
        {children}
      </main>
    </div>
  );
}
