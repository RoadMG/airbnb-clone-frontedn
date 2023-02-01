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

import { FaUserSecret, FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { IUserSignInterface, usernameSignUp } from "../api";
import SocialLogin from "./SocialLogin";

interface SignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SignUpModal = ({ isOpen, onClose }: SignUpModalProps) => {
  const toast = useToast();
  const queryclient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IUserSignInterface>();
  const mutation = useMutation(usernameSignUp, {
    onSuccess: () => {
      toast({
        title: "welcome!",
        status: "success",
      });
      onClose();
      queryclient.refetchQueries(["me"]);
    },
    onError: () => {
      reset();
    },
  });

  const onSubmit = ({
    name,
    username,
    email,
    password,
  }: IUserSignInterface) => {
    mutation.mutate({ name, username, email, password });
  };

  return (
    <Modal onClose={onClose} isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Sign up</ModalHeader>
        <ModalCloseButton />
        <ModalBody as="form" onSubmit={handleSubmit(onSubmit as any)}>
          <VStack>
            <InputGroup>
              <InputLeftElement
                children={
                  <Box color="gary.500">
                    <FaUserSecret />
                  </Box>
                }
              />
              <Input
                isInvalid={Boolean(errors.name?.message)}
                {...register("name", { required: "Please write your name" })}
                variant={"filled"}
                placeholder="Name"
              />
            </InputGroup>
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
                  required: "Please write your username",
                })}
                variant={"filled"}
                placeholder="Username"
              />
            </InputGroup>
            <InputGroup>
              <InputLeftElement
                children={
                  <Box color="gary.500">
                    <FaEnvelope />
                  </Box>
                }
              />
              <Input
                isInvalid={Boolean(errors.email?.message)}
                {...register("email", { required: "Please write your email" })}
                variant={"filled"}
                placeholder="Email"
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
                variant={"filled"}
                placeholder="Password"
                type="password"
              />
            </InputGroup>
          </VStack>
          {mutation.isError ? (
            <Text color="red.500" textAlign={"center"}>
              Something is wrong
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

export default SignUpModal;
