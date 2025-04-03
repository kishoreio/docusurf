"use client";

import * as React from "react";
import Link from "next/link";
import { Command, MessageCirclePlus } from "lucide-react";
import { NavFavorites } from "@/components/nav-favorites";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import routes from "@/constants/routes";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar className="border-r-0" {...props}>
      <SidebarHeader>
        <div className="w-fit flex items-center gap-2">
          <div className="flex aspect-square size-5 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground">
            <Command className="size-3" />
          </div>
          <span className="truncate font-semibold">Docusurf AI</span>
        </div>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href={routes.chat.new} title="Start a new chat">
                <MessageCirclePlus />
                <span>Start a new chat</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavFavorites />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
