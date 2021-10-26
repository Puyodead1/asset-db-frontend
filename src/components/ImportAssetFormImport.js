import React, { Component } from "react";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import ClipLoader from "react-spinners/ClipLoader";

export default class ImportAssetFormImport extends Component {
  state = {
    loading: true,
    asset: this.props.values.asset,
  };

  componentDidMount() {
    this.props.setStyle({ textAlign: "center" });
    const body = {
      title: this.state.asset.title,
      description: this.state.asset.description,
      images: this.state.asset.keyImages.map((image) => {
        return {
          url: image.url,
          type: image.type,
          height: image.height,
          width: image.width,
        };
      }),
      tags: this.state.asset.categories,
      type: this.props.values.type,
      category: "UE4",
    };

    console.log(body);

    fetch("http://localhost:5000/api/v1/assets/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.props.user.token}`,
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((asset) => {
        this.props.addAsset(asset);
        this.props.nextStep();
      })
      .catch((e) => {
        this.props.importError(e);
      });
  }

  render() {
    const { asset } = this.state;

    return (
      <React.Fragment>
        <DialogTitle>Importing {asset.title}</DialogTitle>
        <DialogContent>
          <DialogContentText className="importasset-form-loader-wrapper">
            <span>Please wait... </span>
            <span className="importasset-form-loader">
              <ClipLoader color="#fff" loading={true} size={12} />
            </span>
          </DialogContentText>
        </DialogContent>
      </React.Fragment>
    );
  }
}
