import 'server-only';

import { redirect } from 'next/navigation';

import { dedupedAuth } from '@/lib/auth';
import { getLoginRedirect } from '@/lib/auth/redirect';
import { checkSession } from '@/lib/auth/session';
import { prisma } from '@/lib/db/prisma';
import { NotFoundError } from '@/lib/validation/exceptions';
import type { WorkHoursDto } from '@/types/dtos/work-hours-dto';

export async function getBusinessHours(): Promise<WorkHoursDto[]> {
  const session = await dedupedAuth();
  if (!checkSession(session)) {
    return redirect(await getLoginRedirect());
  }

  return (async () => {
    const organization = await prisma.organization.findFirst({
      where: { id: session.user.organizationId },
      select: {
        name: true,
        address: true,
        phone: true,
        email: true,
        businessHours: {
          select: {
            dayOfWeek: true,
            timeSlots: {
              select: {
                id: true,
                start: true,
                end: true
              }
            }
          }
        }
      }
    });
    if (!organization) {
      throw new NotFoundError('Organization not found');
    }

    const response: WorkHoursDto[] = organization.businessHours.map(
      (workHours) => ({
        dayOfWeek: workHours.dayOfWeek,
        timeSlots: workHours.timeSlots.map((timeSlot) => ({
          id: timeSlot.id,
          start: timeSlot.start.toISOString(),
          end: timeSlot.end.toISOString()
        }))
      })
    );

    return response;
  })();
}
