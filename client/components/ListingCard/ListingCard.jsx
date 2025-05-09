import { useState } from "react";
import PropTypes from "prop-types";
import { useLocation } from "react-router";
import { useAuth } from "../../helpers/auth-context.jsx";
import { remove } from "../../frontend-ctrl/api-listing.js";
import { useCart } from "../../helpers/CartContext.jsx";
import { useFavourites } from "../../helpers/FavouritesContext.jsx";
import { useNavigate } from "react-router-dom";
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
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import "./ListingCard.css";

const ListingCard = ({ listing }) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { addToCart } = useCart();
  const { addToFavourites } = useFavourites();
  const location = useLocation();

  const [isOpen, setIsOpen] = useState(false); // Modal state
  const [showButtons, setShowButtons] = useState(true);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success"); // Default severity is success

  const toggleModal = () => {
    setIsOpen(!isOpen);
    setShowButtons(!isOpen); // Toggle visibility of buttons when modal toggles
  };

  // const showPublicButtons = location.pathname === "/"; // Public buttons
  const showPublicButtons = location.pathname === "/" && !isOpen;
  const showPrivateButtons = location.pathname === "/myListings"; // Private buttons

  if (!listing.postedBy) return <></>;

  const handleAddToCart = () => {
    addToCart(listing);
    setSnackbarMessage(`${listing.title} added to cart!`);
    setSnackbarSeverity("success");
    setSnackbarOpen(true);
  };

  const handleAddToFavourites = () => {
    addToFavourites(listing);
    setSnackbarMessage(`${listing.title} added to favorites!`);
    setSnackbarSeverity("success");
    setSnackbarOpen(true);
  };

  const handleRemoveListing = async (listingId, token) => {
    try {
      const params = { listingId };
      const credentials = { t: token };

      const response = await remove(params, credentials.t);

      if (response && response.success) {
        setSnackbarMessage(`${listing.title} deleted successfully!`);
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
      } else {
        throw new Error(response.error || "Failed to remove the listing.");
      }
    } catch (error) {
      console.error("Error removing listing:", error);
      setSnackbarMessage("An error occurred while deleting the listing.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    } finally {
      // Reload the webpage after the process
      window.location.reload();
    }
  };


  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
      <>
        <Card className="listing-card" onClick={toggleModal}>
          {/* Display image if it exists */}
          {listing.images && listing.images.length > 0 && (
              <CardMedia
                  component="img"
                  height="140"
                  image={listing.images[0]} // Display the first image in the array
                  alt={listing.title || "Listing image"}
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
                <Typography
                    variant="body2"
                    color="textSecondary"
                    className="listing-description"
                >
                  {listing.description}
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
                  Posted by:{" "}
                  {listing.postedBy.name
                      .toLowerCase()
                      .split(" ")
                      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                      .join(" ")}
                </Typography>
            )}
            {listing.price && (
                <Typography
                    variant="body1"
                    color="textPrimary"
                    className="listing-price"
                >
                  ${listing.price}
                </Typography>
            )}

            {/* Public buttons */}
            {isAuthenticated && showPublicButtons && showButtons && (
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

            {/* Private buttons */}
            {isAuthenticated && showPrivateButtons && (
                <Box className="fab-container">
                  <Tooltip title="Edit Listing" arrow>
                    <Fab
                        color="primary"
                        size="small"
                        onClick={() => navigate(`/listings/edit/${listing.id}`)}
                        aria-label="Edit Listing"
                        sx={{ marginRight: 2 }}
                    >
                      <EditIcon />
                    </Fab>
                  </Tooltip>
                  <Tooltip title="Delete Listing" arrow>
                    <Fab
                        color="secondary"
                        size="small"
                        onClick={() =>
                            handleRemoveListing(listing._id, isAuthenticated.token)
                        }
                        aria-label="Delete Listing"
                    >
                      <DeleteIcon />
                    </Fab>
                  </Tooltip>
                </Box>
            )}
          </CardContent>
        </Card>

        {/* Modal for expanded view */}
        {isOpen && (
            <div className="modal-overlay" onClick={() => setIsOpen(false)}>
              <div
                  className="modal-content"
                  onClick={(e) => e.stopPropagation()} // Prevent closing on inner content click
              >
                {listing.images && listing.images.length > 0 && (
                    <img
                        src={listing.images[0]}
                        alt={listing.title}
                        className="modal-image"
                    />
                )}
                <Typography variant="h6" className="listing-title">
                  {listing.title}
                </Typography>
                <Typography
                    variant="body2"
                    color="textSecondary"
                    className="listing-description"
                >
                  {listing.description}
                </Typography>
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
                      Posted by:{" "}
                      {listing.postedBy.name
                          .toLowerCase()
                          .split(" ")
                          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                          .join(" ")}
                    </Typography>
                )}
                {listing.price && (
                    <Typography
                        variant="body1"
                        color="textPrimary"
                        className="listing-price"
                    >
                      ${listing.price}
                    </Typography>
                )}

                {/* Buttons for "Add to Cart" and "Add to Favorites" - Render only in modal */}
                {isOpen && (
                    <div className="modal-buttons">
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
                    </div>
                )}

                <button
                    className="close-button"
                    onClick={() => setIsOpen(false)}
                >
                  Close
                </button>
              </div>
            </div>
        )}

        {/* Snackbar Component */}
        <Snackbar
            open={snackbarOpen}
            autoHideDuration={3000}
            onClose={handleSnackbarClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert
              onClose={handleSnackbarClose}
              severity={snackbarSeverity}
              sx={{ width: "100%" }}
          >
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
