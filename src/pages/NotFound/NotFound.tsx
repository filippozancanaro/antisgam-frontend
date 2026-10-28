import { Home } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button, Page } from "@/shared/ui";
import styles from "./NotFound.module.scss";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Page centered>
      <img className={styles.image} src="/assets/images/page-eaten.svg" alt="Pagina mangiata" />

      <p className={styles.code}>404</p>
      <h1 className={styles.title}>NOT FOUND</h1>
      <p className={styles.subtitle}>nel senso che questa pagina non esiste</p>
      <p className={styles.text}>o magari esiste, ma palesemente non è quello che cercavi.</p>

      <Button variant="primary" size="lg" icon={<Home />} onPress={() => navigate("/")}>
        Torniamo alla Home, ok?
      </Button>
    </Page>
  );
};

export default NotFound;
