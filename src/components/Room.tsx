import {
  Box,
  Button,
  Grid,
  HStack,
  Image,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { FaRegHeart, FaStar } from "react-icons/fa";

const Room = () => {
  const gray = useColorModeValue("gray.600", "gray.300");
  return (
    <VStack spacing={-0.5} alignItems={"flex-start"}>
      <Box position={"relative"} overflow={"hidden"} mb={3} rounded={"2xl"}>
        <Image
          minH="280"
          src="https://a0.muscache.com/im/pictures/miso/Hosting-659600087552092324/original/45fe0ffd-7569-4bad-8ccc-620d0a625c65.jpeg?im_w=720"
        />
        <Button
          variant={"unstyled"}
          position={"absolute"}
          top={0}
          right={0}
          color="white"
        >
          <FaRegHeart size={"20px"} />
        </Button>
      </Box>
      <Box w={"100%"}>
        <Grid gap={2} templateColumns={"5fr 1fr"}>
          <Text as={"b"} noOfLines={1} fontSize={"md"}>
            완산구, 전주시, 한국
          </Text>
          <HStack spacing={1} alignItems="center" _hover={{ color: "red.500" }}>
            <FaStar size={12} />
            <Text fontSize={"sm"}>5.0</Text>
          </HStack>
        </Grid>
        <Text fontSize={"sm"} color={gray}>
          한국
        </Text>
        <Text fontSize={"sm"}>
          <Text as={"b"}>$72</Text> /night
        </Text>
      </Box>
    </VStack>
  );
};

export default Room;
