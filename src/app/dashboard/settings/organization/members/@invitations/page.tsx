import * as React from 'react';

import { InvitationsCard } from '@/app/dashboard/settings/components/organization/members/invitations-card';
import { getProfile } from '@/data/account/get-profile';
import { getInvitations } from '@/data/invitations/get-invitations';

export default async function InvitationsPage(): Promise<React.JSX.Element> {
  const [profile, invitations] = await Promise.all([
    getProfile(),
    getInvitations()
  ]);
  return (
    <InvitationsCard
      profile={profile}
      invitations={invitations}
    />
  );
}
