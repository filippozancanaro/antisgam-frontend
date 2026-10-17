import { House, Settings } from "lucide-react";
import type { ReactNode } from "react";
import { NavLink } from "react-router-dom";
import { cx } from "@/shared/utils/cx";
import Brand from "./Brand";
import ScanHistoryList from "./ScanHistoryList";
import styles from "./Sidebar.module.scss";

interface MenuRoute {
  label: string;
  path: string;
  icon: ReactNode;
}

const MENU_ROUTES: readonly MenuRoute[] = [
  { label: "Antisgam", path: "/", icon: <House aria-hidden="true" /> },
  { label: "Impostazioni", path: "/settings", icon: <Settings aria-hidden="true" /> },
];

interface Props {
  /** Chiamata dopo ogni navigazione (serve a chiudere il drawer su mobile). */
  onNavigate?: () => void;
}

/** Contenuto dell'aside: brand, navigazione e cronologia delle scansioni. */
const Sidebar = ({ onNavigate }: Props) => (
  <div className={styles.sidebar}>
    <NavLink to="/" className={styles.brandLink} onClick={onNavigate} aria-label="Antisgam, home">
      <Brand />
    </NavLink>

    <nav aria-label="Navigazione">
      <ul className={styles.nav}>
        {MENU_ROUTES.map(({ label, path, icon }) => (
          <li key={path}>
            <NavLink
              to={path}
              end
              onClick={onNavigate}
              className={({ isActive }) => cx(styles.navLink, isActive && styles.navLinkActive)}
            >
              <span className={styles.navIcon}>{icon}</span>
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>

    <ScanHistoryList onNavigate={onNavigate} className={styles.history} />

    <p className={styles.footer}>I tuoi dati restano su questo dispositivo.</p>
  </div>
);

export default Sidebar;
