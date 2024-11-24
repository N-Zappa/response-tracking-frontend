"use client";
import Link from "next/link";
import { useState } from "react";
import { createVacancyResponse } from "./lib/api";
import { VacancyResponse } from "./types/vacansyResponse";

const VacancyForm = () => {
  const [formData, setFormData] = useState<VacancyResponse>({
    _id: "",
    company: "",
    vacancy: "",
    min_salary: 0,
    max_salary: 0,
    note: "",
    status: "RESUME_NOT_VIEWED",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]:
        name === "min_salary" || name === "max_salary" ? Number(value) : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await createVacancyResponse(formData);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Company:
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Vacancy:
            <input
              type="text"
              name="vacancy"
              value={formData.vacancy}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Minimum Salary:
            <input
              type="number"
              name="min_salary"
              value={formData.min_salary}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Maximum Salary:
            <input
              type="number"
              name="max_salary"
              value={formData.max_salary}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Note:
            <textarea
              name="note"
              value={formData.note}
              onChange={handleChange}
            ></textarea>
          </label>
        </div>
        <button type="submit">Submit</button>
      </form>
      <p>
        <Link href={"/"} passHref>
          <button>Back</button>
        </Link>
      </p>
    </div>
  );
};

export default VacancyForm;
