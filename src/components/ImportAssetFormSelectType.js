import React, { Component } from "react";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";

export default class ImportAssetFormSelectType extends Component {
  componentDidMount() {
    this.props.setStyle({ textAlign: "center" });
  }

  render() {
    const { values, handleChange, close, nextStep } = this.props;
    const { asset } = values;

    return (
      <React.Fragment>
        <DialogTitle>What type of asset is this?</DialogTitle>
        <DialogContent>
          <DialogContentText className="importasset-form-loader-wrapper">
            <Grid container direction="row" pt={2} justifyContent="center">
              <Grid item xs={3} p={1}>
                <Card
                  raised
                  sx={{
                    maxHeight: 650,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <CardContent sx={{ flex: 2 }}>
                    <Typography variant="h5" sx={{ fontSize: 18 }}>
                      {asset.title}
                    </Typography>
                    <Typography
                      sx={{ fontSize: 14 }}
                      color="text.secondary"
                      gutterBottom
                    >
                      {asset.seller.name}
                    </Typography>

                    <CardMedia
                      component="img"
                      src={asset.thumbnail}
                      height={284}
                      width={284}
                    />

                    <Typography
                      sx={{ fontSize: 14 }}
                      color="text.secondary"
                      gutterBottom
                      pt={2}
                      textAlign="center"
                    >
                      {asset.description}
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ flex: 1, flexDirection: "column" }}>
                    <Grid container>
                      <Grid container>
                        <Grid
                          container
                          direction="row"
                          justifyContent="space-around"
                          alignItems="center"
                          p={2}
                        >
                          {asset.categories.map((category) => {
                            return (
                              <Grid item>
                                <Chip
                                  label={category.name}
                                  color="info"
                                  key={category.path}
                                />
                              </Grid>
                            );
                          })}
                          <Grid item>
                            <Chip
                              label={
                                asset.compatibleApps.length === 1
                                  ? asset.compatibleApps[0]
                                  : `${asset.compatibleApps[0]}-${
                                      asset.compatibleApps[
                                        asset.compatibleApps.length - 1
                                      ]
                                    }`
                              }
                              color="secondary"
                            />
                          </Grid>
                        </Grid>
                      </Grid>

                      <Grid
                        item
                        sx={{
                          display: "flex",
                          flex: 1,
                          justifyContent: "center",
                        }}
                      >
                        <FormControl fullWidth>
                          <InputLabel id="asset-type-select-label">
                            Asset Type
                          </InputLabel>
                          <Select
                            labelId="asset-type-select-label"
                            id="asset-type-select"
                            value={values.type}
                            label="Age"
                            onChange={handleChange("type")}
                            required
                          >
                            <MenuItem value="Plugin">Engine Plugin</MenuItem>
                            <MenuItem value="3D Asset">3D Asset</MenuItem>
                            <MenuItem value="2D Asset">2D Asset</MenuItem>
                            <MenuItem value="SFX">SFX</MenuItem>
                            <MenuItem value="VFX">VFX</MenuItem>
                            <MenuItem value="Other">Other</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                    </Grid>
                  </CardActions>
                </Card>
              </Grid>
            </Grid>
          </DialogContentText>
        </DialogContent>

        <DialogActions style={{ display: "flex", justifyContent: "center" }}>
          <Button
            onClick={nextStep}
            color="primary"
            variant="contained"
            size="large"
            disabled={!values.type}
          >
            Import
          </Button>
          <Button onClick={close} color="error" variant="outlined">
            Cancel
          </Button>
        </DialogActions>
      </React.Fragment>
    );
  }
}
