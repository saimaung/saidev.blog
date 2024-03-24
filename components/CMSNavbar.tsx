import Link from "next/link"
import { Lilita_One } from "next/font/google"
import Image from "next/image";

const lilitaOneFont = Lilita_One({ weight: "400", subsets: ["latin"] });

const CMSNavbar = () => {
  return (
    <div className="flex justify-between items-center py-1 px-5">
      <Link href="/"> 
      <Image 
        src="sai-high-resolution-logo-transparent.svg" 
        alt="logo"
        width={140}
        height={30}/>
      </Link>
    </div>
  )
}

export default CMSNavbar
