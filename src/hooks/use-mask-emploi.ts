import { useMutation } from "@tanstack/react-query";
import { MaskEmploi } from "@/services/emploi-mask";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "./use-toast";
import { EMPLOIS_QUERY_KEY } from "@/features/Emplois/hooks/use-emplois";

const MASK_EMPLOI_QUERY_KEY = "mask-emploi";

export function useMaskEmploi(t: (key: string) => string) {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { mutate, isPending } = useMutation({
    mutationFn: (emploi_uuid: string) => MaskEmploi(emploi_uuid),
    onSuccess: async (_) => {
      // Only invalidate the specific job's data
      await queryClient.invalidateQueries({
        queryKey: [...EMPLOIS_QUERY_KEY],
      });

      // Update the masked emplois list if it exists in cache
      await queryClient.invalidateQueries({
        queryKey: [...MASK_EMPLOI_QUERY_KEY],
      });

      toast({
        variant: "success",
        title: t("toast.maskEmploi.success.title"),
        description: t("toast.maskEmploi.success.description"),
      });
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: t("toast.error.title"),
        description: t("toast.error.description"),
      });
    },
  });

  return { mutate, isPending };
}
