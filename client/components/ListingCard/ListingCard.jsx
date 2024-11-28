import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, Typography, CardMedia } from '@mui/material';

const ListingCard = ({ listing }) => {
  // Check if listing is valid
  if (!listing.postedBy) return <></>;

  return (
    <Card className="listing-card">
      {listing.images && listing.images.length > 0 && (
        <CardMedia
          component="img"
          height="140"
          image={listing.images[0]}
          alt={listing.title || 'Listing image'}
        />
      )}
      <CardContent>
        {listing.title && <Typography variant="h6">{listing.title}</Typography>}
        {listing.description && (
          <Typography variant="body2" color="textSecondary">
            {listing.description}
          </Typography>
        )}
        {listing.price && (
          <Typography variant="body1" color="textPrimary">
            ${listing.price}
          </Typography>
        )}
        {listing.condition && (
          <Typography variant="body2" color="textSecondary">
            Condition: {listing.condition}
          </Typography>
        )}
        {listing.status && (
          <Typography variant="body2" color="textSecondary">
            Status: {listing.status}
          </Typography>
        )}
        {listing.postedBy?.name && (
          <Typography variant="body2" color="textSecondary">
            Posted by: {listing.postedBy.name}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

ListingCard.propTypes = {
  listing: PropTypes.object,
};

export default ListingCard;
