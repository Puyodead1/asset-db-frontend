import React, { Component } from "react";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";

export default class ImportAssetFormError extends Component {
  componentDidMount() {
    this.props.setStyle({ textAlign: "center" });
  }

  render() {
    const { values } = this.props;
    const { asset, error } = values;

    return (
      <React.Fragment>
        <DialogTitle>Error</DialogTitle>
        <DialogContent>
          <DialogContentText className="importasset-form-loader-wrapper">
            An error occurred while attempting to import <b>{asset.title}</b>!
          </DialogContentText>
          <Typography variant="body1">
            {error.toString() || "Unknown"}
          </Typography>
        </DialogContent>

        <DialogActions style={{ display: "flex", justifyContent: "center" }}>
          <Button onClick={this.props.close} color="error" variant="outlined">
            Close
          </Button>
        </DialogActions>
      </React.Fragment>
    );
  }
}
