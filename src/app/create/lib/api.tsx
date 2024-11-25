import axios, { AxiosError } from "axios";
import { VacancyResponse } from "../types/vacansyResponse";

export const createVacancyResponse = async (dataDto: VacancyResponse) => {
  try {
    let { data } = await axios.post(
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
  } catch (error: any) {
    throw new AxiosError(error);
  }
};
