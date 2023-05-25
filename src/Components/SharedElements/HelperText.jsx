import { Typography } from "@mui/material";

const HelperText = ({ falseValidator, helpMessage }) => {
  return (
    <>
      {falseValidator && (
        <Typography
          mb={2}
          textAlign="center"
          fontSize="0.8rem"
          fontWeight="700"
          color="red"
          fontStyle="italic"
        >
          {helpMessage}
        </Typography>
      )}
    </>
  );
};

export default HelperText;
