import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchLogin, fetchLogout, fetchUserProfile } from "../api/auth";
import { useNavigate } from "react-router-dom";

// Login Hook
export const useLogin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationKey: ["login"],
    mutationFn: fetchLogin,
    onSuccess: (data) => {
      if (data?.token) {
        localStorage.setItem("authToken", data.token);
        queryClient.invalidateQueries(["user"]);
        navigate("/home");
      }
    },
    onError: (error) => {
      console.error("Login error:", error.message);
    },
  });
};

// Logout Hook
export const useLogout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationKey: ["logout"],
    mutationFn: fetchLogout,
    onSuccess: () => {
      localStorage.removeItem("authToken");
      queryClient.clear();
      navigate("/login");
    },
    onError: (error) => {
      console.error("Logout error:", error.message);
    },
  });
};

// Fetch User Profile Hook
export const useUserProfile = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: fetchUserProfile,
    staleTime: 5 * 60 * 1000,
  });
};
