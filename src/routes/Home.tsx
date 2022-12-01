import { Box, Grid, Skeleton, SkeletonText } from "@chakra-ui/react";
import Room from "../components/Room";

const Home = () => {
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
      <Box>
        <Skeleton rounded={"2xl"} height={280} mb={3} />
        <SkeletonText noOfLines={3} />
      </Box>
      <Room />
    </Grid>
  );
};

export default Home;

// 196km 거리
// 1월 1일~6일
// ₩399,412
// /박
