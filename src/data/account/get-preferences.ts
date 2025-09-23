import 'server-only';

import { redirect } from 'next/navigation';

import { dedupedAuth } from '@/lib/auth';
import { getLoginRedirect } from '@/lib/auth/redirect';
import { checkSession } from '@/lib/auth/session';
import { prisma } from '@/lib/db/prisma';
import { NotFoundError } from '@/lib/validation/exceptions';
import type { PreferencesDto } from '@/types/dtos/preferences-dto';

export async function getPreferences(): Promise<PreferencesDto> {
  const session = await dedupedAuth();
  if (!checkSession(session)) {
    return redirect(await getLoginRedirect());
  }

  return (async () => {
    const userFromDb = await prisma.user.findFirstOrThrow({
      where: { id: session.user.id },
      select: {
        locale: true
      }
    });
    if (!userFromDb) {
      throw new NotFoundError('Usuario no encontrado');
    }

    const response: PreferencesDto = {
      locale: userFromDb.locale
    };

    return response;
  })();
}
