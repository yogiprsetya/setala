import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';

export const ProfileMenu = () => (
  <DropdownMenu>
    <DropdownMenuTrigger>
      <Avatar className="w-8 h-8">
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </DropdownMenuTrigger>

    <DropdownMenuContent>
      <DropdownMenuLabel>My Account</DropdownMenuLabel>

      <DropdownMenuSeparator />

      <DropdownMenuItem>Profile</DropdownMenuItem>
      <DropdownMenuItem>Subscription</DropdownMenuItem>

      <DropdownMenuSeparator />

      <DropdownMenuItem className="text-destructive">Logout</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);
