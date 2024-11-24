import axios from "axios";

export const updateVacancyResponse = async (dataDto: any, id: string) => {
  try {
    let { data } = await axios.patch(
      `${process.env.NEXT_PUBLIC_API_URL}/update/${id}`,
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
    throw new Error("Failed to create response: " + error);
  }
};
