import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  GridItem,
  Heading,
  HStack,
  Image,
  Skeleton,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { FaStar } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { checkBooking, getRoomDetail, getRoomReviews } from "../api";
import { IReview, IRoomDetail } from "../types";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";

const RoomDetail = () => {
  const { roomPk } = useParams();
  const { isLoading, data } = useQuery<IRoomDetail>(
    [`rooms`, roomPk],
    getRoomDetail
  );
  const { data: reviewData } = useQuery<IReview[]>(
    ["rooms", roomPk, "reviews"],
    getRoomReviews
  );
  const [dates, setDates] = useState<Date[]>();
  const { data: checkBookingData, isLoading: isCheckBooking } = useQuery(
    [
      "check",
      roomPk,
      dates, // dates 가 바뀔 때 마다 render됨
    ],
    checkBooking,
    {
      cacheTime: 0,
      enabled: dates !== undefined,
    }
  );

  return (
    <Box
      mt={10}
      px={{
        base: 10,
        lg: 20,
      }}
      mb={20}
    >
      <Helmet>
        <title>{data ? data.name : "Loading..."}</title>
      </Helmet>
      <Skeleton height={"43px"} width={"40%"} isLoaded={!isLoading}>
        <Heading>{data?.name}</Heading>
      </Skeleton>
      <Grid
        mt={8}
        rounded="xl"
        overflow={"hidden"}
        gap={3}
        height={"60vh"}
        templateRows={"1fr 1fr"}
        templateColumns={"repeat(4, 1fr)"}
      >
        {[0, 1, 2, 3, 4].map((index) => (
          <GridItem
            colSpan={index === 0 ? 2 : 1}
            rowSpan={index === 0 ? 2 : 1}
            overflow={"hidden"}
            key={index}
          >
            <Skeleton isLoaded={!isLoading} height={"100%"} width={"100%"}>
              {data?.photos && data.photos.length > 0 ? (
                <Image
                  objectFit={"cover"}
                  w="100%"
                  h="100%"
                  src={data?.photos[index].file}
                />
              ) : null}
            </Skeleton>
          </GridItem>
        ))}
      </Grid>
      <Grid gap={60} templateColumns={"2fr 1fr"}>
        <Box>
          <HStack justifyContent={"space-between"} mt={10}>
            <VStack alignItems={"flex-start"}>
              <Skeleton isLoaded={!isLoading} height={"30px"}>
                <Heading fontSize={"2xl"}>
                  {" "}
                  Hosted by {data?.owner.username}
                </Heading>
              </Skeleton>
              <Skeleton isLoaded={!isLoading} height={"30px"}>
                <HStack justifyContent={"flex-start"} w={"100%"}>
                  <Text>
                    {data?.toilets} toielt{data?.toilets === 1 ? "" : "s"}
                  </Text>
                  <Text>•</Text>
                  <Text>
                    {data?.rooms} room{data?.rooms === 1 ? "" : "s"}
                  </Text>
                </HStack>
              </Skeleton>
            </VStack>
            <Avatar
              name={data?.owner.username}
              size={"xl"}
              src={data?.owner.avatar}
            />
          </HStack>
          <Box mt={10}>
            <Heading mb={5} fontSize={"2xl"}>
              <HStack>
                <FaStar /> <Text>{data?.rating}</Text>
                <Text>•</Text>
                <Text>
                  {reviewData?.length} review
                  {reviewData?.length === 1 ? "" : "s"}
                </Text>
              </HStack>
            </Heading>
            <Container marginX="none" maxW={"container.lg"} mt={16}>
              <Grid gap={10} templateColumns={"1fr 1fr"}>
                {reviewData?.map((review, index) => (
                  <VStack key={index} alignItems={"flex-start"}>
                    <HStack>
                      <Avatar
                        name={review.user.name}
                        src={review.user.avatar}
                        size="md"
                      />
                      <VStack spacing={0} alignItems={"flex-start"}>
                        <Heading fontSize={"md"}>{review.user.name}</Heading>
                        <HStack spacing={1}>
                          <FaStar size={"12px"} /> <Text>{review?.rating}</Text>
                        </HStack>
                      </VStack>
                    </HStack>
                    <Text>{review.payload}</Text>
                  </VStack>
                ))}
              </Grid>
            </Container>
          </Box>
        </Box>
        <Box pt={10}>
          <Calendar
            onChange={setDates}
            minDate={new Date()}
            minDetail="month"
            maxDate={new Date(Date.now() + 60 * 60 * 24 * 365 * 1000)}
            next2Label={null}
            prev2Label={null}
            selectRange
          />
          <Button
            disabled={!checkBookingData?.ok}
            isLoading={isCheckBooking}
            mt={5}
            w="100%"
            colorScheme={"red"}
          >
            {" "}
            Make booking
          </Button>
          {!isCheckBooking && !checkBookingData?.ok ? (
            <Text mt={5} textAlign={"center"} color="red.500">
              Cant' book on those dates
            </Text>
          ) : null}
        </Box>
      </Grid>
    </Box>
  );
};

export default RoomDetail;
