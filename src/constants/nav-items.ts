import {
  BellIcon,
  CodeIcon,
  CreditCardIcon,
  HomeIcon,
  LockKeyholeIcon,
  SettingsIcon,
  StoreIcon,
  UserIcon,
  UserPlus2Icon,
  UsersIcon
} from 'lucide-react';

import { Routes } from '@/constants/routes';
import type { NavItem } from '@/types/nav-item';

export const mainNavItems: NavItem[] = [
  {
    title: 'Inicio',
    href: Routes.Home,
    icon: HomeIcon
  },

  {
    title: 'Configuración',
    href: Routes.Settings,
    icon: SettingsIcon
  }
];

export const accountNavItems: NavItem[] = [
  {
    title: 'Perfil',
    href: Routes.Profile,
    icon: UserIcon
  },
  {
    title: 'Seguridad',
    href: Routes.Security,
    icon: LockKeyholeIcon
  },
  {
    title: 'Notificaciones',
    href: Routes.Notifications,
    icon: BellIcon
  }
];

export const organizationNavItems: NavItem[] = [
  {
    title: 'Información',
    href: Routes.OrganizationInformation,
    icon: StoreIcon
  },
  {
    title: 'Miembros',
    href: Routes.Members,
    icon: UserPlus2Icon
  }
  /*   {
    title: 'Billing',
    href: Routes.Billing,
    icon: CreditCardIcon
  },
  {
    title: 'Developers',
    href: Routes.Developers,
    icon: CodeIcon
  } */
];
