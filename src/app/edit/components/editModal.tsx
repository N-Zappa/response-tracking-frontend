import React, { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { updateVacancyResponse } from "../api";
import { VacancyResponse } from "@/app/create/types/vacansyResponse";
import { Textarea } from "@nextui-org/input";
import { Select, SelectSection, SelectItem } from "@nextui-org/select";
import { statuses } from "@/app/types/statuses";

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
    note: z.string().optional(),
    status: z.enum([
      statuses[0].key,
      statuses[1].key,
      statuses[2].key,
      statuses[3].key,
    ]),
  })
  .refine((data) => Number(data.min_salary) < Number(data.max_salary), {
    message: "Minimum salary must be less than maximum salary.",
    path: ["min_salary"],
  });

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
  const form = useForm<VacancyResponse>({
    resolver: zodResolver(formSchema),

    defaultValues: {
      ...vacancy,
      status: vacancy.status,
      min_salary: `${vacancy.min_salary}`,
      max_salary: `${vacancy.max_salary}`,
    },
  });

  useEffect(() => {
    console.log(" status: vacancy.status", vacancy.status);

    form.reset({
      ...vacancy,
      status: vacancy.status,
      min_salary: `${vacancy.min_salary}`,
      max_salary: `${vacancy.max_salary}`,
    });
  }, [vacancy, form]);

  const handleSubmit = async (data: VacancyResponse) => {
    await updateVacancyResponse(data, vacancy._id);
    onSave(data);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 transition-opacity">
      <div className="bg-white rounded-lg p-8 shadow-lg w-full max-w-3xl">
        <h2 className="text-lg font-semibold mb-4">Edit Vacancy</h2>
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
                      style={{
                        resize: "none",
                        marginTop: "1rem",
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <FormControl>
                    <Select
                      {...field}
                      defaultSelectedKeys={[
                        `${
                          statuses.filter(
                            (statuse) => statuse.key === vacancy.status
                          )[0].key
                        }`,
                      ]}
                    >
                      <SelectSection className="rounded border-2">
                        {statuses.map((statuse) => (
                          <SelectItem
                            className="bg-white cursor-pointer"
                            key={statuse.key}
                          >
                            {statuse.label}
                          </SelectItem>
                        ))}
                      </SelectSection>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex space-x-2">
              <Button type="submit">Save</Button>
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

export default EditModal;
