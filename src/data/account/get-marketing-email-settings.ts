import 'server-only';

import { redirect } from 'next/navigation';

import { dedupedAuth } from '@/lib/auth';
import { getLoginRedirect } from '@/lib/auth/redirect';
import { checkSession } from '@/lib/auth/session';
import { prisma } from '@/lib/db/prisma';
import { NotFoundError } from '@/lib/validation/exceptions';
import type { MarketingEmailsDto } from '@/types/dtos/marketing-emails-dto';

export async function getMarketingEmailSettings(): Promise<MarketingEmailsDto> {
  const session = await dedupedAuth();
  if (!checkSession(session)) {
    return redirect(await getLoginRedirect());
  }

  return (async () => {
    const userFromDb = await prisma.user.findFirstOrThrow({
      where: { id: session.user.id },
      select: {
        enabledNewsletter: true,
        enabledProductUpdates: true
      }
    });
    if (!userFromDb) {
      throw new NotFoundError('Usuario no encontrado');
    }

    const response: MarketingEmailsDto = {
      enabledNewsletter: userFromDb.enabledNewsletter,
      enabledProductUpdates: userFromDb.enabledProductUpdates
    };

    return response;
  })();
}
