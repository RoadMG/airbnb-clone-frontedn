import {
  Button,
  Heading,
  Spinner,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { kakaoLogin } from "../api";

const KakaoConfirm = () => {
  const { search } = useLocation();
  const toast = useToast();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const mutation = useMutation(kakaoLogin, {
    onSuccess: () => {
      toast({
        status: "success",
        title: "Welcome!",
        position: "bottom-right",
        description: "Happy to have you back!",
      });
      queryClient.refetchQueries(["me"]);
      navigate("/");
    },
    onError: () => {
      console.log("Mutation has an error!");
    },
  });
  const confirmLogin = async () => {
    const params = new URLSearchParams(search);
    const code = params.get("code");
    if (code) {
      mutation.mutate(code);
    }
  };
  useEffect(() => {
    confirmLogin();
  }, []);
  return (
    <VStack mt={40} justifyContent={"center"}>
      <Heading>Processing log in.</Heading>
      <Text>Don't go anywhere.</Text>
      <Spinner size={"lg"} />
    </VStack>
  );
};

export default KakaoConfirm;
