import { useState } from "react";
import { Plus, Database, Search } from "lucide-react";
import { useAllUseCases } from "@/hooks/useUseCase";
import { UseCaseForm } from "@/components/UseCaseForm";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";

export default function UseCaseManagement() {
  const { data: res, isLoading, refetch } = useAllUseCases();
  const useCases = res?.data || [];
  
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingUseCase, setEditingUseCase] = useState<any | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleCreate = () => {
    setEditingUseCase(null);
    setIsDrawerOpen(true);
  };

  const handleEdit = (uc: any) => {
    setEditingUseCase(uc);
    setIsDrawerOpen(true);
  };

  const filteredUseCases = useCases.filter((uc: any) => 
    (uc.useCaseName || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
    (uc.category || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-background">
      {/* Header */}
      <header className="border-b border-border px-6 py-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-foreground">
            <Database size={16} />
          </div>
          <div>
            <h1 className="font-display text-lg font-bold text-foreground">Use Case Management</h1>
            <p className="text-xs text-muted-foreground font-body mt-0.5">
              Create, edit, and assign use cases
            </p>
          </div>
        </div>
        <button
          onClick={handleCreate}
          className="bg-foreground text-background font-display text-xs font-semibold px-4 py-2 hover:bg-foreground/90 transition-colors flex items-center gap-2 rounded-sm tracking-wide"
        >
          <Plus size={14} />
          ADD USE CASE
        </button>
      </header>

      {/* Toolbar */}
      <div className="p-6 pb-0 shrink-0">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
          <Input 
            placeholder="Search use cases..." 
            className="pl-9 bg-secondary/50 border-border font-body text-sm rounded-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Main Content - Table */}
      <div className="flex-1 overflow-auto p-6">
        {isLoading ? (
          <div className="text-muted-foreground font-display text-sm">Loading use cases...</div>
        ) : (
          <div className="border border-border rounded-sm overflow-hidden bg-background shadow-sm">
            <table className="w-full text-sm font-display text-left">
              <thead className="bg-secondary/50 border-b border-border">
                <tr>
                  <th className="px-4 py-3 font-semibold text-muted-foreground">ID</th>
                  <th className="px-4 py-3 font-semibold text-muted-foreground">Name</th>
                  <th className="px-4 py-3 font-semibold text-muted-foreground">Provider</th>
                  <th className="px-4 py-3 font-semibold text-muted-foreground">Category</th>
                  <th className="px-4 py-3 font-semibold text-muted-foreground text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredUseCases.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-4 py-8 text-center text-muted-foreground font-body">
                      No use cases found. Click 'Add Use Case' to create one.
                    </td>
                  </tr>
                ) : (
                  filteredUseCases.map((uc: any) => (
                    <tr key={uc.id || uc.useCaseId} className="hover:bg-secondary/20 transition-colors">
                      <td className="px-4 py-3 text-muted-foreground font-medium text-xs">
                        {(uc.id || uc.useCaseId || "").substring(0, 8)}
                      </td>
                      <td className="px-4 py-3 font-semibold text-foreground">{uc.useCaseName || uc.name}</td>
                      <td className="px-4 py-3 text-muted-foreground">{uc.useCaseProvider || "—"}</td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-secondary text-foreground">
                          {uc.category}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button onClick={() => handleEdit(uc)} className="text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors mr-3">Edit</button>
                        <button className="text-xs font-semibold text-alert hover:text-alert/80 transition-colors">Delete</button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Form Drawer */}
      <Sheet open={isDrawerOpen} onOpenChange={(open) => {
        setIsDrawerOpen(open);
        if (!open) setEditingUseCase(null);
      }}>
        <SheetContent side="right" className="w-[500px] sm:w-[600px] overflow-y-auto bg-background border-border">
          <SheetHeader className="mb-6">
            <SheetTitle className="font-display text-xl font-bold">
              {editingUseCase ? "Edit Use Case" : "Create New Use Case"}
            </SheetTitle>
            <SheetDescription className="font-body text-sm">
              {editingUseCase 
                ? "Update the details for this use case. Note: Images cannot be updated via this form." 
                : "Fill in the details below to add a new use case to the system."}
            </SheetDescription>
          </SheetHeader>
          
          <UseCaseForm 
            initialData={editingUseCase}
            onCancel={() => {
              setIsDrawerOpen(false);
              setEditingUseCase(null);
            }}
            onSuccess={() => {
              setIsDrawerOpen(false);
              setEditingUseCase(null);
              refetch(); // Refresh the table
            }}
          />
        </SheetContent>
      </Sheet>
    </div>
  );
}
