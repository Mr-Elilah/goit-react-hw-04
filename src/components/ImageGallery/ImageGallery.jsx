import ImageCard from "../ImageCard/ImageCard";
import css from "./ImageGallery.module.css";

export default function ImageGallery({ images, onImageClick }) {
  return (
    <ul className={css.gallery}>
      {images.map(({ urls: { small, regular }, id, alt_description }) => {
        return (
          <li className={css.galleryItem} key={id}>
            <ImageCard
              path={small}
              desc={alt_description}
              onClick={() =>
                onImageClick({ path: regular, desc: alt_description })
              }
            />
          </li>
        );
      })}
    </ul>
  );
}
