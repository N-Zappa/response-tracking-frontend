"use client";
import React, { useState, useEffect } from "react";
import { updateVacancyResponse } from "../api";
import { VacancyResponse } from "@/app/create/types/vacansyResponse";

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  vacancy: VacancyResponse;
}

const editModal: React.FC<EditModalProps> = ({ isOpen, onClose, vacancy }) => {
  const [formData, setFormData] = useState(vacancy);

  useEffect(() => {
    setFormData(vacancy);
  }, [vacancy]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateVacancyResponse(formData, vacancy._id);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
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
          <button type="submit">Save</button>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default editModal;
