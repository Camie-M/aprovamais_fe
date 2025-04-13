import styles from "./page.module.scss";

import Filters from "@/app/components/filters";
import Hero from "@/app/components/hero";
import Menu from "@/app/components/menu";
import Link from "next/link";
export default function Home() {
  const routes = [
    { path: "/login", label: "Login" },
    { path: "/dashboard", label: "Dashboard" },
  ];
  return (
    <main className={styles.wrapper}>
      <Menu>
        {routes.map((route, index) => (
          <Link key={index} href={route.path}>
            {route.label}
          </Link>
        ))}
      </Menu>
      <Hero />
      <Filters />
    </main>
  );
}
