import { useMutation } from "@tanstack/react-query";
import { sendSupportTicket } from "../services/support-ticket";
import { useToast } from "@/hooks/use-toast";

export function useSendSupportTicket(t: (key: string) => string) {
  const { toast } = useToast();
  const { mutate, isPending } = useMutation({
    mutationFn: sendSupportTicket,
    onSuccess: () => {
      toast({
        variant: "success",
        title: t("toast.success.title"),
        description: t("toast.success.description"),
      });
    },
    onError: () => {
      toast({
        title: "Failed to send support ticket",
        description: "Please try again",
      });
    },
  });
  return { mutate, isPending };
}
