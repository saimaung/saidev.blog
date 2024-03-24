import Link from "next/link"

import { ModeToggle } from "./ModeToggle"
import Image from "next/image"

const Navbar = () => {
  return (
    <div className="mx-auto max-w-5xl px-6 mt-4 mb-4">
      <div className="flex justify-between items-start h-24">
        <Link href="/">
          <Image 
            src="/sai-high-resolution-logo-transparent.svg" 
            alt="logo"
            width={140}
            height={30}/>
        </Link>
        <div>
          {/* themes */}
          <ModeToggle />
        </div>
      </div>
    </div>
  )
}

export default Navbar
