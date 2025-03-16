import { useEffect, useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import Loader from "../Loader/Loader";
import ImageGallery from "../ImageGallery/ImageGallery";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import ImageModal from "../ImageModal/ImageModal";
import { fetchImages } from "../../apiService";
import toast, { Toaster } from "react-hot-toast";
import "../../index.css";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

export default function App() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [noResults, setNoResults] = useState(false);

  const handleSearch = (topic) => {
    setSearchTerm(`${topic}/${Date.now()}`);
    setPage(1);
    setImages([]);
  };

  const handleLoadMoreClick = () => {
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    if (searchTerm === "") {
      return;
    }

    async function getData() {
      try {
        setError(false);
        setIsLoading(true);
        setNoResults(false);
        const response = await fetchImages(searchTerm.split("/")[0], page);
        if (response.length === 0) {
          setNoResults(true);
        }
        setImages((prev) => [...prev, ...response]);
      } catch {
        setError(true);
        toast.error("An error occurred! Please reload.");
      } finally {
        setIsLoading(false);
      }
    }
    getData();
  }, [searchTerm, page]);

  const openModal = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="container">
        <SearchBar onSearch={handleSearch} />
        {noResults && !isLoading && (
          <p className="no-results">
            No images found. Try another search term.
          </p>
        )}

        {images.length > 0 && (
          <ImageGallery images={images} onImageClick={openModal} />
        )}

        {isLoading && <Loader />}

        {images.length > 0 && !isLoading && (
          <LoadMoreBtn onClick={handleLoadMoreClick} />
        )}
        {selectedImage && (
          <ImageModal
            isOpen={isModalOpen}
            onRequestClose={closeModal}
            image={selectedImage}
          />
        )}

        {error && <ErrorMessage />}

        <Toaster position="top-right" />
      </div>
    </>
  );
}
