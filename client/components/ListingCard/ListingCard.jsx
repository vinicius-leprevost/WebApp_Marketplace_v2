import React from 'react';
import PropTypes from 'prop-types';
import { useAuth } from '../../helpers/auth-context';
import { Card, CardContent, Typography, CardMedia, Fab, Box, Tooltip } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import './ListingCard.css'; // Import the external CSS file

const ListingCard = ({ listing }) => {
  const { isAuthenticated } = useAuth();

  if (!listing.postedBy) return <></>;

  const handleAddToCart = () => {
    console.log(`Added ${listing.title} to cart!`);
  };

  const handleAddToFavorites = () => {
    console.log(`Added ${listing.title} to favorites!`);
  };

  return (
    <Card className="listing-card">
      {listing.images && listing.images.length > 0 && (
        <CardMedia
          component="img"
          height="140"
          image={listing.images[0]}
          alt={listing.title || 'Listing image'}
          className='listing-image'
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
            <Tooltip title="Add to Favorites" arrow>
              <Fab
                color="secondary"
                size="small"
                onClick={handleAddToFavorites}
                aria-label="Add to Favorites"
              >
                <FavoriteIcon />
              </Fab>
            </Tooltip>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

ListingCard.propTypes = {
  listing: PropTypes.object,
};

export default ListingCard;
