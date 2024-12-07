import React, { useState, useEffect } from "react";
import { CircularProgress, Grid, Typography, Box } from "@mui/material";
import ListingCard from "../ListingCard/ListingCard";
import { list } from "../../frontend-ctrl/api-listing";
import logo from "../../assets/logo.png"
import "./Home.css";

const Home = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    const fetchListings = async () => {
      try {
        const data = await list(signal);
        if (data.error) {
          console.error("Error fetching listings:", data.error);
        } else {
          setListings(data);
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
  }, []);

  return (
    <div className="listing-list-container">
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        sx={{ padding: 2}}
      >
        <img
          src={logo}
          alt="CanTrade Logo"
          style={{ width: "50px", height: "50px", marginRight: "10px" }}
        />
        <Typography variant="h4" component="div" fontWeight="bold">
          CanTrade
        </Typography>
      </Box>      
      {loading ? (
        <div style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}>
          <CircularProgress />
        </div>
      ) : listings.length > 0 ? (
        <>
          <Grid container justifyContent="center" alignItems="center">
            {listings.map((listing) => (
              <Grid item xs={12} sm={6} md={4} sx={{ mb: -3, ml: -3 }} key={listing._id}>
                <ListingCard listing={listing} />
              </Grid>
            ))}
          </Grid>
        </>
      ) : (
        <Typography variant="h6" color="textSecondary" align="center">
          No listings available at the moment.
        </Typography>
      )}
    </div>
  );
};

export default Home;
