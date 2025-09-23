import * as React from 'react';
import type { Metadata } from 'next';

import { createTitle } from '@/lib/utils';

import { SettingsSidebar } from './components/settings-sidebar';

export const metadata: Metadata = {
  title: createTitle('Settings')
};

export default function SettingsLayout({
  children
}: React.PropsWithChildren): React.JSX.Element {
  return (
    <div className="flex h-screen flex-row overflow-hidden">
      <SettingsSidebar />
      <div className="size-full">{children}</div>
    </div>
  );
}
