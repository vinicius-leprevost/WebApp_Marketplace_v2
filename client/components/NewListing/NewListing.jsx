import React, { useState } from "react";
import { useAuth } from "../../helpers/auth-context";
import { create } from "../../frontend-ctrl/api-listing";
import { TextField, Button, Select, MenuItem, Box, Typography, InputLabel, FormControl } from "@mui/material";
import "./NewListing.css";

const NewListing = () => {
    const { isAuthenticated } = useAuth();
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

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (isAuthenticated) {
            try {
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
                    <TextField
                        label="Category"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={listing.category}
                        onChange={handleChange("category")}
                        required
                    />

                    {/* Images */}
                    <TextField
                        label="Images (Comma-separated URLs)"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={listing.images.join(", ")}
                        onChange={(e) => {
                            const imagesArray = e.target.value.split(",").map((img) => img.trim());
                            setListing({ ...listing, images: imagesArray });
                        }}
                    />

                    {/* Address */}
                    <TextField
                        label="Address"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={listing.location.address}
                        onChange={handleChange("address")}
                        required
                    />

                    {/* City */}
                    <TextField
                        label="City"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={listing.location.city}
                        onChange={handleChange("city")}
                        required
                    />

                    {/* Province */}
                    <TextField
                        label="Province"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={listing.location.province}
                        onChange={handleChange("province")}
                        required
                    />

                    {/* Postal Code */}
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

                    {/* Status */}
                    <FormControl fullWidth margin="normal">
                        <InputLabel id="status-label">Status</InputLabel>
                        <Select
                            labelId="status-label"
                            value={listing.status}
                            onChange={handleChange("status")}
                            required
                        >
                            <MenuItem value="Active">Active</MenuItem>
                            <MenuItem value="Pending">Pending</MenuItem>
                            <MenuItem value="Sold">Sold</MenuItem>
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
