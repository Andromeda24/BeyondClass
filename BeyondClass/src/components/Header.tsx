import LanguageSelector from "./LanguageSelector";
import { logout } from "../auth/auth";
import type { User } from "firebase/auth";

interface HeaderProps {
  user: User | null;
}

export default function Header({ user }: HeaderProps) {
  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "10px",
        background: "#f0f0f0",
      }}
    >
      <LanguageSelector />

      <div>{user && <button onClick={logout}>Logout</button>}</div>
    </header>
  );
}
