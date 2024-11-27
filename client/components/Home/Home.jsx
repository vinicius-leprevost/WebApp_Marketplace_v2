import React, { useState, useEffect } from 'react';
import { CircularProgress, Grid } from '@mui/material';
import ListingCard from '../ListingCard/ListingCard';
import { list } from '../../frontend-ctrl/api-listing.js'; // Ensure this path is correct

const Home = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    const fetchListings = async () => {
      try {
        const data = await list(signal);
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
  }, []);

  return (
    <div className="listing-list-container" style={{ padding: '20px' }}>
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
          <CircularProgress />
        </div>
      ) : (
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