"use client";

import * as React from "react";
import { FileText, LogOut, Settings2 } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { logout } from "@/lib/supabase/actions";

export function NavActions() {
  const [isOpen, setIsOpen] = React.useState(false);

  const data = [
    [
      {
        label: "Settings",
        icon: Settings2,
      },
      {
        label: "Appearance",
        icon: FileText,
      },
    ],
    [
      {
        label: "Logout",
        icon: LogOut,
        onClick: logout,
      },
    ],
  ];

  return (
    <div className="flex items-center gap-2 text-sm">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Avatar className="h-8 w-8 rounded-lg cursor-pointer">
            {/* <AvatarImage src={user.avatar} alt={user.name} /> */}
            <AvatarFallback className="rounded-lg">CN</AvatarFallback>
          </Avatar>
        </PopoverTrigger>
        <PopoverContent
          className="w-56 overflow-hidden rounded-lg p-0"
          align="end"
        >
          <Sidebar collapsible="none" className="bg-transparent">
            <SidebarContent className="gap-0">
              {data.map((group, index) => (
                <SidebarGroup key={index} className="border-b last:border-none">
                  <SidebarGroupContent className="gap-0">
                    <SidebarMenu>
                      {group.map((item, index) => (
                        <SidebarMenuItem key={index}>
                          <SidebarMenuButton onClick={item.onClick}>
                            <item.icon /> <span>{item.label}</span>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
              ))}
            </SidebarContent>
          </Sidebar>
        </PopoverContent>
      </Popover>
    </div>
  );
}
