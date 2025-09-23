import { headers } from 'next/headers';

/**
 * Obtiene la ruta actual de la aplicación
 * @returns La ruta actual normalizada o null si no se puede determinar
 */
export async function getPathname(): Promise<string | null> {
  try {
    const headersList = await headers();
    const pathname = headersList.get('x-pathname');

    if (!pathname) {
      return null;
    }

    return pathname;
  } catch (error) {
    console.error('Error al obtener el pathname:', error);
    return null;
  }
}
