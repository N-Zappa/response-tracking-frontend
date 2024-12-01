import axios from "axios";
import { VacancyResponse } from "../types/vacansyResponse";

export const createVacancyResponse = async (dataDto: VacancyResponse) => {
  try {
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}create`,
      {
        company: dataDto.company,
        max_salary: dataDto.max_salary,
        min_salary: dataDto.min_salary,
        note: dataDto.note,
        vacancy: dataDto.vacancy,
      }
    );
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error;
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};
