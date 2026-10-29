"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, User, X } from "lucide-react";
import { useState } from "react";
import { cn } from "cn";
import { authClient } from "@/lib/auth-client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button"





import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";


const navLinks = [
  { label: "Home", href: "/" },
  { label: "Destinations", href: "/destinations" },
  { label: "Add Destination", href: "/add-destination" },
  { label: "My Bookings", href: "/bookings" },
];

const authLinks = [
  { label: "Sign In", href: "/login" },
  { label: "Sign Up", href: "/signup" },
];

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  function isActive(href: string) {
    return href === "/" ? pathname === "/" : pathname.startsWith(href);
  }

 const {  data: session } = authClient.useSession() 
 const user = session?.user;


 const handleSignOut =() =>{
  authClient.signOut();
 }


  return (
    <header className="sticky top-0 z-30 bg-white ">
      <nav
        aria-label="Main navigation"
        className="flex h-16 items-center justify-between px-5 md:h-20 md:px-8"
      >
        <ul className="hidden items-center gap-10 lg:flex">
          {navLinks.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className={cn(
                  "relative inline-block py-2 text-sm font-medium tracking-wide text-neutral-900 transition-colors hover:text-brand",
                  isActive(link.href) &&
                    "text-brand after:absolute after:inset-x-0 after:bottom-0.5 after:h-0.5 after:bg-brand",
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          className="flex size-9 items-center justify-center rounded-full text-neutral-900 transition-colors hover:bg-neutral-100 lg:hidden"
        >
          {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>

        <Link href="/" aria-label="Wanderlast home">
          <Image
            src="/assets/Wanderlast.png"
            alt="Wanderlast"
            width={162}
            height={24}
            className="h-6 w-auto md:h-8"
          />
        </Link>

        <div className="hidden items-center justify-end gap-6 lg:flex">
          <Link
            href="/profile"
            className="flex items-center gap-1.5 text-sm font-medium tracking-wide text-neutral-900 transition-colors hover:text-brand"
          >
            <User className="size-4" />
            Profile
          </Link>

         {
          user? <Popover>
  <PopoverTrigger render={ <Avatar>
  <AvatarImage referrerPolicy="no-referrer" src={user?.image as string} />
  <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
</Avatar>}>
    Open Popover
  </PopoverTrigger>
  <PopoverContent>
    <PopoverHeader>
      <PopoverTitle>{user?.name}</PopoverTitle>
      <PopoverDescription><p>{user?.email}</p>
      <Button onClick={handleSignOut} variant="destructive">Signout</Button>
      </PopoverDescription>

    </PopoverHeader>
  </PopoverContent>
</Popover>:<>

     {authLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm font-medium tracking-wide text-neutral-900 transition-colors hover:text-brand"
            >
              {link.label}
            </Link>
          ))}

</>
         }



     
        </div>

        <Link
          href="#profile"
          aria-label="Profile"
          className="flex size-9 items-center justify-center rounded-full text-neutral-900 transition-colors hover:bg-neutral-100 lg:hidden"
        >
          <User className="size-5" />
        </Link>
      </nav>

      {menuOpen && (
        <div
          id="mobile-menu"
          className="border-t border-neutral-200 bg-white px-5 pb-5 lg:hidden"
        >
          <ul className="flex flex-col">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={cn(
                    "block border-b border-neutral-100 py-3 text-sm font-medium text-neutral-900",
                    isActive(link.href) && "text-brand",
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex items-center gap-6 text-sm font-medium text-neutral-900">
            <Link
              href="#profile"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-1.5 transition-colors hover:text-brand"
            >
              <User className="size-4" />
              Profile
            </Link>
            {authLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="transition-colors hover:text-brand"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
