import { getPathname } from '@/lib/network/get-pathname';

export async function getLoginRedirect(): Promise<string> {
  const callbackUrl = await getPathname();

  return callbackUrl
    ? `/api/auth/signin?${new URLSearchParams({ callbackUrl })}`
    : '/api/auth/signin';
}
