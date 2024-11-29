import React, { useState, useEffect } from "react";
import { useAuth } from "../../helpers/auth-context";
import { create } from "../../frontend-ctrl/api-listing";
import { list } from "../../frontend-ctrl/api-category";
import {
    TextField,
    Button,
    Select,
    MenuItem,
    Box,
    Typography,
    InputLabel,
    FormControl,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle 
} from "@mui/material";
import { set } from "lodash";

const NewListing = () => {
    const { isAuthenticated } = useAuth();
    const [categories, setCategories] = useState([]);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [errorOpen, setErrorOpen] = useState(false);

    const handleCloseDialog = () => {
        setDialogOpen(false);
    };

    const handleCloseError = () => {
        setErrorOpen(false);
    };

    const localImages = [
        "/images/listings/img1.jpg",
        "/images/listings/img2.jpg",
        "/images/listings/img3.jpg",
    ];

    let availableImages = [...localImages];

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await list();
                setCategories(response);
            } catch (err) {
                console.error("Error fetching categories:", err);
            }
        };
        fetchCategories();
    }, []);

    const [listing, setListing] = useState({
        title: "",
        description: "",
        price: "",
        category: "",
        images: [],
        location: {
            address: "",
            city: "",
            province: "",
            postalCode: "",
        },
        condition: "",
        status: "Active",
        postedBy: isAuthenticated?.user?._id,
    });

    const getRandomImage = () => {
        if (availableImages.length === 0) {
            availableImages = [...localImages];
        }
    
        const randomIndex = Math.floor(Math.random() * availableImages.length);
        const selectedImage = availableImages[randomIndex];
    
        availableImages.splice(randomIndex, 1);
    
        return selectedImage;
    };

    const handleChange = (name) => (event) => {
        if (name in listing.location) {
            setListing({
                ...listing,
                location: { ...listing.location, [name]: event.target.value },
            });
        } else {
            setListing({ ...listing, [name]: event.target.value });
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        if (isAuthenticated) {
            if (!listing.title || !listing.description || !listing.price || !listing.category || !listing.condition) {
                setErrorOpen(true);
                return;
            }
            
            try {
                const randomImage = getRandomImage(); // Use the utility function
                const listingToSubmit = {
                    ...listing,
                    images: [randomImage], // Add the unique image
                };
    
                console.log("Listing object:", listingToSubmit);
    
                const response = await create(listingToSubmit);
                console.log("Listing created:", response);
                setDialogOpen(true);
            } catch (err) {
                console.error("Error creating listing:", err);
                setErrorOpen(true);
            }
        } else {
            console.log("User not authenticated");
        }
    };

    return (
        <Box sx={{ maxWidth: "600px", margin: "0 auto", padding: "2rem" }}>
            <Typography variant="h4" component="h1" gutterBottom>
                New Listing
            </Typography>
            {isAuthenticated ? (
                <Box component="form" onSubmit={handleSubmit} noValidate autoComplete="off">
                    {/* Title */}
                    <TextField
                        label="Title"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={listing.title}
                        onChange={handleChange("title")}
                        required
                    />

                    {/* Description */}
                    <TextField
                        label="Description"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        multiline
                        rows={4}
                        value={listing.description}
                        onChange={handleChange("description")}
                        required
                    />

                    {/* Price */}
                    <TextField
                        label="Price"
                        type="number"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={listing.price}
                        onChange={handleChange("price")}
                        required
                    />

                    {/* Category */}
                    <FormControl fullWidth margin="normal">
                        <InputLabel id="category-label">Category</InputLabel>
                        <Select
                            labelId="category-label"
                            value={listing.category}
                            onChange={handleChange("category")}
                            required
                        >
                            <MenuItem value="">
                                <em>Select a category</em>
                            </MenuItem>
                            {categories.map((category) => (
                                <MenuItem key={category._id} value={category._id}>
                                    {category.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    {/* Location */}
                    <TextField
                        label="Address"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={listing.location.address}
                        onChange={handleChange("address")}
                        required
                    />

                    <TextField
                        label="City"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={listing.location.city}
                        onChange={handleChange("city")}
                        required
                    />

                    <TextField
                        label="Province"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={listing.location.province}
                        onChange={handleChange("province")}
                        required
                    />

                    <TextField
                        label="Postal Code"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={listing.location.postalCode}
                        onChange={handleChange("postalCode")}
                        required
                    />

                    {/* Condition */}
                    <FormControl fullWidth margin="normal">
                        <InputLabel id="condition-label">Condition</InputLabel>
                        <Select
                            labelId="condition-label"
                            value={listing.condition}
                            onChange={handleChange("condition")}
                            required
                        >
                            <MenuItem value="">
                                <em>Select Condition</em>
                            </MenuItem>
                            <MenuItem value="New">New</MenuItem>
                            <MenuItem value="Used">Used</MenuItem>
                        </Select>
                    </FormControl>

                    {/* Submit Button */}
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ marginTop: "1.5rem" }}
                    >
                        Create Listing
                    </Button>
                </Box>
            ) : (
                <Typography color="error">
                    You must be logged in to create a listing.
                </Typography>
            )}
            <Dialog
                open={dialogOpen}
                onClose={handleCloseDialog}
                aria-labelledby="thank-you-dialog-title"
                aria-describedby="thank-you-dialog-description"
            >
                <DialogTitle id="thank-you-dialog-title">
                    Success
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="thank-you-dialog-description">
                        New listing successfully created!
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary" autoFocus>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={errorOpen}
                onClose={handleCloseError}
                aria-labelledby="thank-you-dialog-title"
                aria-describedby="thank-you-dialog-description"
            >
                <DialogTitle id="thank-you-dialog-title">
                    Error
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="thank-you-dialog-description">
                        Unable to create new listing. Please ensure all fields are filled out.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseError} color="error" autoFocus>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default NewListing;
