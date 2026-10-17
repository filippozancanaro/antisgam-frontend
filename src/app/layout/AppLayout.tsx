import { Menu } from "lucide-react";
import { Link, Outlet } from "react-router-dom";
import { useDisclosure } from "@/shared/hooks";
import { Drawer, IconButton } from "@/shared/ui";
import Brand from "./Brand";
import Sidebar from "./Sidebar";
import styles from "./AppLayout.module.scss";

/**
 * Struttura dell'app: aside laterale sempre visibile da desktop,
 * drawer a scomparsa (con barra superiore) sotto i 1024px.
 */
const AppLayout = () => {
  const drawer = useDisclosure();

  return (
    <div className={styles.shell}>
      <aside className={styles.aside}>
        <Sidebar />
      </aside>

      <Drawer open={drawer.isOpen} onClose={drawer.close} label="Menu di navigazione">
        <Sidebar onNavigate={drawer.close} />
      </Drawer>

      <div className={styles.main}>
        <header className={styles.topbar}>
          <IconButton aria-label="Apri menu" onPress={drawer.open}>
            <Menu aria-hidden="true" />
          </IconButton>
          <Link to="/" className={styles.brandLink}>
            <Brand compact />
          </Link>
        </header>

        <main className={styles.content}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
