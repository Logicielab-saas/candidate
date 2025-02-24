import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Eye,
  FileText,
  MoreVertical,
  Download,
  Upload,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRef, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { handleDownloadCV } from "@/core/utils/download-cv";

interface ResumeItemProps {
  title: string;
  subtitle: string;
}

export function ResumeItem({ title, subtitle }: ResumeItemProps) {
  const CV_URL = "/cvs/mycv.pdf";
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleChangeCV = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check if file is PDF
    if (file.type !== "application/pdf") {
      toast({
        variant: "destructive",
        title: "Invalid file type",
        description: "Please upload a PDF file",
      });
      return;
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        variant: "destructive",
        title: "File too large",
        description: "Maximum file size is 5MB",
      });
      return;
    }

    try {
      // TODO: upload the file to your server
      // For now, we'll just show a success message
      toast({
        title: "CV updated successfully",
        description: "Your CV has been updated",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error updating CV",
        description: "There was an error updating your CV. Please try again.",
      });
      console.log(error);
    }

    // Clear the input
    event.target.value = "";
  };

  const handleDelete = async () => {
    try {
      // TODO: delete the file from your server
      // For now, we'll just show a success message
      toast({
        title: "CV deleted successfully",
        description: "Your CV has been deleted",
      });
      setIsDeleteDialogOpen(false);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error deleting CV",
        description: "There was an error deleting your CV. Please try again.",
      });
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-between rounded-lg border p-4">
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept=".pdf"
        onChange={handleFileChange}
      />

      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
          <FileText className="h-5 w-5 text-muted-foreground" />
        </div>
        <div>
          <p className="font-medium">{title}</p>
          <p className="text-xs text-muted-foreground">{subtitle}</p>
        </div>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem className="flex items-center" asChild>
            <Link href="/profile/resume">
              <Eye className="mr-2 h-4 w-4" />
              View CV
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleDownloadCV(CV_URL)}>
            <Download className="mr-2 h-4 w-4" />
            Download CV
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleChangeCV}>
            <Upload className="mr-2 h-4 w-4" />
            Change CV
          </DropdownMenuItem>
          <AlertDialog
            open={isDeleteDialogOpen}
            onOpenChange={setIsDeleteDialogOpen}
          >
            <AlertDialogTrigger asChild>
              <DropdownMenuItem
                className="text-destructive focus:text-destructive"
                onSelect={(e) => {
                  e.preventDefault();
                }}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete CV
              </DropdownMenuItem>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your CV.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDelete}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
