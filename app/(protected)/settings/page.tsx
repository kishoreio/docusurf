"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

import { useState } from "react";

export default function SettingsPage() {
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    // Save user information logic here
    console.log("Saving user information:", user);
  };

  const handleDeleteChats = () => {
    // Delete all chats logic here
    console.log("Deleting all chats");
  };

  const handleDeleteAccount = () => {
    // Delete account logic here
    console.log("Deleting account");
  };

  return (
    <div className="container max-w-2xl py-10">
      <Card>
        <CardHeader>
          <CardTitle>Settings</CardTitle>
          <CardDescription>
            Manage your account settings and preferences.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSave}>
            <div className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={user.name}
                  onChange={handleChange}
                />
              </div>

              <div className="grid gap-3">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={user.email}
                  onChange={handleChange}
                />
              </div>

              <Button type="submit">Save Changes</Button>
            </div>
          </form>
          <Separator className="my-8" />
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-destructive">
                Danger Zone
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                Destructive actions that cannot be undone.
              </p>
            </div>
            <div className="grid gap-4">
              <Button
                variant="outline"
                className="border-destructive text-destructive hover:bg-destructive/10"
              >
                Delete All Chats
              </Button>
              <Button variant="destructive">Delete Account</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
