import React, { useState, useEffect } from "react";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Dialog from "@mui/material/Dialog";

import ClipLoader from "react-spinners/ClipLoader";
import ImageGallery from "react-image-gallery";

import UE4Logo from "./UE4Logo";
import ImportAssetForm from "./components/ImportAssetForm";

export default function MainScreen({ user, logout }) {
  const [style, setStyle] = useState({});
  const [assets, setAssets] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [isImportDialogOpen, setImportDialogOpen] = useState(false);

  const handleOpenImportDialog = () => {
    setImportDialogOpen(true);
  };

  const handleCloseImportDialog = () => {
    setImportDialogOpen(false);
  };

  useEffect(() => {
    fetch("http://localhost:5000/api/v1/assets", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.error) return console.error(json.error);
        if (json.errors) return console.error(json.errors);

        const items = [];

        // process the json into an array of jsx
        json.forEach((item) => {
          const images = item.images.map((x) => {
            return {
              original: x.url,
              thumbnail: x.url,
              originalHeight: x.height === 1080 ? 720 : x.height,
              originalWidth: x.height === 1920 ? 1080 : x.width,
              thumbnailLabel: x.type,
              originalAlt: x.type,
              originalTitle: x.type,
            };
          });
          items.push(
            <ListItem alignItems="flex-start" key={item.title}>
              <Card className="asset-card">
                <CardContent>
                  <ListItemText
                    primary={item.title}
                    secondary={
                      <React.Fragment>
                        <Typography
                          component="span"
                          variant="caption"
                          className="asset-description"
                        >
                          {item.description}
                        </Typography>
                      </React.Fragment>
                    }
                  />

                  <ImageGallery
                    items={images}
                    showFullscreenButton={false}
                    showPlayButton={false}
                    lazyLoad={true}
                  />

                  <Grid
                    container
                    direction="row"
                    alignContent="center"
                    justifyContent="center"
                  >
                    <Grid item xs={1}>
                      <Chip label={item.type} />
                    </Grid>

                    <Grid item xs={1}>
                      <Chip label={item.category} color="primary" />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </ListItem>
          );
        });
        setAssets(items);
        setLoading(false);
      })
      .catch(console.error);
  }, [user]);

  return (
    <Box className="main-wrapper">
      <Grid container className="sidebar" direction="column">
        <Grid item className="sidebar-griditem">
          <span className="sidebar-itemsurface text-center">
            {user.username}
          </span>
        </Grid>

        <Divider />

        <Grid item className="sidebar-griditem">
          <Button
            variant="contained"
            color="primary"
            onClick={handleOpenImportDialog}
          >
            Import from {<UE4Logo />}
          </Button>
        </Grid>

        <Grid item className="sidebar-griditem">
          <Button variant="contained" color="error" onClick={logout}>
            Logout
          </Button>
        </Grid>
      </Grid>
      <List className="content">
        {isLoading ? (
          <ClipLoader color="primary" loading={isLoading} size={150} />
        ) : (
          assets
        )}
      </List>

      <Dialog
        open={isImportDialogOpen}
        onClose={handleCloseImportDialog}
        fullWidth
        maxWidth={700}
        style={style}
      >
        <ImportAssetForm setStyle={setStyle} close={handleCloseImportDialog} />
      </Dialog>
    </Box>
  );
}
