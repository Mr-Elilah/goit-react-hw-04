import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useState, useEffect } from "react";
import quotes from "../../data/quotes";
const shuffleArray = (array) => {
  return array
    .map((item) => ({ ...item, sortValue: Math.random() }))
    .sort((a, b) => a.sortValue - b.sortValue)
    .map(({ sortValue, ...item }) => item);
};

export default function QuoteSwiper() {
  const [shuffledQuotes, setShuffledQuotes] = useState([]);

  useEffect(() => {
    setShuffledQuotes(shuffleArray(quotes));
  }, []);

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "600px",
        margin: "0 auto",
        textAlign: "center",
        padding: "20px",
      }}
    >
      <p
        style={{
          fontSize: "18px",
          fontWeight: "bold",
          color: "red",
          marginBottom: "20px",
        }}
      >
        Упс, что-то пошло не так, возможно потеряно интернет-соединение.
        Перезагрузите страницу, чтобы восстановить соединение...
      </p>
      <p style={{ fontSize: "16px", marginBottom: "20px" }}>
        А пока соединение не восстановится, вы можете прочесть несколько
        интересных цитат:
      </p>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        navigation={true}
        pagination={{ clickable: true }}
        autoplay={{ delay: 15000, disableOnInteraction: false }}
        loop
      >
        {shuffledQuotes.map((quote) => (
          <SwiperSlide key={quote.id}>
            <div
              style={{
                padding: "20px",
                fontSize: "18px",
                fontStyle: "italic",
                border: "1px solid #ccc",
                borderRadius: "10px",
                background: "#f9f9f9",
              }}
            >
              <p>«{quote.expression}»</p>
              <p>
                <strong>{quote.name}</strong> ({quote.lifespan})
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
