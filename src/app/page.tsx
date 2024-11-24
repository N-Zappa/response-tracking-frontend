"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { deleteVacancyResponse, fetchVacancyResponses } from "./lib/api";
import { VacancyResponse } from "./create/types/vacansyResponse";
import EditModal from "./edit/components/editModal";
import { updateVacancyResponse } from "./edit/api";
import { statuses } from "./types/statuses";

const Page = () => {
  const [vacancyResponses, setVacancyResponses] = useState<VacancyResponse[]>(
    []
  );
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentVacancy, setCurrentVacancy] = useState<VacancyResponse | null>(
    null
  );

  useEffect(() => {
    loadVacancyResponses();
  }, []);

  const loadVacancyResponses = async () => {
    const data = await fetchVacancyResponses();
    setVacancyResponses(data);
  };

  const handleEditClick = (vacancy: VacancyResponse) => {
    setCurrentVacancy(vacancy);
    setModalOpen(true);
  };

  const handleSave = async (updatedVacancy: VacancyResponse) => {
    await updateVacancyResponse(updatedVacancy, updatedVacancy._id);
    await loadVacancyResponses();
    setModalOpen(false);
  };

  const handleDeleteClick = async (vacancy: VacancyResponse) => {
    await deleteVacancyResponse(vacancy._id);
    await loadVacancyResponses();
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
          {vacancyResponses.map((vacancyResponse: VacancyResponse) => (
            <tr key={vacancyResponse._id}>
              <td>{vacancyResponse.company}</td>
              <td>{vacancyResponse.vacancy}</td>
              <td>{vacancyResponse.min_salary}</td>
              <td>{vacancyResponse.max_salary}</td>
              <td>{statuses[vacancyResponse.status]}</td>
              <td>{vacancyResponse.note}</td>
              <td>
                <button onClick={() => handleEditClick(vacancyResponse)}>
                  Edit
                </button>
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
      {currentVacancy && (
        <EditModal
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          vacancy={currentVacancy}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default Page;
