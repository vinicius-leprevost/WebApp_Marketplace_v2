import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router';
import { useAuth } from '../../helpers/auth-context';
import { remove } from '../../frontend-ctrl/api-listing';
import { useCart } from '../../helpers/CartContext';
import { useFavourites } from '../../helpers/FavouritesContext';
import {
  Card,
  CardContent,
  Typography,
  CardMedia,
  Fab,
  Box,
  Tooltip,
  Snackbar,
  Alert,
} from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import './ListingCard.css'; // Import the external CSS file

const ListingCard = ({ listing, onRemoveFromFavourites }) => {
  const { isAuthenticated } = useAuth();
  const { addToCart } = useCart();
  const { addToFavourites } = useFavourites();
  const location = useLocation();

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success'); // Default severity is success

  const showPublicButtons = location.pathname === '/'; // Public buttons
  const showPrivateButtons = location.pathname === '/myListings'; // Private buttons

  if (!listing.postedBy) return <></>;

  const handleAddToCart = () => {
    addToCart(listing);
    setSnackbarMessage(`${listing.title} added to cart!`);
    setSnackbarSeverity('success'); // Success for adding to cart
    setSnackbarOpen(true);
  };

  const handleAddToFavourites = () => {
    addToFavourites(listing);
    setSnackbarMessage(`${listing.title} added to favourites!`);
    setSnackbarSeverity('success'); // Success for adding to favourites
    setSnackbarOpen(true);
  };

  const handleRemoveListing = async (listingId, token, onSuccess, onError) => {
    try {
      const params = { listingId };
      const credentials = { t: token };
  
      const response = await remove(params, credentials);
  
      // Handle the response
      if (response && response.success) {
        // If the API indicates success, execute the onSuccess callback
        if (onSuccess) {
          onSuccess();
        }
      } else {
        if (onError) {
          onError(response.error || 'Failed to remove the listing.');
        }
      }
    } catch (err) {
      // Handle any unexpected errors
      console.error('Error removing the listing:', err);
      if (onError) {
        onError('An unexpected error occurred while removing the listing.');
      }
    }
  };


  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <Card className="listing-card">
        {listing.images && listing.images.length > 0 && (
          <CardMedia
            component="img"
            height="140"
            image={listing.images[0]}
            alt={listing.title || 'Listing image'}
            className="listing-image"
          />
        )}
        <CardContent className="card">
          {listing.title && (
            <Typography variant="h6" className="listing-title">
              {listing.title}
            </Typography>
          )}
          {listing.description && (
            <Typography variant="body2" color="textSecondary" className="listing-description">
              {listing.description}
            </Typography>
          )}
          {listing.price && (
            <Typography variant="body1" color="textPrimary" className="listing-price">
              ${listing.price}
            </Typography>
          )}
          {listing.condition && (
            <Typography variant="body2" color="textSecondary" className="listing-condition">
              Condition: {listing.condition}
            </Typography>
          )}
          {listing.status && (
            <Typography variant="body2" color="textSecondary" className="listing-status">
              Status: {listing.status}
            </Typography>
          )}
          {listing.postedBy?.name && (
            <Typography variant="body2" color="textSecondary" className="listing-posted-by">
              Posted by: {listing.postedBy.name
                .toLowerCase()
                .split(' ')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ')}
            </Typography>
          )}

          {isAuthenticated && showPublicButtons && (
            <Box className="fab-container">
              <Tooltip title="Add to Cart" arrow>
                <Fab
                  color="primary"
                  size="small"
                  onClick={handleAddToCart}
                  aria-label="Add to Cart"
                  sx={{ marginRight: 1 }}
                >
                  <AddShoppingCartIcon />
                </Fab>
              </Tooltip>
              <Tooltip title="Add to Favorites" arrow>
                <Fab
                  color="secondary"
                  size="small"
                  onClick={handleAddToFavourites}
                  aria-label="Add to Favorites"
                >
                  <FavoriteIcon />
                </Fab>
              </Tooltip>
            </Box>
          )}

          {isAuthenticated && showPrivateButtons && (
            <Box className="fab-container">
              <Tooltip title="Edit Listing" arrow>
                <Fab
                  color="primary"
                  size="small"
                  onClick={() => console.log(`Editing ${listing.title}`)}
                  aria-label="Edit Listing"
                  sx={{ marginRight: 1 }}
                >
                  <EditIcon />
                </Fab>
              </Tooltip>
              <Tooltip title="Delete Listing" arrow>
                <Fab
                  color="secondary"
                  size="small"
                  onClick={() => console.log(`Deleting ${listing.title}`)}
                  aria-label="Delete Listing"
                >
                  <DeleteIcon />
                </Fab>
              </Tooltip>
            </Box>
          )}
          {onRemoveFromFavourites && (
            <Box 
              mt={2} 
              sx={{
                display: 'flex', 
                justifyContent: 'center', // Center horizontally
                alignItems: 'center' // Center vertically
              }}
            >
              <Tooltip title="Remove From Favourites" arrow>
                <Fab
                  color="error"
                  size="small"
                  onClick={() => {
                    setSnackbarMessage(`${listing.title} removed from favourites!`); // Set message for snackbar
                    setSnackbarSeverity('error'); // Set severity to 'error'
                    setSnackbarOpen(true); // Open snackbar
                    setTimeout(() => {
                      onRemoveFromFavourites(); // Call the function after a delay
                    }, 1200);
                  }}
                  aria-label="Remove from Favourites"
                >
                  <DeleteIcon />
                </Fab>
              </Tooltip>
            </Box>
          )}
        </CardContent>
      </Card>

      {/* Snackbar Component */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

ListingCard.propTypes = {
  listing: PropTypes.object,
  onRemoveFromFavourites: PropTypes.func,
};

export default ListingCard;
