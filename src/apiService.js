import axios from "axios";

const ACCESS_KEY = "pwnc0aHY-MgoE58a6teAUXkgSlOlW7PIu2dD7vIl1Ok";

export const fetchImages = async (topic, currentPage) => {
  try {
    const response = await axios.get("https://api.unsplash.com/search/photos", {
      params: {
        query: topic,
        page: currentPage,
        per_page: 12,
        client_id: ACCESS_KEY,
      },
    });

    console.log("API Response:", response);

    return response.data.results;
  } catch (error) {
    console.error("Error fetching images:", error);
    throw error;
  }
};
// ApplicationID: 722381;
// AccessKey: pwnc0aHY-MgoE58a6teAUXkgSlOlW7PIu2dD7vIl1Ok;
// SecretKey: 1bsWxXqNIPaUrcSJDKxZGZratNxHOlImG68dE5bJVB8;
