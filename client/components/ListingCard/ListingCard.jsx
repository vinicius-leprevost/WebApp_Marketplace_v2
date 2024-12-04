import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router';
import { useAuth } from '../../helpers/auth-context';
import { useCart } from '../../helpers/CartContext';
import { useFavorites } from '../../helpers/FavoritesContext';
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
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import './ListingCard.css'; // Import the external CSS file

const ListingCard = ({ listing, isFavorite }) => {
  const { isAuthenticated } = useAuth();
  const { addToCart } = useCart();
  const { addToFavorites, removeFromFavorites } = useFavorites();
  const location = useLocation();

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const showPublicButtons = location.pathname === '/'; // Public buttons
  const showPrivateButtons = location.pathname === '/myListings'; // Private buttons

  if (!listing.postedBy) return <></>;

  const handleAddToCart = () => {
    addToCart(listing);
    setSnackbarMessage(`${listing.title} added to cart!`);
    setSnackbarOpen(true);
  };

  const handleAddToFavorites = () => {
    addToFavorites(listing);
    setSnackbarMessage(`${listing.title} added to favorites!`);
    setSnackbarOpen(true);
  };

  const handleRemoveFromFavorites = () => {
    removeFromFavorites(listing._id);
    setSnackbarMessage(`${listing.title} removed from favorites!`);
    setSnackbarOpen(true);
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
              Posted by: {listing.postedBy.name}
            </Typography>
          )}

          {isAuthenticated && (
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
              <Tooltip title={isFavorite ? "Remove from Favorites" : "Add to Favorites"} arrow>
                <Fab
                  color="secondary"
                  size="small"
                  onClick={isFavorite ? handleRemoveFromFavorites : handleAddToFavorites}
                  aria-label={isFavorite ? "Remove from Favorites" : "Add to Favorites"}
                >
                  {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
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
        </CardContent>
      </Card>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

ListingCard.propTypes = {
  listing: PropTypes.object.isRequired,
  isFavorite: PropTypes.bool,
};

export default ListingCard;