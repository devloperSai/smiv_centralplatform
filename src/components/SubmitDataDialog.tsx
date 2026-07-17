import { useEffect, useState } from "react";
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
import { toast } from "sonner";
import { useAddTelemetry } from "@/hooks/useUseCase";

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
  editableFields: EditableField[];
  onSuccess?: () => void;
}

export function SubmitDataDialog({
  open,
  onOpenChange,
  assignmentId,
  entityId,
  useCaseName,
  editableFields,
  onSuccess,
}: SubmitDataDialogProps) {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const { mutate: addTelemetry, isPending } = useAddTelemetry();

  useEffect(() => {
    if (open) {
      const initial: Record<string, string> = {};
      editableFields.forEach((f) => (initial[f.key] = ""));
      setFormData(initial);
    }
  }, [open, editableFields]);

  const handleChange = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!entityId) {
      toast.error("No entity found for this use case. Cannot submit data.");
      return;
    }

    // Coerce number fields to actual numbers before posting
    const payload: Record<string, any> = {};
    editableFields.forEach((f) => {
      const raw = formData[f.key];
      payload[f.key] = f.type === "number" ? Number(raw) : raw;
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
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display">
            Submit Data — {useCaseName}
          </DialogTitle>
          <DialogDescription className="font-body">
            Enter today's values below. This will be recorded against this use
            case.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-3">
          {editableFields.map((field) => (
            <div key={field.key} className="space-y-1">
              <Label className="text-[10px] text-muted-foreground uppercase tracking-wider font-body">
                {field.label}
              </Label>
              <Input
                type={
                  field.type === "date"
                    ? "date"
                    : field.type === "number"
                      ? "number"
                      : "text"
                }
                value={formData[field.key] ?? ""}
                onChange={(e) => handleChange(field.key, e.target.value)}
                required
              />
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
      </DialogContent>
    </Dialog>
  );
}
