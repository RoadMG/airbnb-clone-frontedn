import {
  Box,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useForm } from "react-hook-form";

import { FaLock, FaUser } from "react-icons/fa";
import {
  IUsernameLoginError,
  IUsernameLoginSuccess,
  IUsernameLoginVariables,
  usernameLogIn,
} from "../api";
import SocialLogin from "./SocialLogin";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface IForm {
  username: string;
  password: string;
}

const LoginModal = ({ isOpen, onClose }: LoginModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IForm>();
  const toast = useToast();
  const queryClient = useQueryClient();
  const mutation = useMutation(usernameLogIn, {
    onSuccess: () => {
      toast({
        title: "welcome back!",
        status: "success",
      });
      onClose();
      queryClient.refetchQueries(["me"]);
      reset();
    },
    onError: () => {
      console.log("mutation has an error");
    },
  });
  const onSubmit = ({ username, password }: IForm) => {
    mutation.mutate({ username, password });
  };
  return (
    <Modal onClose={onClose} isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Log in</ModalHeader>
        <ModalCloseButton />
        <ModalBody as="form" onSubmit={handleSubmit(onSubmit as any)}>
          <VStack>
            <InputGroup>
              <InputLeftElement
                children={
                  <Box color="gary.500">
                    <FaUser />
                  </Box>
                }
              />
              <Input
                isInvalid={Boolean(errors.username?.message)}
                {...register("username", {
                  required: "Please write a username",
                })}
                variant={"filled"}
                placeholder="Username"
              />
            </InputGroup>
            <InputGroup>
              <InputLeftElement
                children={
                  <Box color="gary.500">
                    <FaLock />
                  </Box>
                }
              />

              <Input
                isInvalid={Boolean(errors.password?.message)}
                {...register("password", {
                  required: "Please write a password",
                })}
                type="password"
                variant={"filled"}
                placeholder="Password"
              />
            </InputGroup>
          </VStack>
          {mutation.isError ? (
            <Text textAlign={"center"} fontSize="sm" color="red.500">
              Username or Password are wrong
            </Text>
          ) : null}
          <Button
            isLoading={mutation.isLoading}
            type="submit"
            mt={4}
            w="100%"
            colorScheme={"red"}
          >
            Log in
          </Button>
          <SocialLogin />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default LoginModal;
