<<<<<<< Updated upstream
import React, { useState, useEffect } from "react";
import { useAuth } from "../../helpers/auth-context.jsx";
import { create } from "../../frontend-ctrl/api-listing.js";
import { list } from "../../frontend-ctrl/api-category.js";
=======
import { useState, useEffect } from "react";
import { useAuth } from "../../helpers/auth-context";
import { create } from "../../frontend-ctrl/api-listing";
import { list } from "../../frontend-ctrl/api-category";
>>>>>>> Stashed changes
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
    DialogTitle,
} from "@mui/material";

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
        image: null,
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

    const handleImageChange = (event) => {
        console.log(event.target.files[0]);
        setListing({ ...listing, image: event.target.files[0] });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (isAuthenticated) {
            if (
                !listing.title ||
                !listing.description ||
                !listing.price ||
                !listing.category ||
                !listing.condition ||
                !listing.image
            ) {
                setErrorOpen(true);
                return;
            }

            try {
                const formData = new FormData();
                formData.append("title", listing.title);
                formData.append("description", listing.description);
                formData.append("price", listing.price);
                formData.append("category", listing.category);
                formData.append("image", listing.image);
                formData.append("location[address]", listing.location.address);
                formData.append("location[city]", listing.location.city);
                formData.append("location[province]", listing.location.province);
                formData.append("location[postalCode]", listing.location.postalCode);
                formData.append("condition", listing.condition);
                formData.append("status", listing.status);
                formData.append("postedBy", listing.postedBy);

                const response = await create(formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
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
                    <TextField
                        label="Title"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={listing.title}
                        onChange={handleChange("title")}
                        required
                    />
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
                    <Button
                        variant="outlined"
                        component="label"
                        sx={{ marginTop: "1.5rem" }}
                    >
                        Upload Image
                        <input
                            type="file"
                            accept="image/*"
                            hidden
                            onChange={handleImageChange}
                        />
                    </Button>
                    <Typography variant="caption" display="block">
                        {listing.image ? listing.image.name : "No image uploaded"}
                    </Typography>
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
                <DialogTitle id="thank-you-dialog-title">Success</DialogTitle>
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
                <DialogTitle id="thank-you-dialog-title">Error</DialogTitle>
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
