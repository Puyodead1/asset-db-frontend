import React, { Component } from "react";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

export default class ImportAssetFormSuccess extends Component {
  componentDidMount() {
    this.props.setStyle({ textAlign: "center" });
  }

  render() {
    const { values } = this.props;
    const { asset } = values;

    return (
      <React.Fragment>
        <DialogTitle>Success</DialogTitle>
        <DialogContent>
          <DialogContentText className="importasset-form-loader-wrapper">
            Successfully imported {asset.title}!
          </DialogContentText>
        </DialogContent>

        <DialogActions style={{ display: "flex", justifyContent: "center" }}>
          <Button onClick={this.props.close} color="primary" variant="outlined">
            Close
          </Button>
        </DialogActions>
      </React.Fragment>
    );
  }
}
