import * as React from 'react';

import { ApiKeysCard } from '@/app/dashboard/settings/components/organization/developers/api-keys-card';
import { getApiKeys } from '@/data/api-keys/get-api-keys';

export default async function ApiKeysPage(): Promise<React.JSX.Element> {
  const apiKeys = await getApiKeys();
  return <ApiKeysCard apiKeys={apiKeys} />;
}
