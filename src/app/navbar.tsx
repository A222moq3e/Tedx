import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center p-4">
      <Link href="/">
        <Image src="/avatar1.jpeg" alt="logo" width={100} height={100} />
      </Link>
    </nav>
  );
}