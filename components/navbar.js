import Link from 'next/link'
import Image from 'next/image'
import { useSession, signIn, signOut } from "next-auth/client"

const Navbar = () => {
  const [ session, loading ] = useSession()

  return (
    <nav className="bg-gray-200 w-full p-3">
      <div className="flex flex-row text-gray-600">
        <div className="flex-1">
          <Link href="/">
            <a><Image src="/logo.png" width="100" height="85" /></a>
          </Link>
        </div>
        <div className="p-3 uppercase text-xl">
          {session && (
            <>{session.user.name}</>
          )}
        </div>
        <div className="p-3 uppercase text-xl">
          {!session && (
            <button className="uppercase" onClick={signIn}>Sign In</button>
          )}
          {session && (
            <button className="uppercase" onClick={signOut}>Sign Out</button>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar