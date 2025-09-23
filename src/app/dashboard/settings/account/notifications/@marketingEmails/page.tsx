import * as React from 'react';

import { MarketingEmailsCard } from '@/app/dashboard/settings/components/account/notifications/marketing-emails-card';
import { getMarketingEmailSettings } from '@/data/account/get-marketing-email-settings';

export default async function MarketingEmailsPage(): Promise<React.JSX.Element> {
  const settings = await getMarketingEmailSettings();
  return <MarketingEmailsCard settings={settings} />;
}
