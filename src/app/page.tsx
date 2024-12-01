"use client";
import { useState, useEffect } from "react";
import { deleteVacancyResponse, fetchVacancyResponses } from "./lib/api";
import { VacancyResponse } from "./create/types/vacansyResponse";
import EditModal from "./edit/components/editModal";
import { updateVacancyResponse } from "./edit/api";
import { statuses } from "./types/statuses";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { createVacancyResponse } from "./create/lib/api";
import VacancyForm from "./create/createModal";

const Page = () => {
  const [vacancyResponses, setVacancyResponses] = useState<VacancyResponse[]>(
    []
  );
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
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
    setEditModalOpen(true);
  };

  const handleSave = async (updatedVacancy: VacancyResponse) => {
    await updateVacancyResponse(updatedVacancy, updatedVacancy._id);
    await loadVacancyResponses();
    setEditModalOpen(false);
  };

  const handleDeleteClick = async (vacancy: VacancyResponse) => {
    await deleteVacancyResponse(vacancy._id);
    await loadVacancyResponses();
  };

  const handleCreateSave = async (newVacancy: VacancyResponse) => {
    await createVacancyResponse(newVacancy);
    await loadVacancyResponses();
    setCreateModalOpen(false);
  };

  return (
    <div className="p-4">
      <Button
        className="mt-6 w-full sm:w-auto mb:6px"
        onClick={() => setCreateModalOpen(true)}
      >
        Create
      </Button>
      <Table className="mt-6 min-w-full">
        <TableCaption>Vacancy responses</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Company</TableHead>
            <TableHead>Vacancy</TableHead>
            <TableHead>Min Salary</TableHead>
            <TableHead>Max Salary</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Note</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {vacancyResponses.map((vacancyResponse: VacancyResponse) => (
            <TableRow key={vacancyResponse._id}>
              <TableCell>{vacancyResponse.company}</TableCell>
              <TableCell>{vacancyResponse.vacancy}</TableCell>
              <TableCell>{vacancyResponse.min_salary}</TableCell>
              <TableCell>{vacancyResponse.max_salary}</TableCell>
              <TableCell>
                {
                  statuses.find(
                    (status) => status.key === vacancyResponse.status
                  )?.label
                }
              </TableCell>
              <TableCell>
                {vacancyResponse.note.length > 12
                  ? `${vacancyResponse.note.substring(0, 8)}...`
                  : vacancyResponse.note}
              </TableCell>
              <TableCell className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                <Button
                  onClick={() => handleEditClick(vacancyResponse)}
                  className="w-full sm:w-auto"
                >
                  Edit
                </Button>
                <Button
                  onClick={() => handleDeleteClick(vacancyResponse)}
                  className="w-full sm:w-auto"
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {currentVacancy && (
        <EditModal
          isOpen={isEditModalOpen}
          onClose={() => setEditModalOpen(false)}
          vacancy={currentVacancy}
          onSave={handleSave}
        />
      )}

      {isCreateModalOpen && (
        <VacancyForm
          isOpen={isCreateModalOpen}
          onClose={() => setCreateModalOpen(false)}
          onSave={handleCreateSave}
        />
      )}
    </div>
  );
};

export default Page;
