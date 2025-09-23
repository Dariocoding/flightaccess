'use client';

import * as React from 'react';
import { ChevronLeftIcon, MenuIcon } from 'lucide-react';
import { PiAirplaneTiltBold } from 'react-icons/pi';

import { MainNav } from '@/components/dashboard/main-nav';
import { SupportNav } from '@/components/dashboard/support-nav';
import { UserDropdown } from '@/components/dashboard/user-dropdown';
import { Button } from '@/components/ui/button';
import { FillRemainingSpace } from '@/components/ui/fill-remaining-space';
import { ScrollArea } from '@/components/ui/scroll-area';
import { AppInfo } from '@/constants/app-info';
import { MediaQueries } from '@/constants/media-queries';
import { useMediaQuery } from '@/hooks/use-media-query';
import { cn } from '@/lib/utils';
import type { ProfileDto } from '@/types/dtos/profile-dto';

export type SidebarProps = {
  profile: ProfileDto;
};

export function Sidebar({ profile }: SidebarProps): React.JSX.Element {
  const lgUp = useMediaQuery(MediaQueries.LgUp, { ssr: true, fallback: true });
  const xlUp = useMediaQuery(MediaQueries.XlUp, { ssr: true, fallback: true });
  const [showFullSidebar, setShowFullSidebar] = React.useState<boolean>(true);
  const isCollapsed = !xlUp || !showFullSidebar;
  const showLogo = !xlUp || showFullSidebar;
  const hideWordmark = !xlUp;
  const showSidebarToggle = xlUp;

  const sidebarWidth = React.useMemo(() => {
    if (!lgUp) return '0px';
    return isCollapsed ? '64px' : '240px';
  }, [lgUp, isCollapsed]);

  React.useEffect(() => {
    document.documentElement.style.setProperty('--sidebar-width', sidebarWidth);
  }, [lgUp, sidebarWidth]);

  return (
    <ScrollArea className="hidden lg:block">
      <div
        className="flex h-screen flex-col gap-4 border-r px-3 pb-4"
        style={{ width: sidebarWidth, maxWidth: sidebarWidth }}
      >
        {/* Decorative background elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5" />
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white/20 to-transparent" />
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-2xl" />
        <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-gradient-to-tr from-pink-400/10 to-orange-400/10 rounded-full blur-xl" />

        {/* Content */}
        <div className="relative z-10 flex h-full flex-col gap-4">
          <SidebarHeader
            showLogo={showLogo}
            hideWordmark={hideWordmark}
            showSidebarToggle={showSidebarToggle}
            showFullSidebar={showFullSidebar}
            isCollapsed={isCollapsed}
            onChangeShowFullSidebar={setShowFullSidebar}
          />
          <SidebarContent>
            <MainNav isCollapsed={isCollapsed} />
            <FillRemainingSpace />
            <SupportNav
              profile={profile}
              isCollapsed={isCollapsed}
            />
          </SidebarContent>
          <SidebarFooter>
            <UserDropdown
              profile={profile}
              isCollapsed={isCollapsed}
            />
          </SidebarFooter>
        </div>
      </div>
    </ScrollArea>
  );
}

type SidebarHeader = React.PropsWithChildren<{
  showLogo: boolean;
  hideWordmark: boolean;
  showSidebarToggle: boolean;
  showFullSidebar: boolean;
  isCollapsed: boolean;
  onChangeShowFullSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}>;
function SidebarHeader({
  showLogo,
  hideWordmark,
  showSidebarToggle,
  showFullSidebar,
  isCollapsed,
  onChangeShowFullSidebar
}: SidebarHeader): React.JSX.Element {
  const handleToggleSidebar = (): void => {
    onChangeShowFullSidebar((prev) => !prev);
  };
  return (
    <div
      className={cn(
        'flex h-16 shrink-0 items-center transition-all duration-300',
        isCollapsed
          ? 'w-9 min-w-9 max-w-9 justify-center'
          : 'w-full justify-between pl-0.5'
      )}
    >
      {showLogo && (
        <div className="flex items-center gap-2 group">
          <div className="relative">
            <PiAirplaneTiltBold className="size-6 text-blue-600 animate-pulse" />
            <div className="absolute inset-0 bg-blue-400/20 rounded-full blur-sm animate-ping" />
          </div>
          <span className="text-lg font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient-x">
            {AppInfo.APP_NAME || 'FlightAccess'}
          </span>
        </div>
      )}
      {showSidebarToggle && (
        <Button
          type="button"
          size="icon"
          variant="ghost"
          className="size-9 max-h-9 min-h-9 min-w-9 max-w-9 shrink-0 items-center justify-center rounded-full text-muted-foreground group-hover:text-foreground"
          title={showFullSidebar ? 'Collapse' : 'Open'}
          onClick={handleToggleSidebar}
        >
          {showFullSidebar ? (
            <ChevronLeftIcon className="size-4 shrink-0" />
          ) : (
            <MenuIcon className="size-4 shrink-0" />
          )}
        </Button>
      )}
    </div>
  );
}

type SidebarContentProps = React.PropsWithChildren;
function SidebarContent(props: SidebarContentProps): React.JSX.Element {
  return (
    <div className="flex flex-1 flex-col gap-7 pt-3">{props.children}</div>
  );
}

type SidebarFooterProps = React.PropsWithChildren;
function SidebarFooter({ children }: SidebarFooterProps): React.JSX.Element {
  return <div className="flex w-full shrink-0 flex-col">{children}</div>;
}
