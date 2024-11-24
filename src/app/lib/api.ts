import axios from "axios";

export const fetchVacancyResponses = async () => {
  try {
    let { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}all`);
    return data;
  } catch (error) {
    throw new Error("Failed to fetch responses: " + error);
  }
};
