import { MouseEvent } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import styles from "./underConstruction.module.scss";
import trafficConeSrc from "../public/images/TrafficCone.svg";

const UnderConstruction = () => {
  const router = useRouter();

  const onBackClick = (e: MouseEvent) => {
    e.preventDefault();
    router.back();
  };

  return (
    <section className={styles.container}>
      <Image
        alt="Orange traffic cone"
        height={276}
        layout="intrinsic"
        quality={100}
        src={trafficConeSrc}
        width={276}
      />
      <h2 className="heading-2">Under Construction</h2>
      <p className="text">
        Ugh, seems you have been click baited into clicking a link that leads to
        a dead end. This page is still in development and will be available
        later.
      </p>
      <button
        className={styles.backButton}
        data-testid="back-button"
        onClick={onBackClick}
      >
        Go back
      </button>
    </section>
  );
};

export default UnderConstruction;
