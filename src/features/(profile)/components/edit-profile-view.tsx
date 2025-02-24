"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
export function EditProfileView() {
  const router = useRouter();

  const handleBack = () => {
    router.push("/profile");
  };

  return (
    <div className="w-full space-y-8">
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={handleBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <Button>Save Changes</Button>
      </div>

      <div className="space-y-6">
        {/* Profile Photo Section */}
        <div className="flex items-center gap-6">
          <Avatar className="h-20 w-20 sm:h-24 sm:w-24">
            <AvatarFallback>SC</AvatarFallback>
          </Avatar>
          <Button variant="outline">Change Photo</Button>
        </div>

        {/* Basic Information */}
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">Full Name</label>
              <Input defaultValue="Sarah Connor" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <Input defaultValue="sarah@example.com" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">About</label>
            <Textarea
              defaultValue="I am a software developer with a passion for building beautiful and functional web applications."
              className="min-h-[100px]"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Skills</label>
            <Input defaultValue="React, TypeScript, Node.js, Next.js, Tailwind CSS" />
            <p className="text-xs text-muted-foreground">
              Separate skills with commas
            </p>
          </div>
        </div>

        {/* Contact Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Contact Information</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">Phone</label>
              <Input defaultValue="+1 234 567 890" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">City</label>
              <Input defaultValue="San Francisco" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">State</label>
              <Input defaultValue="CA" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Country</label>
              <Input defaultValue="United States" />
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Social Links</h3>
          <div className="grid gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">LinkedIn</label>
              <Input placeholder="https://linkedin.com/in/..." />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">GitHub</label>
              <Input placeholder="https://github.com/..." />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
