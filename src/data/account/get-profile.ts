import 'server-only';

import { redirect } from 'next/navigation';

import { dedupedAuth } from '@/lib/auth';
import { getLoginRedirect } from '@/lib/auth/redirect';
import { checkSession } from '@/lib/auth/session';
import { prisma } from '@/lib/db/prisma';
import { NotFoundError } from '@/lib/validation/exceptions';
import type { ProfileDto } from '@/types/dtos/profile-dto';

export async function getProfile(): Promise<ProfileDto> {
  const session = await dedupedAuth();
  if (!checkSession(session)) {
    return redirect(await getLoginRedirect());
  }

  return (async () => {
    const userFromDb = await prisma.user.findFirstOrThrow({
      where: { id: session.user.id },
      select: {
        id: true,
        image: true,
        name: true,
        email: true,
        role: true,
        locale: true
      }
    });
    if (!userFromDb) {
      throw new NotFoundError('Usuario no encontrado');
    }

    const response: ProfileDto = {
      id: userFromDb.id,
      image: userFromDb.image ?? undefined,
      name: userFromDb.name,
      email: userFromDb.email ?? undefined,
      role: userFromDb.role,
      locale: userFromDb.locale
    };

    return response;
  })();
}
