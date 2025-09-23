import 'server-only';

import { redirect } from 'next/navigation';
import { InvitationStatus } from '@prisma/client';

import { dedupedAuth } from '@/lib/auth';
import { getLoginRedirect } from '@/lib/auth/redirect';
import { checkSession } from '@/lib/auth/session';
import { prisma } from '@/lib/db/prisma';
import type { InvitationDto } from '@/types/dtos/invitation-dto';
import { SortDirection } from '@/types/sorty-direction';

export async function getInvitations(): Promise<InvitationDto[]> {
  const session = await dedupedAuth();
  if (!checkSession(session)) {
    return redirect(await getLoginRedirect());
  }

  return (async () => {
    const invitations = await prisma.invitation.findMany({
      where: {
        organizationId: session.user.organizationId,
        NOT: { status: { equals: InvitationStatus.ACCEPTED } }
      },
      select: {
        id: true,
        token: true,
        status: true,
        email: true,
        role: true,
        createdAt: true,
        lastSentAt: true
      },
      orderBy: {
        createdAt: SortDirection.Asc
      }
    });

    const response: InvitationDto[] = invitations.map((invitation) => ({
      id: invitation.id,
      token: invitation.token,
      status: invitation.status,
      email: invitation.email,
      role: invitation.role,
      lastSent: invitation.lastSentAt ?? undefined,
      dateAdded: invitation.createdAt
    }));

    return response;
  })();
}
