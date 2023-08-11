import Link from "next/link";

export default function Navbar() {
  return (
    <div style={{ width: "100%", backgroundColor: "lightblue" }}>
      <Link href="/"><p className="text-lg p-3">Home</p></Link>
      <Link href="/login"><p className="text-lg p-3">Login</p></Link>
      <Link href="/register"><p className="text-lg p-3">Register</p></Link>
      <Link href="/favourite-recipes"><p className="text-lg p-3">Favourites</p></Link>
    </div>
  );
}
