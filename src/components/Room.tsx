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
import { Link } from "react-router-dom";

interface IRoomProps {
  imageUrl: string;
  name: string;
  rating: number;
  city: string;
  country: string;
  price: number;
  pk: number;
}

const Room = ({
  pk,
  imageUrl,
  name,
  rating,
  city,
  country,
  price,
}: IRoomProps) => {
  const gray = useColorModeValue("gray.600", "gray.300");
  return (
    <Link to={`rooms/${pk}`}>
      <VStack spacing={-0.5} alignItems={"flex-start"}>
        <Box position={"relative"} overflow={"hidden"} mb={3} rounded={"2xl"}>
          <Image minH="280" src={imageUrl} />
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
              {name}
            </Text>
            <HStack
              spacing={1}
              alignItems="center"
              _hover={{ color: "red.500" }}
            >
              <FaStar size={12} />
              <Text fontSize={"sm"}>{rating}</Text>
            </HStack>
          </Grid>
          <Text fontSize={"sm"} color={gray}>
            {city}, {country}
          </Text>
          <Text fontSize={"sm"}>
            <Text as={"b"}>${price}</Text> /night
          </Text>
        </Box>
      </VStack>
    </Link>
  );
};

export default Room;
