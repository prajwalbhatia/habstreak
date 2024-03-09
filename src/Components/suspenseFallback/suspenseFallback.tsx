import { Skeleton } from "@mui/material";

const SuspenseFallback = () => {
  return (
    <>
      <Skeleton variant="rounded" sx={{margin : '25px'}} width={"97vw"} height={"30vh"} />
      <Skeleton variant="rounded" sx={{margin : '25px'}} width={"97vw"} height={"30vh"} />
      <Skeleton variant="rounded" sx={{margin : '25px'}} width={"97vw"} height={"30vh"} />

    </>
  );
};

export default SuspenseFallback;
