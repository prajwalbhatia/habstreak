import { useEffect, useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const useSnackBar = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState<"success" | "info" | "warning" | "error" | undefined>(undefined);

  useEffect(() => {
    if (open && message && type) {
      const timer = setTimeout(() => {
        setOpen(false);
        setMessage("");
        setType(undefined);
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, [open, message, type]);

  const showSnackBar = (type: "success" | "info" | "warning" | "error" | undefined, message: string) => {
    setOpen(true);
    setMessage(message);
    setType(type);
  };

  return {
    SnackbarComponent: (
      <Snackbar
        open={open && message !== ""}
        autoHideDuration={6000}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert severity={type} variant="filled" sx={{ width: "100%" }}>
          <p className="rob-med-12-primary color-white size-14">{message}</p>
        </Alert>
      </Snackbar>
    ),
    showSnackBar,
  };
};

export default useSnackBar;
