"use client";
import React, { useState, useEffect } from "react";
import { updateVacancyResponse } from "../api";
import { VacancyResponse } from "@/app/create/types/vacansyResponse";

export enum statuses {
  RESUME_NOT_VIEWED = "Not viewed",
  RESUME_VIEWED = "Viewed",
  INVITATION = "Invitation",
  REJECT = "Reject",
}

const statusMappings: Record<statuses, string> = {
  [statuses.RESUME_NOT_VIEWED]: "RESUME_NOT_VIEWED",
  [statuses.RESUME_VIEWED]: "RESUME_VIEWED",
  [statuses.INVITATION]: "INVITATION",
  [statuses.REJECT]: "REJECT",
};

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  vacancy: VacancyResponse;
  onSave: (updatedVacancy: VacancyResponse) => void;
}

const EditModal: React.FC<EditModalProps> = ({
  isOpen,
  onClose,
  vacancy,
  onSave,
}) => {
  const [formData, setFormData] = useState<VacancyResponse>(vacancy);

  useEffect(() => {
    setFormData(vacancy);
  }, [vacancy]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === "status") {
      const backendValue = statusMappings[value as statuses];
      setFormData({
        ...formData,
        [name]: backendValue as
          | "RESUME_NOT_VIEWED"
          | "RESUME_VIEWED"
          | "INVITATION"
          | "REJECT",
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateVacancyResponse(formData, vacancy._id);
    onSave(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div>
      <div>
        <h2>Edit Vacancy</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Company:
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
            />
          </label>
          <label>
            Vacancy:
            <input
              type="text"
              name="vacancy"
              value={formData.vacancy}
              onChange={handleChange}
            />
          </label>
          <label>
            Min Salary:
            <input
              type="number"
              name="min_salary"
              value={formData.min_salary}
              onChange={handleChange}
            />
          </label>
          <label>
            Max Salary:
            <input
              type="number"
              name="max_salary"
              value={formData.max_salary}
              onChange={handleChange}
            />
          </label>
          <label>
            Note:
            <input
              type="text"
              name="note"
              value={formData.note}
              onChange={handleChange}
            />
          </label>
          <label>
            Status:
            <select
              name="status"
              value={Object.keys(statusMappings).find(
                (key) => statusMappings[key as statuses] === formData.status
              )}
              onChange={handleChange}
            >
              {Object.values(statuses).map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </label>
          <button type="submit">Save</button>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditModal;
