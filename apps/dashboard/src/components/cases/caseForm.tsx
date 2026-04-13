// src/components/cases/CaseForm.tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCreateCase, useUpdateCase } from "@med-simulate/api/hooks";
import { toast } from "sonner";
import { ICase } from "@med-simulate/types";

// Zod schema – all fields required (matches CreateCasePayload)
const caseSchema = z.object({
  title: z.string().min(1, "Title is required"),
  complaint: z.string().min(1, "Chief complaint is required"),
  category: z.coerce.number().min(0).max(2),
  difficulty: z.coerce.number().min(0).max(3),
  speciality: z.coerce.number().min(0).max(2),
  name: z.string().min(1, "Patient name is required"),
  age: z.coerce.number().positive("Age must be positive"),
  gender: z.coerce.number().min(0).max(1),
  weight: z.coerce.number().positive("Weight must be positive"),
  height: z.coerce.number().positive("Height must be positive"),
  briefHistory: z.string().min(1, "Brief history is required"),
  objective: z.string().min(1, "Objective is required"),
  actor: z.string().min(1, "Actor instructions are required"),
  diagnosis: z.string().min(1, "Diagnosis is required"),
  differential: z.string().min(1, "DDx is required"),
});

type CaseFormValues = z.infer<typeof caseSchema>;

interface CaseFormProps {
  initialValues?: Partial<CaseFormValues> & { id?: string };
  onSuccess: () => void;
  onCancel: () => void;
}

export const CaseForm = ({
  initialValues,
  onSuccess,
  onCancel,
}: CaseFormProps) => {
  const createCase = useCreateCase();
  const updateCase = useUpdateCase();
  const isEditing = !!initialValues?.id;

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<CaseFormValues>({
    resolver: zodResolver(caseSchema),
    defaultValues: {
      title: "",
      complaint: "",
      category: 0,
      difficulty: 0,
      speciality: 0,
      name: "",
      age: 0,
      gender: 0,
      weight: 0,
      height: 0,
      briefHistory: "",
      objective: "",
      actor: "",
      diagnosis: "",
      differential: "",
      ...initialValues,
    },
  });

  const onSubmit = async (values: CaseFormValues) => {
    try {
      if (isEditing && initialValues.id) {
        await updateCase.mutateAsync({ id: initialValues.id, payload: values });
        toast.success("Case updated");
      } else {
        // Cast to CreateCasePayload (matches CaseFormValues)
        await createCase.mutateAsync(values as ICase.CreateCasePayload);
        toast.success("Case created");
      }
      onSuccess();
    } catch {
      toast.error(isEditing ? "Update failed" : "Creation failed");
    }
  };

  // Helper to safely get select value with fallback
  const getSelectValue = (field: keyof CaseFormValues): string => {
    const val = watch(field);
    return val !== undefined && val !== null ? val.toString() : "0";
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <Input {...register("title")} />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Patient Name</label>
          <Input {...register("name")} />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Age</label>
          <Input type="number" {...register("age")} />
          {errors.age && (
            <p className="text-red-500 text-sm mt-1">{errors.age.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Gender</label>
          <Select
            value={getSelectValue("gender")}
            onValueChange={(val) => setValue("gender", parseInt(val))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0">Male</SelectItem>
              <SelectItem value="1">Female</SelectItem>
            </SelectContent>
          </Select>
          {errors.gender && (
            <p className="text-red-500 text-sm mt-1">{errors.gender.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Weight (kg)</label>
          <Input type="number" step="0.1" {...register("weight")} />
          {errors.weight && (
            <p className="text-red-500 text-sm mt-1">{errors.weight.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Height (cm)</label>
          <Input type="number" step="0.1" {...register("height")} />
          {errors.height && (
            <p className="text-red-500 text-sm mt-1">{errors.height.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Speciality</label>
          <Select
            value={getSelectValue("speciality")}
            onValueChange={(val) => setValue("speciality", parseInt(val))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select speciality" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0">Internal Medicine</SelectItem>
              <SelectItem value="1">Pediatrics</SelectItem>
              <SelectItem value="2">OB/GYN</SelectItem>
            </SelectContent>
          </Select>
          {errors.speciality && (
            <p className="text-red-500 text-sm mt-1">
              {errors.speciality.message}
            </p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Difficulty</label>
          <Select
            value={getSelectValue("difficulty")}
            onValueChange={(val) => setValue("difficulty", parseInt(val))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0">Intern</SelectItem>
              <SelectItem value="1">Junior Resident</SelectItem>
              <SelectItem value="2">Senior Resident</SelectItem>
              <SelectItem value="3">Specialist</SelectItem>
            </SelectContent>
          </Select>
          {errors.difficulty && (
            <p className="text-red-500 text-sm mt-1">
              {errors.difficulty.message}
            </p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Category</label>
          <Select
            value={getSelectValue("category")}
            onValueChange={(val) => setValue("category", parseInt(val))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0">ER</SelectItem>
              <SelectItem value="1">Inpatient</SelectItem>
              <SelectItem value="2">Outpatient</SelectItem>
            </SelectContent>
          </Select>
          {errors.category && (
            <p className="text-red-500 text-sm mt-1">
              {errors.category.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Chief Complaint
        </label>
        <Textarea {...register("complaint")} rows={2} />
        {errors.complaint && (
          <p className="text-red-500 text-sm mt-1">
            {errors.complaint.message}
          </p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Brief History</label>
        <Textarea {...register("briefHistory")} rows={3} />
        {errors.briefHistory && (
          <p className="text-red-500 text-sm mt-1">
            {errors.briefHistory.message}
          </p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Objective</label>
        <Textarea {...register("objective")} rows={2} />
        {errors.objective && (
          <p className="text-red-500 text-sm mt-1">
            {errors.objective.message}
          </p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">
          Actor Instructions
        </label>
        <Textarea {...register("actor")} rows={2} />
        {errors.actor && (
          <p className="text-red-500 text-sm mt-1">{errors.actor.message}</p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Diagnosis</label>
        <Textarea {...register("diagnosis")} rows={2} />
        {errors.diagnosis && (
          <p className="text-red-500 text-sm mt-1">
            {errors.diagnosis.message}
          </p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">
          Differntial Diagnosis
        </label>
        <Textarea {...register("differential")} rows={2} />
        {errors.differential && (
          <p className="text-red-500 text-sm mt-1">
            {errors.differential.message}
          </p>
        )}
      </div>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : isEditing ? "Update" : "Create"}
        </Button>
      </div>
    </form>
  );
};
