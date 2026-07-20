import { useEffect, useMemo, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { useAddTelemetry } from "@/hooks/useUseCase";
import {
  getFieldsForUseCase,
  type FieldType,
  type UseCaseFieldDef,
} from "@/data/nonIotFieldConfig";

/** Legacy shape some callers still pass via `editableFields`. Kept for back-compat. */
interface EditableField {
  key: string;
  label: string;
  type: "number" | "text" | "date";
}

interface SubmitDataDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  assignmentId: string;
  entityId?: string;
  useCaseName: string;
  editableFields?: EditableField[];
  onSuccess?: () => void;
}

export function SubmitDataDialog({
  open,
  onOpenChange,
  assignmentId,
  entityId,
  useCaseName,
  editableFields = [],
  onSuccess,
}: SubmitDataDialogProps) {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const { mutate: addTelemetry, isPending } = useAddTelemetry();

  // Prefer the curated per-use-case field config (sourced from the API field
  // spec); fall back to whatever the caller passed in for older use cases
  // that haven't been added to the config yet.
  const fields: UseCaseFieldDef[] = useMemo(() => {
    const configured = getFieldsForUseCase(useCaseName);
    if (configured.length > 0) return configured;
    return editableFields.map((f) => ({
      key: f.key,
      label: f.label,
      type: f.type as FieldType,
    }));
  }, [useCaseName, editableFields]);

  useEffect(() => {
    if (open) {
      const initial: Record<string, string> = {};
      fields.forEach((f) => (initial[f.key] = ""));
      setFormData(initial);
    }
  }, [open, fields]);

  const handleChange = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!entityId) {
      toast.error("No entity found for this use case. Cannot submit data.");
      return;
    }

    const missing = fields.filter((f) => !f.optional && !formData[f.key]);
    if (missing.length > 0) {
      toast.error(`Please fill in: ${missing.map((f) => f.label).join(", ")}`);
      return;
    }

    // Coerce raw string form state into the types the API expects.
    const payload: Record<string, any> = {};
    fields.forEach((f) => {
      const raw = formData[f.key];
      if (f.type === "number") {
        payload[f.key] = raw === "" ? undefined : Number(raw);
      } else if (f.type === "boolean") {
        payload[f.key] = raw === "yes";
      } else {
        payload[f.key] = raw;
      }
    });

    addTelemetry(
      { assignmentId, entityId, data: payload },
      {
        onSuccess: () => {
          toast.success(`Data submitted for ${useCaseName}`);
          onOpenChange(false);
          onSuccess?.();
        },
        onError: (error: any) => {
          toast.error(
            error?.response?.data?.message ||
              error.message ||
              "Failed to submit data",
          );
        },
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display">
            Submit Data — {useCaseName}
          </DialogTitle>
          <DialogDescription className="font-body">
            Enter today's values below. This will be recorded against this use
            case.
          </DialogDescription>
        </DialogHeader>

        {fields.length === 0 ? (
          <p className="text-sm text-muted-foreground font-body py-4">
            No input fields are configured for this use case yet.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            {fields.map((field) => (
              <div key={field.key} className="space-y-1">
                <Label className="text-[10px] text-muted-foreground uppercase tracking-wider font-body">
                  {field.label}
                  {field.unit ? ` (${field.unit})` : ""}
                  {!field.optional && (
                    <span className="text-destructive ml-0.5">*</span>
                  )}
                </Label>

                {field.type === "boolean" || field.type === "select" ? (
                  <Select
                    value={formData[field.key] ?? ""}
                    onValueChange={(value) => handleChange(field.key, value)}
                  >
                    <SelectTrigger>
                      <SelectValue
                        placeholder={`Select ${field.label.toLowerCase()}`}
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {field.options?.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <Input
                    type={
                      field.type === "date"
                        ? "date"
                        : field.type === "number"
                          ? "number"
                          : "text"
                    }
                    placeholder={field.placeholder}
                    value={formData[field.key] ?? ""}
                    onChange={(e) => handleChange(field.key, e.target.value)}
                    required={!field.optional}
                  />
                )}
              </div>
            ))}

            <DialogFooter className="pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isPending}>
                {isPending ? "Submitting..." : "Submit Data"}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
