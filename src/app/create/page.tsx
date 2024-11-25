"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createVacancyResponse } from "./lib/api";
import { VacancyResponse } from "./types/vacansyResponse";

const VacancyForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<VacancyResponse>({
    _id: "",
    company: "",
    vacancy: "",
    min_salary: "",
    max_salary: "",
    note: "",
    status: "RESUME_NOT_VIEWED",
  });
  const [error, setError] = useState<string>("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === "min_salary" || name === "max_salary") {
      if (value === "" || /^[0-9]*$/.test(value)) {
        setFormData({
          ...formData,
          [name]: value,
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();

      if (
        !formData.company ||
        !formData.vacancy ||
        !formData.min_salary ||
        !formData.max_salary ||
        !formData.note
      ) {
        setError("Please fill in all required fields.");
        return;
      }

      setError("");

      const formattedData: VacancyResponse = {
        ...formData,
        min_salary: formData.min_salary
          ? `${Number(formData.min_salary)}`
          : "0",
        max_salary: formData.max_salary
          ? `${Number(formData.max_salary)}`
          : "0",
      };
      await createVacancyResponse(formattedData);
      router.push("/");
    } catch (error: any) {
      if (error.message.response.data.error.includes("salary")) {
        setError(error.message.response.data.error);
      } else setError("An unknown error occurred.");
    }
  };

  return (
    <div>
      {error && <div style={{ color: "red" }}>{error}</div>}{" "}
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Company:
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
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
            />
          </label>
        </div>
        <div>
          <label>
            Minimum Salary:
            <input
              type="text"
              name="min_salary"
              value={formData.min_salary}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label>
            Maximum Salary:
            <input
              type="text"
              name="max_salary"
              value={formData.max_salary}
              onChange={handleChange}
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
