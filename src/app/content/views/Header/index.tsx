import { useState, type FC } from 'react'
import { Globe2Icon } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/HoverCard'
import { Button } from '@/components/ui/Button'
import { cn, getSiteInfo } from '@/utils'
import { useRemeshDomain, useRemeshQuery } from 'remesh-react'
import RoomDomain from '@/domain/Room'
import { ScrollArea } from '@/components/ui/ScrollArea'
import { Virtuoso } from 'react-virtuoso'

const Header: FC = () => {
  const siteInfo = getSiteInfo()
  const roomDomain = useRemeshDomain(RoomDomain())
  const userList = useRemeshQuery(roomDomain.query.UserListQuery())
  const onlineCount = userList.length

  const [scrollParentRef, setScrollParentRef] = useState<HTMLDivElement | null>(null)

  return (
    <div className="z-10 grid h-12 grid-flow-col grid-cols-[theme('spacing.20')_auto_theme('spacing.20')] items-center justify-between rounded-t-xl bg-white px-4 backdrop-blur-lg dark:bg-slate-950">
      <Avatar className="size-8">
        <AvatarImage src={siteInfo.icon} alt="favicon" />
        <AvatarFallback>
          <Globe2Icon size="100%" className="text-gray-400" />
        </AvatarFallback>
      </Avatar>
      <HoverCard>
        <HoverCardTrigger asChild>
          <Button className="overflow-hidden p-2" variant="link">
            <span className="truncate text-lg font-semibold text-slate-600 dark:text-slate-50">
              {siteInfo.hostname.replace(/^www\./i, '')}
            </span>
          </Button>
        </HoverCardTrigger>
        <HoverCardContent className="w-80 rounded-lg">
          <div className="grid grid-cols-[auto_1fr] gap-x-4">
            <Avatar className="size-14">
              <AvatarImage src={siteInfo.icon} alt="favicon" />
              <AvatarFallback>
                <Globe2Icon size="100%" className="text-gray-400" />
              </AvatarFallback>
            </Avatar>
            <div className="grid items-center">
              <h4 className="truncate text-sm font-semibold">{siteInfo.title}</h4>
              {siteInfo.description && (
                <p className="line-clamp-2 max-h-8 text-xs text-slate-500 dark:text-slate-300">
                  {siteInfo.description}
                </p>
              )}
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>
      <HoverCard>
        <HoverCardTrigger asChild>
          <Button className="p-0" variant="link">
            <div className="flex items-center gap-x-1 text-nowrap text-xs text-slate-500">
              <span className="relative flex size-2">
                <span
                  className={cn(
                    'absolute inline-flex size-full animate-ping rounded-full opacity-75',
                    onlineCount > 1 ? 'bg-green-400' : 'bg-orange-400'
                  )}
                ></span>
                <span
                  className={cn(
                    'relative inline-flex size-2 rounded-full',
                    onlineCount > 1 ? 'bg-green-500' : 'bg-orange-500'
                  )}
                ></span>
              </span>
              <span className="dark:text-slate-50">ONLINE {onlineCount > 99 ? '99+' : onlineCount}</span>
            </div>
          </Button>
        </HoverCardTrigger>
        <HoverCardContent className="w-36 rounded-lg p-0">
          <ScrollArea className="max-h-[204px] min-h-9 p-1" ref={setScrollParentRef}>
            <Virtuoso
              data={userList}
              defaultItemHeight={28}
              customScrollParent={scrollParentRef!}
              itemContent={(index, user) => (
                <div className={cn('flex  items-center gap-x-2 rounded-md px-2 py-1.5 outline-none')}>
                  <Avatar className="size-4 shrink-0">
                    <AvatarImage className="size-full" src={user.userAvatar} alt="avatar" />
                    <AvatarFallback>{user.username.at(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 truncate text-xs text-slate-500 dark:text-slate-50">{user.username}</div>
                </div>
              )}
            ></Virtuoso>
          </ScrollArea>
        </HoverCardContent>
      </HoverCard>
    </div>
  )
}

Header.displayName = 'Header'

export default Header
