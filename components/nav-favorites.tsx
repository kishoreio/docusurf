"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowUpRight, MoreHorizontal, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { getChats, renameChat, deleteChat } from "@/lib/supabase/actions";
import routes from "@/constants/routes";

export function NavFavorites() {
  const [chats, setChats] = useState<{ id: string; name: string }[]>([]);

  const { isMobile } = useSidebar();

  useEffect(() => {
    async function fetchChats() {
      const chats = await getChats();
      setChats(chats);
    }
    fetchChats();
  }, []);

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Chats</SidebarGroupLabel>
      <SidebarMenu>
        {chats.map((chat) => (
          <SidebarMenuItem key={chat.id}>
            <SidebarMenuButton asChild>
              <Link href={`${routes.chat.id}/${chat.id}`} title={chat.name}>
                <span>{chat.name}</span>
              </Link>
            </SidebarMenuButton>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuAction showOnHover>
                  <MoreHorizontal />
                  <span className="sr-only">More</span>
                </SidebarMenuAction>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-56 rounded-lg"
                side={isMobile ? "bottom" : "right"}
                align={isMobile ? "end" : "start"}
              >
                <DropdownMenuItem>
                  <ArrowUpRight className="text-neutral-500 dark:text-neutral-400" />
                  <span>Rename</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => deleteChat(chat.id)}>
                  <Trash2 className="text-neutral-500 dark:text-neutral-400" />
                  <span>Delete</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
