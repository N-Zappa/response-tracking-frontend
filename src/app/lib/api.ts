import axios from "axios";

export const fetchVacancyResponses = async () => {
  try {
    let { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}all`);
    return data;
  } catch (error) {
    throw new Error("Failed to fetch responses: " + error);
  }
};

export const deleteVacancyResponse = async (id: string) => {
  try {
    let { data } = await axios.delete(
      `${process.env.NEXT_PUBLIC_API_URL}${id}`
    );
    return data;
  } catch (error) {
    throw new Error("Failed to fetch responses: " + error);
  }
};
