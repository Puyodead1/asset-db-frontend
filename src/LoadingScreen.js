import { Container } from "@mui/material";
import ClipLoader from "react-spinners/ClipLoader";

export default function LoadingScreen({ color, size, isLoading, className }) {
  return (
    <Container className="loader-container">
      <ClipLoader
        className={className}
        color={color}
        loading={isLoading}
        size={size}
      />
    </Container>
  );
}
