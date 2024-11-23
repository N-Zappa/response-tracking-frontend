import { fetchVacancyResponses } from "./lib/data";

export default async function Page() {
  const vacancyResponses = await fetchVacancyResponses();
  return (
    <table>
      <thead>
        <tr>
          <th>Company</th>
          <th>Vacancy</th>
          <th>Min Salary</th>
          <th>Max Salary</th>
          <th>Status</th>
          <th>Note</th>
        </tr>
      </thead>
      <tbody>
        {vacancyResponses.map((vacancy: any, index: any) => (
          <tr key={index}>
            <td>{vacancy.company}</td>
            <td>{vacancy.vacancy}</td>
            <td>{vacancy.min_salary}</td>
            <td>{vacancy.max_salary}</td>
            <td>{vacancy.status}</td>
            <td>{vacancy.note}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
