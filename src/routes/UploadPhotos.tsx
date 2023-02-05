import {
  Box,
  Button,
  Container,
  FormControl,
  Heading,
  Input,
  Toast,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { createPhoto, getUploadURL, uploadImage } from "../api";
import useHostOnlyPage from "../components/HostOnlyPage";
import ProtectedPage from "../components/ProtectedPage";

interface IForm {
  file: FileList;
}

interface IUploadURLResponse {
  id: string;
  uploadURL: string;
}

const UploadPhotos = () => {
  const { register, handleSubmit, watch, reset } = useForm<IForm>();
  const toast = useToast();
  const createPhotoMutaion = useMutation(createPhoto, {
    onSuccess: () => {
      toast({
        status: "success",
        title: "Iamge uploaded!",
        isClosable: true,
        description: "Feel free to upload more images.",
      });
      reset();
    },
  });
  const uploadImageMutation = useMutation(uploadImage, {
    onSuccess: ({ result }: any) => {
      if (roomPk) {
        createPhotoMutaion.mutate({
          description: "I love React",
          file: `https://imagedelivery.net/yvfURjmeP6k1KpJl18HyEQ/${result.id}/public`,
          roomPk,
        });
      }
    },
  });
  const uploadURLMutation = useMutation(getUploadURL, {
    onSuccess: (data: IUploadURLResponse) => {
      uploadImageMutation.mutate({
        uploadURL: data.uploadURL,
        file: watch("file"),
      });
    },
  });
  const { roomPk } = useParams();
  useHostOnlyPage();
  const onSubmit = () => {
    uploadURLMutation.mutate();
  };
  return (
    <ProtectedPage>
      <Box pb={40} mt={10} px={{ base: 10, lg: 40 }}>
        <Container>
          <Heading textAlign={"center"}>Upload a photo</Heading>
          <VStack
            as="form"
            spacing={5}
            mt={10}
            onSubmit={handleSubmit(onSubmit)}
          >
            <FormControl>
              <Input {...register("file")} type="file" accept="image/*" />
            </FormControl>
            <Button
              isLoading={
                createPhotoMutaion.isLoading ||
                uploadImageMutation.isLoading ||
                uploadURLMutation.isLoading
              }
              type="submit"
              w="full"
              colorScheme={"red"}
            >
              Upload photos
            </Button>
          </VStack>
        </Container>
      </Box>
    </ProtectedPage>
  );
};

export default UploadPhotos;

///Tipical > User (Browser) ===> Sever ===> Storage Service <- unefficient
// Cloud > User --- Upload URL ---> Server ---> Upload URL(Reserved space) ----> CF
// User --- File(URL)  ----> CF : 브라우저가 서버에 파일을 업로드 할 URL을 요청 cloudflare 가 URL만 줌
//
