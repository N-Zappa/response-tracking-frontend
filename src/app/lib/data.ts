import axios from "axios";

export const fetchVacancyResponses = async () => {
  //try {
  //let data = await fetch(`${process.env.NEXT_API_URL}all`, {
  let { data } = await axios.get(`http://localhost:6000/api/all`, {});
  return data;
  //   } catch (error) {
  //     throw new Error("Failed to fetch responses: " + error);
  //   }
};
