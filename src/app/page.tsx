"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { deleteVacancyResponse, fetchVacancyResponses } from "./lib/api";
import { VacancyResponse } from "./create/types/vacansyResponse";
import EditModal from "./edit/components/editModal";

const Page = () => {
  const [vacancyResponses, setVacancyResponses] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentVacancy, setCurrentVacancy] = useState<VacancyResponse>({
    _id: "",
    company: "",
    vacancy: "",
    min_salary: 0,
    max_salary: 0,
    note: "",
    status: "",
  });

  useEffect(() => {
    const loadVacancyResponses = async () => {
      const data = await fetchVacancyResponses();
      setVacancyResponses(data);
    };

    loadVacancyResponses();
  }, []);

  const handleEditClick = (vacancy: VacancyResponse) => {
    setCurrentVacancy(vacancy);
    setModalOpen(true);
  };

  const handleDeleteClick = (vacancy: VacancyResponse) => {
    deleteVacancyResponse(vacancy._id);
  };

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
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {vacancyResponses.map((vacancyResponse: VacancyResponse, id: any) => (
            <tr key={id}>
              <td>{vacancyResponse.company}</td>
              <td>{vacancyResponse.vacancy}</td>
              <td>{vacancyResponse.min_salary}</td>
              <td>{vacancyResponse.max_salary}</td>
              <td>{vacancyResponse.status}</td>
              <td>{vacancyResponse.note}</td>
              <td>
                <button onClick={() => handleEditClick(vacancyResponse)}>
                  Edit
                </button>
              </td>
              <td>
                <button onClick={() => handleDeleteClick(vacancyResponse)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>
        <Link href={`/create`} passHref>
          <button>Create Vacancy</button>
        </Link>
      </p>
      <EditModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        vacancy={currentVacancy}
      />
    </div>
  );
};

export default Page;
