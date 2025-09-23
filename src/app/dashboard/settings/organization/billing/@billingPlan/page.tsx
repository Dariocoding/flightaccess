import * as React from 'react';

import { BillingPlanCard } from '@/app/dashboard/settings/components/organization/billing/billing-plan-card';
import { getBillingPlan } from '@/data/billing/get-billing-plan';

export default async function BillingPlanPage(): Promise<React.JSX.Element> {
  const plan = await getBillingPlan();
  return <BillingPlanCard plan={plan} />;
}
