export interface VacancyResponse {
  _id: string;
  company: string;
  vacancy: string;
  min_salary: string;
  max_salary: string;
  note: string;
  status: "RESUME_NOT_VIEWED" | "RESUME_VIEWED" | "INVITATION" | "REJECT";
}
