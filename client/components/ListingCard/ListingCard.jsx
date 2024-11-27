import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, Typography, CardMedia } from '@mui/material';

const ListingCard = ({ listing }) => {
  return (
    <Card className="listing-card">
      {listing.images && listing.images.length > 0 && (
        <CardMedia
          component="img"
          height="140"
          image={listing.images[0]}
          alt={listing.title}
        />
      )}
      <CardContent>
        <Typography variant="h6">{listing.title}</Typography>
        <Typography variant="body2" color="textSecondary">
          {listing.description}
        </Typography>
        <Typography variant="body1" color="textPrimary">
          ${listing.price}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Condition: {listing.condition}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Status: {listing.status}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Posted by: {listing.postedBy.name}
        </Typography>
      </CardContent>
    </Card>
  );
};

ListingCard.propTypes = {
  listing: PropTypes.object.isRequired,
};

export default ListingCard;