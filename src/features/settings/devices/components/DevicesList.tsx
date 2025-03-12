/**
 * DevicesList - Component for displaying the list of devices
 *
 * Server component that renders a table of user devices with
 * device name, last login date, IP address, and actions.
 */

import { MOCK_USER_DEVICES } from "@/core/mockData/user-devices";
import { DevicesTable } from "./DevicesTable";

export function DevicesList() {
  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <DevicesTable devices={MOCK_USER_DEVICES} />
      </div>
    </div>
  );
}
