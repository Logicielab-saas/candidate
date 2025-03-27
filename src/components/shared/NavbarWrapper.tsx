/**
 * NavbarWrapper - Server Component
 *
 * Conditionally renders either the authenticated user navbar or public navbar
 * based on the user's authentication status.
 */

import { isAuthenticated } from "@/lib/actions/auth.actions";
import { NavBar } from "./Navbar";
import { PublicNavbar } from "./PublicNavbar";

export async function NavbarWrapper() {
  const isAuth = await isAuthenticated();

  return isAuth ? <NavBar /> : <PublicNavbar />;
}
