import { getUserCarrer } from "@/services/home.service";
import { useQuery } from "@tanstack/react-query";

export const useCareers = () => {
  return useQuery({
    queryKey: ["user-careers"],
    queryFn: getUserCarrer,
  });
};
