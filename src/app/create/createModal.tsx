"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@nextui-org/input";
import { VacancyResponse } from "./types/vacansyResponse";

const formSchema = z
  .object({
    company: z.string().min(1, { message: "Company is required." }),
    vacancy: z.string().min(1, { message: "Vacancy is required." }),
    min_salary: z
      .string()
      .refine((value) => !isNaN(Number(value)) && Number(value) >= 0, {
        message: "Minimum salary must be a positive number.",
      }),
    max_salary: z
      .string()
      .refine((value) => !isNaN(Number(value)) && Number(value) >= 0, {
        message: "Maximum salary must be a positive number.",
      }),
    note: z.string().min(1, { message: "Note is required." }),
  })
  .refine((data) => Number(data.min_salary) < Number(data.max_salary), {
    message: "Minimum salary must be less than maximum salary.",
    path: ["min_salary"],
  });

interface VacancyFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (newVacancy: VacancyResponse) => Promise<void>;
}

const VacancyForm: React.FC<VacancyFormProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const form = useForm<VacancyResponse>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      company: "",
      vacancy: "",
      min_salary: "",
      max_salary: "",
      note: "",
      status: "RESUME_VIEWED",
    },
  });

  const handleSubmit = async (data: VacancyResponse) => {
    await onSave(data);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 transition-opacity">
      <div className="bg-white rounded-lg p-8 shadow-lg w-full max-w-3xl">
        <h2 className="text-lg font-semibold mb-4">Add Vacancy Response</h2>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company</FormLabel>
                  <FormControl>
                    <Input placeholder="Company Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="vacancy"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Vacancy</FormLabel>
                  <FormControl>
                    <Input placeholder="Vacancy Title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="min_salary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Min Salary</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Minimum Salary"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="max_salary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Max Salary</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Maximum Salary"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="note"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Note</FormLabel>
                  <FormControl>
                    <Textarea
                      maxRows={2}
                      className="max-h-xs"
                      placeholder="Additional Notes"
                      {...field}
                      style={{ resize: "none", marginTop: "1rem" }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex space-x-2">
              <Button type="submit">Submit</Button>
              <Button type="button" onClick={onClose} variant="outline">
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default VacancyForm;
