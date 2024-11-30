import React, { useState, useEffect } from "react";
import { CircularProgress, Grid, Typography } from "@mui/material";
import ListingCard from "../ListingCard/ListingCard";
import { list } from "../../frontend-ctrl/api-listing"; // Assuming this function fetches all listings
import { useAuth } from "../../helpers/auth-context"; // Assuming you have a context for user authentication
import "./MyListings.css";

const MyListings = () => {
  const { isAuthenticated } = useAuth(); // Get authentication state (make sure `useAuth` provides this)
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      setLoading(false);
      return;
    }

    const abortController = new AbortController();
    const signal = abortController.signal;

    const fetchListings = async () => {
      try {
        const data = await list(signal);
        if (data.error) {
          console.error("Error fetching listings:", data.error);
        } else {
          const userListings = data.filter(
            (listing) => listing.postedBy._id === isAuthenticated.user._id
          );
          setListings(userListings);
        }
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Failed to fetch listings:", err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchListings();

    return () => {
      abortController.abort();
    };
  }, [isAuthenticated]);

  return (
    <div className="listing-list-container">
      {loading ? (
        <div style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}>
          <CircularProgress />
        </div>
      ) : listings.length > 0 ? (
        <>

        <h3>My Listings</h3>
        <Grid container justifyContent="center" alignItems="center">
          {listings.map((listing) => (
            <Grid item xs={12} sm={6} md={4} sx={{mb: -3, ml: -3}}key={listing._id}>
              <ListingCard listing={listing} />
            </Grid>
          ))}
        </Grid>
        </>
      ) : (
        <Typography
          variant="h6"
          color="textSecondary"
          align="center"
          style={{ marginTop: "50px" }}
        >
          You have no listings posted.
        </Typography>
      )}
    </div>
  );
};

export default MyListings;
