import axiosApiInstance from '@/api/axiosInterceptor';
import * as urls from '@/constants/urlConfig';
import { useQuery } from '@tanstack/react-query';

export const getLocation = async () => {
  const response = await axiosApiInstance.get(urls.getLocation);
  return response.data;
};

const useGetLocation = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['location'],
    queryFn: getLocation,
  });

  return { data, isLoading };
};

export default useGetLocation;
