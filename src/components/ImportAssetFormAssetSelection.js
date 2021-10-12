import React, { Component } from "react";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

export default class ImportAssetFormAssetSelection extends Component {
  render() {
    const { values, searchResults, handleChange, selectAsset } = this.props;
    return (
      <React.Fragment>
        <DialogTitle>Import Asset from Unreal Engine Marketplace</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Start typing to search for an asset, use the select button to select
            the asset.
          </DialogContentText>
          <TextField
            pt={2}
            autoFocus
            id="query"
            label="Asset Name"
            fullWidth
            variant="filled"
            onChange={handleChange("searchQuery")}
          />

          <Grid container direction="row" pt={2}>
            {searchResults.map((asset) => {
              return (
                <Grid item xs={3} p={1} key={asset.urlSlug}>
                  <Card
                    raised
                    sx={{
                      height: 650,
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <CardContent sx={{ flex: 10 }}>
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
                                  <Chip label={category.name} color="info" />
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
                          <Button
                            variant="contained"
                            sx={{ alignSelf: "flex-end" }}
                            onClick={selectAsset(asset)}
                          >
                            Select
                          </Button>
                        </Grid>
                      </Grid>
                    </CardActions>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </DialogContent>
        <DialogActions style={{ display: "flex", justifyContent: "center" }}>
          <Button onClick={this.props.close} color="error" variant="outlined">
            Cancel
          </Button>
        </DialogActions>
      </React.Fragment>
    );
  }
}
