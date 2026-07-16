import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { useCreateUseCase, useUpdateUseCase } from "@/hooks/useUseCase";

interface UseCaseFormProps {
  initialData?: any;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function UseCaseForm({ initialData, onSuccess, onCancel }: UseCaseFormProps) {
  const [formData, setFormData] = useState({
    useCaseName: "",
    useCaseProvider: "",
    description: "",
    category: "",
    subcategory: "",
  });

  const [files, setFiles] = useState<{
    logoImage: File | null;
    iconImage: File | null;
    dashboardImage: File | null;
  }>({
    logoImage: null,
    iconImage: null,
    dashboardImage: null,
  });

  const { mutateAsync: createUseCase, isPending: isCreating } = useCreateUseCase();
  const { mutateAsync: updateUseCase, isPending: isUpdating } = useUpdateUseCase();
  const isPending = isCreating || isUpdating;

  useEffect(() => {
    if (initialData) {
      setFormData({
        useCaseName: initialData.useCaseName || initialData.name || "",
        useCaseProvider: initialData.useCaseProvider || "",
        description: initialData.description || "",
        category: initialData.category || "",
        subcategory: initialData.subcategory || "",
      });
    }
  }, [initialData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, name: keyof typeof files) => {
    if (e.target.files && e.target.files.length > 0) {
      setFiles((prev) => ({ ...prev, [name]: e.target.files![0] }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.category) {
      toast.error("Please select a category");
      return;
    }

    if (initialData) {
      // Update logic: send JSON body
      try {
        const id = initialData.id || initialData.useCaseId;
        await updateUseCase({ id, data: formData });
        toast.success("Use case updated successfully!");
        if (onSuccess) onSuccess();
      } catch (error) {
        console.error(error);
        toast.error("Failed to update use case");
      }
    } else {
      // Create logic: send multipart/form-data
      const payload = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        payload.append(key, value);
      });

      if (files.logoImage) payload.append("logoImage", files.logoImage);
      if (files.iconImage) payload.append("iconImage", files.iconImage);
      if (files.dashboardImage) payload.append("dashboardImage", files.dashboardImage);

      try {
        await createUseCase(payload);
        toast.success("Use case created successfully!");
        if (onSuccess) onSuccess();
      } catch (error) {
        console.error(error);
        toast.error("Failed to create use case");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="useCaseName">Use Case Name *</Label>
          <Input id="useCaseName" name="useCaseName" value={formData.useCaseName} onChange={handleInputChange} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="useCaseProvider">Use Case Provider *</Label>
          <Input id="useCaseProvider" name="useCaseProvider" value={formData.useCaseProvider} onChange={handleInputChange} required />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description *</Label>
        <Textarea id="description" name="description" value={formData.description} onChange={handleInputChange} required />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="category">Category *</Label>
          <Select value={formData.category} onValueChange={(value) => handleSelectChange("category", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="iot">IoT</SelectItem>
              <SelectItem value="non-iot">Non-IoT</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="subcategory">Subcategory</Label>
          <Input id="subcategory" name="subcategory" value={formData.subcategory} onChange={handleInputChange} />
        </div>
      </div>

      {!initialData && (
        <div className="grid grid-cols-3 gap-4 border-t border-border pt-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="logoImage" className="text-xs">Logo</Label>
            <Input id="logoImage" type="file" accept="image/*" onChange={(e) => handleFileChange(e, "logoImage")} className="text-xs" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="iconImage" className="text-xs">Icon</Label>
            <Input id="iconImage" type="file" accept="image/*" onChange={(e) => handleFileChange(e, "iconImage")} className="text-xs" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="dashboardImage" className="text-xs">Dashboard</Label>
            <Input id="dashboardImage" type="file" accept="image/*" onChange={(e) => handleFileChange(e, "dashboardImage")} className="text-xs" />
          </div>
        </div>
      )}

      <div className="flex justify-end gap-3 pt-6 border-t border-border mt-4">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button type="submit" disabled={isPending}>
          {isPending ? "Saving..." : initialData ? "Update Use Case" : "Create Use Case"}
        </Button>
      </div>
    </form>
  );
}
