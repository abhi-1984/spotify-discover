import { SpotifyLogo } from "./Icons";
import { signOut, useSession } from "next-auth/react";
import * as Avatar from "@radix-ui/react-avatar";
import Link from "next/link";

function Nav() {
  const { data: session } = useSession();

  const avatar = session?.user?.image;

  return (
    <nav className="p-6 w-full">
      <div className="wrapper mx-auto flex items-center justify-between">
        <Link href="/">
          <a>
            <SpotifyLogo />
          </a>
        </Link>

        <div className="flex items-center gap-6 opacity-70">
          <p>{session?.user?.name}</p>
          <Avatar.Root
            onClick={() => signOut()}
            className="w-10 h-10 cursor-pointer bg-gray-100 rounded-full flex items-center justify-center overflow-hidden"
          >
            <Avatar.Image
              alt={session?.user?.name}
              className="w-full h-full"
              src={avatar}
            />
            <Avatar.Fallback delayMs={600}>
              {session?.user?.name.substring(0, 2)}
            </Avatar.Fallback>
          </Avatar.Root>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
