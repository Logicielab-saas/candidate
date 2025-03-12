/**
 * DevicesTable - Component for displaying devices in a table format
 *
 * Client component that renders a table of devices with
 * device information and logout actions.
 *
 * Props:
 * - devices: Array of UserDevice objects to display
 */

"use client";

import { UserDevice } from "@/core/interfaces/user-device.interface";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { LogOut } from "lucide-react";

interface DevicesTableProps {
  devices: UserDevice[];
}

export function DevicesTable({ devices }: DevicesTableProps) {
  const { toast } = useToast();

  const handleLogout = (_deviceId: string) => {
    // Here you would typically call an API to log out the device
    toast({
      title: "Appareil déconnecté",
      description: "L'appareil a été déconnecté avec succès.",
    });
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Appareil</TableHead>
          <TableHead>Date de connexion</TableHead>
          <TableHead>Adresse IP</TableHead>
          <TableHead className="text-center">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {devices.map((device) => (
          <TableRow key={device.id}>
            <TableCell className="font-medium">
              <div className="flex items-center gap-2">
                {device.name}
                {device.isCurrentDevice && (
                  <Badge variant="default" className="text-xs">
                    Appareil actuel
                  </Badge>
                )}
              </div>
            </TableCell>
            <TableCell>
              {format(new Date(device.lastLogin), "d MMMM yyyy", {
                locale: fr,
              })}
            </TableCell>
            <TableCell>
              <span className="text-muted-foreground">
                {device.ipAddress.ip}
              </span>{" "}
              • {device.ipAddress.city}
            </TableCell>
            <TableCell className="flex justify-center">
              {!device.isCurrentDevice ? (
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-primaryHex-700 hover:text-primaryHex-500"
                  onClick={() => handleLogout(device.id)}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Déconnexion
                </Button>
              ) : (
                <Badge variant="default" className="text-xs text-center">
                  Appareil actuel
                </Badge>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
