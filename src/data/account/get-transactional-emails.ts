import 'server-only';

import { redirect } from 'next/navigation';

import { dedupedAuth } from '@/lib/auth';
import { getLoginRedirect } from '@/lib/auth/redirect';
import { checkSession } from '@/lib/auth/session';
import { prisma } from '@/lib/db/prisma';
import { NotFoundError } from '@/lib/validation/exceptions';
import type { TransactionalEmailsDto } from '@/types/dtos/transactional-emails-dto';

export async function getTransactionalEmails(): Promise<TransactionalEmailsDto> {
  const session = await dedupedAuth();
  if (!checkSession(session)) {
    return redirect(await getLoginRedirect());
  }

  return (async () => {
    const userFromDb = await prisma.user.findFirstOrThrow({
      where: { id: session.user.id },
      select: {
        enabledContactsNotifications: true,
        enabledInboxNotifications: true,
        enabledWeeklySummary: true
      }
    });
    if (!userFromDb) {
      throw new NotFoundError('Usuario no encontrado');
    }

    const response: TransactionalEmailsDto = {
      enabledContactsNotifications: userFromDb.enabledContactsNotifications,
      enabledInboxNotifications: userFromDb.enabledInboxNotifications,
      enabledWeeklySummary: userFromDb.enabledWeeklySummary
    };

    return response;
  })();
}
