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
    IconButton,
    CircularProgress,
} from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import "./NewListing.css";

const NewListing = () => {
    const { isAuthenticated } = useAuth();
    const [categories, setCategories] = useState([]);
    const [imagePreview, setImagePreview] = useState(null); // for image preview
    const [imageFile, setImageFile] = useState(null); // for storing the file

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
        images: [], // This will store the image URLs
        location: {
            address: "",
            city: "",
            province: "",
            postalCode: "",
        },
        condition: "",
        status: "Active",
        postedBy: isAuthenticated.user._id,
    });

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

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result); // Set preview of the image

                // Generate URL for image and update images array
                const imageUrl = URL.createObjectURL(file); // Local URL for preview

                // Add the image URL to the images array
                setListing((prevListing) => ({
                    ...prevListing,
                    images: [...prevListing.images, imageUrl], // Append new image URL to the array
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (isAuthenticated) {
            try {
                // If you're uploading the image to a server (e.g., S3), do so here
                // You can send the image URL (from listing.images) to your backend

                // Example: If the images array has URLs for the uploaded images
                console.log("Listing object:", listing);

                const response = await create(listing);
                console.log("Listing created:", response);
            } catch (err) {
                console.error("Error creating listing:", err);
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

                    {/* Image Upload */}
                    <Box margin="normal">
                        <InputLabel htmlFor="image-upload">Upload Image</InputLabel>
                        <input
                            type="file"
                            id="image-upload"
                            accept="image/*"
                            onChange={handleFileChange}
                            style={{ display: "none" }}
                        />
                        <label htmlFor="image-upload">
                            <Button variant="outlined" component="span" fullWidth>
                                <ImageIcon sx={{ marginRight: 1 }} />
                                Upload Image
                            </Button>
                        </label>
                        {imagePreview && (
                            <Box sx={{ marginTop: 2, textAlign: "center" }}>
                                <img
                                    src={imagePreview}
                                    alt="Image Preview"
                                    style={{ width: "100%", maxWidth: "300px", objectFit: "cover" }}
                                />
                            </Box>
                        )}
                    </Box>

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
        </Box>
    );
};

export default NewListing;
