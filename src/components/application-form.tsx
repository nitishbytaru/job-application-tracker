"use client";

import { useForm, Controller } from "react-hook-form";
import type { ApplicationStatus } from "@/types";
import { useApplicationStore } from "@/store/use-application-store";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

const STATUS_OPTIONS: ApplicationStatus[] = [
  "applied",
  "screening",
  "interviewing",
  "offer",
  "rejected",
  "withdrawn",
];

interface ApplicationFormProps {
  onClose: () => void;
  editId?: string;
}

type FormValues = {
  company: string;
  role: string;
  status: ApplicationStatus;
  dateApplied: string;
  salary: string;
  location: string;
  notes: string;
  url: string;
};

export default function ApplicationForm({ onClose, editId }: ApplicationFormProps) {
  const { addApplication, updateApplication, getApplicationById } =
    useApplicationStore();

  const existing = editId ? getApplicationById(editId) : undefined;

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      company: existing?.company ?? "",
      role: existing?.role ?? "",
      status: existing?.status ?? "applied",
      dateApplied: existing?.dateApplied ?? new Date().toISOString().split("T")[0],
      salary: existing?.salary ?? "",
      location: existing?.location ?? "",
      notes: existing?.notes ?? "",
      url: existing?.url ?? "",
    },
  });

  const onSubmit = (data: FormValues) => {
    const submitData = {
      ...data,
      salary: data.salary || undefined,
      location: data.location || undefined,
      notes: data.notes || undefined,
      url: data.url || undefined,
    };

    if (editId) {
      updateApplication(editId, submitData);
    } else {
      addApplication(submitData);
    }
    onClose();
  };

  return (
    <Dialog open={true} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{editId ? "Edit Application" : "Add New Application"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="company">
              Company <span className="text-destructive">*</span>
            </Label>
            <Input
              id="company"
              placeholder="e.g. Google"
              {...register("company", { required: "Company is required" })}
            />
            {errors.company && (
              <p className="text-destructive text-xs">{errors.company.message}</p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="role">
              Role <span className="text-destructive">*</span>
            </Label>
            <Input
              id="role"
              placeholder="e.g. Senior Frontend Engineer"
              {...register("role", { required: "Role is required" })}
            />
            {errors.role && (
              <p className="text-destructive text-xs">{errors.role.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="status">Status</Label>
              <Controller
                control={control}
                name="status"
                render={({ field }) => (
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      {STATUS_OPTIONS.map((s) => (
                        <SelectItem key={s} value={s}>
                          {s.charAt(0).toUpperCase() + s.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="dateApplied">Date Applied</Label>
              <Input id="dateApplied" type="date" {...register("dateApplied")} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="salary">Salary Range</Label>
              <Input id="salary" placeholder="e.g. $120k - $160k" {...register("salary")} />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="location">Location</Label>
              <Input id="location" placeholder="e.g. Remote, NYC" {...register("location")} />
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="url">Job Posting URL</Label>
            <Input id="url" type="url" placeholder="https://..." {...register("url")} />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea id="notes" placeholder="Any additional notes..." className="resize-none" {...register("notes")} />
          </div>

          <DialogFooter className="pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">{editId ? "Save Changes" : "Add Application"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
