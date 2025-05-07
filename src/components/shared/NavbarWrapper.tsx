/**
 * NavbarWrapper - Server Component
 *
 * Conditionally renders either the authenticated user navbar or public navbar
 * based on the user's authentication status.
 */

import { isAuthenticated } from "@/lib/actions/auth.actions";
import { NavBar } from "./Navbar";
import { PublicNavbar } from "./PublicNavbar";
import { getDataWeb } from "@/services/static-data";
import {
  getUserLocaleOnServer,
  getUserRoleOnServer,
} from "@/lib/actions/getUserLocale.action";
import { Locale } from "@/i18n/config";

export async function NavbarWrapper() {
  const isAuth = await isAuthenticated();

  const [locale, userRole] = await Promise.all([
    getUserLocaleOnServer(),
    getUserRoleOnServer(),
  ]);

  const staticData = await getDataWeb({ userRole, locale: locale as Locale });

  return isAuth ? (
    <NavBar
      isNewVersion={staticData.isNewVersion}
      url={staticData.url}
      version={staticData.version}
    />
  ) : (
    <PublicNavbar
      isNewVersion={staticData.isNewVersion}
      url={staticData.url}
      version={staticData.version}
    />
  );
}
