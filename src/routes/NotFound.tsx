import { Button, Heading, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <VStack bg={"gray.100"} minHeight="100vh" justifyContent={"center"}>
      <Heading>Page not found</Heading>
      <Text>It seems that you're lost.</Text>
      <Link to="/">
        <Button colorScheme={"messenger"} variant={"link"}>
          Go Home &rarr;
        </Button>
      </Link>
    </VStack>
  );
};

export default NotFound;
