import React, { Component } from "react";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import ClipLoader from "react-spinners/ClipLoader";

export default class ImportAssetFormImport extends Component {
  componentDidMount() {
    this.props.setStyle({ textAlign: "center" });

    setTimeout(() => {
      this.props.nextStep();
    }, 2 * 1000);
  }

  render() {
    const { values } = this.props;
    const { asset } = values;

    return (
      <React.Fragment>
        <DialogTitle>Importing {asset.title}</DialogTitle>
        <DialogContent>
          <DialogContentText className="importasset-form-loader-wrapper">
            <div>Please wait... </div>
            <div className="importasset-form-loader">
              <ClipLoader color="#fff" loading={true} size={12} />
            </div>
          </DialogContentText>
        </DialogContent>
      </React.Fragment>
    );
  }
}
