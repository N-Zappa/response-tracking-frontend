import axios from "axios";
import { VacancyResponse } from "../create/types/vacansyResponse";
import { statuses } from "../types/statuses";

export const updateVacancyResponse = async (
  dataDto: VacancyResponse,
  id: string
) => {
  if (!id) {
    return;
  }

  try {
    await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}update/${id}`, {
      company: dataDto.company,
      max_salary: dataDto.max_salary,
      min_salary: dataDto.min_salary,
      note: dataDto.note,
      vacancy: dataDto.vacancy,
      status: dataDto.status,
    });
  } catch (error) {
    throw new Error("Failed to update: " + error);
  }
};
