import React, { useState, useEffect } from 'react';
import { CircularProgress, Grid, Typography } from '@mui/material'; // Ensure these are installed via @mui/material
import ListingCard from '../ListingCard/ListingCard'; // Make sure this component exists and works correctly

const Home = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const abortController = new AbortController(); // For cleaning up fetch requests
    const signal = abortController.signal;

    const fetchListings = async () => {
      try {
        const data = await list(signal); // Ensure `list` is properly defined and imported
        if (data && data.error) {
          console.error(data.error);
        } else {
          setListings(data);
        }
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.error('Failed to fetch listings:', err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchListings();

    return () => {
      abortController.abort();
    };
  }, []); // Dependency array left empty to run once on mount

  return (
    <div className="listing-list-container" style={{ padding: '20px' }}>
      {loading ? (
        // Show loading spinner while data is being fetched
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
          <CircularProgress />
        </div>
      ) : listings.length === 0 ? (
        // Show "No Listings" message when the listings array is empty
        <Typography variant="h5" style={{ textAlign: 'center', marginTop: '30px', marginBottom: '19px' }}>
          No Listings Available
        </Typography>
      ) : (
        // Show the grid of listings when data is available
        <Grid container spacing={3}>
          {listings.map((listing) => (
            <Grid item xs={12} sm={6} md={4} key={listing._id}>
              <ListingCard listing={listing} />
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
};

export default Home;
