import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";

export default function ImportDialog({ isOpen, handleClose }) {
  const [query, setQuery] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  const handleSearch = () => {
    setLoading(true);
  };

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Import Asset</DialogTitle>
      <DialogContent>
        <DialogContentText>Search for an asset by name.</DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="query"
          label="Asset Name"
          type="text"
          fullWidth
          color="primary"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSearch} color="primary" disabled={isLoading}>
          {isLoading ? (
            <ClipLoader loading={isLoading} size={25} />
          ) : (
            "Subscribe"
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
