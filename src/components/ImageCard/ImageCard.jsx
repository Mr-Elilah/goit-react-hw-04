import css from "./ImageCard.module.css";

export default function ImageCard({ path, desc, onClick }) {
  return (
    <div onClick={onClick}>
      <img className={css.img} src={path} alt={desc} onClick={onClick} />
    </div>
  );
}
