import React from "react";
import { useFavourites } from "../../helpers/FavouritesContext";
import ListingCard from "../ListingCard/ListingCard";
import { Typography, Grid, Box } from "@mui/material";

export default function Favourites() {
  const { favourites, removeFromFavourites } = useFavourites();

  return (
    <Box sx={{ padding: "2rem", margin: "0 auto" }}>
      <Typography variant="h4" gutterBottom>
        Your Favourites
      </Typography>
      {favourites.length === 0 ? (
        <Typography variant="body1">You have no items in your favourites.</Typography>
      ) : (
        <Grid container spacing={3}>
          {favourites.map((listing) => (
            <Grid item xs={12} sm={6} md={4} key={listing._id}>
              <ListingCard
                listing={listing}
                onRemoveFromFavourites={() => removeFromFavourites(listing._id)}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}
