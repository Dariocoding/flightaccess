import 'server-only';

import { redirect } from 'next/navigation';

import { dedupedAuth } from '@/lib/auth';
import { getLoginRedirect } from '@/lib/auth/redirect';
import { checkSession } from '@/lib/auth/session';
import { prisma } from '@/lib/db/prisma';
import { NotFoundError } from '@/lib/validation/exceptions';
import type { PersonalDetailsDto } from '@/types/dtos/personal-details-dto';

export async function getPersonalDetails(): Promise<PersonalDetailsDto> {
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
        phone: true,
        email: true,
        role: true
      }
    });
    if (!userFromDb) {
      throw new NotFoundError('Usuario no encontrado');
    }

    const response: PersonalDetailsDto = {
      id: userFromDb.id,
      image: userFromDb.image ?? undefined,
      name: userFromDb.name,
      phone: userFromDb.phone ?? undefined,
      email: userFromDb.email ?? undefined
    };

    return response;
  })();
}
