import { Grid } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";

import { getRooms } from "../api";
import Room from "../components/Room";
import RoomSkeleton from "../components/RoomSkeleton";
import { IRoomList } from "../types";

const Home = () => {
  //userQuery([key],APIfunction)
  const { isLoading, data } = useQuery<IRoomList[]>(["rooms"], getRooms);

  return (
    <Grid
      mt={10}
      px={{
        base: 10,
        lg: 20,
      }}
      columnGap={4}
      rowGap={10}
      templateColumns={{
        base: "1fr",
        md: "1fr 1fr",
        lg: "repeat(3,1fr)",
        xl: "repeat(4,1fr)",
        "2xl": "repeat(5,1fr)",
      }}
    >
      {isLoading ? (
        <>
          <RoomSkeleton />
          <RoomSkeleton />
          <RoomSkeleton />
          <RoomSkeleton />
          <RoomSkeleton />
          <RoomSkeleton />
        </>
      ) : null}

      {data?.map((room) => (
        <Room
          key={room.pk}
          pk={room.pk}
          imageUrl={room.photos[0]?.file}
          name={room.name}
          rating={room.rating}
          city={room.city}
          country={room.country}
          price={room.price}
          isOwner={room.is_owner}
        />
      ))}
    </Grid>
  );
};

export default Home;
