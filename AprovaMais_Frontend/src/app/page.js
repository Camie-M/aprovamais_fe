import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>Home</h1>
      <div>
        <Link href={"/list"}>Página de lista</Link>
      </div>
      <div>
        <Link href={"/login"}>Login</Link>
      </div>
      <div>
        <Link href={"/dashboard"}>Dashboard</Link>
      </div>
    </div>
  );
}
