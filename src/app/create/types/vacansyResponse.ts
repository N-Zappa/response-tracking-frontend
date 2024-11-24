export interface VacancyResponse {
  _id: string;
  company: string;
  vacancy: string;
  min_salary: number;
  max_salary: number;
  note: string;
  status: "RESUME_NOT_VIEWED" | "RESUME_VIEWED" | "INVITATION" | "REJECT";
}
