import Link from "next/link";
import { fetchVacancyResponses } from "./lib/api";

export default async function Page() {
  const vacancyResponses = await fetchVacancyResponses();

  return (
    <div>
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
      <p>
        <Link href={`/create`} passHref>
          <button>Create Vacancy</button>
        </Link>
      </p>
    </div>
  );
}
