import { useState } from "react";

import Image from "next/image";

import ImageBroken from "./svg/broken";
import ImageLoading from "./svg/loading";

import styles from "./image.module.scss";
interface Props {
  alt?: string;
  containerClassName?: string;
  src?: string;
}

const ImageWithPlaceholder = ({ alt, containerClassName, src }: Props) => {
  const [imageBroken, setImageBroken] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const handleImageError = () => {
    setImageLoading(false);
    setImageBroken(true);
  };

  const handleImageLoad = (result) => {
    setImageLoading(false);
    if (result.naturalWidth === 0) {
      // Broken image
      setImageBroken(true);
    }
  };

  return (
    <div className={`${containerClassName} ${styles.imageContainer}`}>
      {src && !imageBroken ? (
        <>
          {imageLoading && <ImageLoading />}
          <Image
            alt={alt}
            className={imageLoading ? styles.invisible : ""}
            layout="fill"
            objectFit="cover"
            onError={handleImageError}
            onLoadingComplete={handleImageLoad}
            quality={100}
            src={src}
          />
        </>
      ) : (
        <ImageBroken />
      )}
    </div>
  );
};

export default ImageWithPlaceholder;
