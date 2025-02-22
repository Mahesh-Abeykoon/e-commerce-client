// import { useMutation } from '@tanstack/react-query';
// import { END_POINTS } from '../api/end-points';
// import fetchWithAuthorization from '../api/fetch-with-authorization';

// export const useLogin = () => {
//   return useMutation(({ email, password }) => fetchWithAuthorization({
//     path: END_POINTS.AUTH.SIGN_IN,
//     method: 'POST',
//     body: { email, password },
//   }));
// };

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchLogin } from "../../api/login";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationKey: ["login"],
    mutationFn: fetchLogin,
    onSuccess: (data) => {
      if (data?.token) {
        localStorage.setItem("authToken", data.token); // Store token
        queryClient.invalidateQueries(["user"]);
        navigate("/home"); // Redirect to home page
      }
    },
    onError: (error) => {
      console.error("Login error:", error.message);
    },
  });
};
