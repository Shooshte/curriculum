import { useEffect } from "react";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";

import styles from "./login.module.scss";

export default function Component() {
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      signIn("google");
    }
    if (status === "authenticated") {
      router.push("/");
    }
  }, [router, status]);

  return <div className={styles.container}>Loading...</div>;
}
