import React, { useState } from "react";
import {
    Box,
    Typography,
    Button,
    IconButton,
    Paper,
    Divider,
    Grid,
} from "@mui/material";
import {useAuth} from "../../helpers/auth-context";
import { Add, Remove, Delete } from "@mui/icons-material";
import "./Cart.css";

const Cart = () => {
    const { isAuthenticated, logout } = useAuth();
    const [cartItems, setCartItems] = useState([
        {
            id: 1,
            name: "Product 1",
            price: 50,
            quantity: 1,
            image: "https://via.placeholder.com/80",
        },
        {
            id: 2,
            name: "Product 2",
            price: 100,
            quantity: 2,
            image: "https://via.placeholder.com/80",
        },
    ]);

    const handleIncrement = (id) => {
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id ? { ...item, quantity: item.quantity + 1 } : item
            )
        );
    };

    const handleDecrement = (id) => {
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id && item.quantity > 1
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            )
        );
    };

    const handleRemove = (id) => {
        setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
    };

    const getTotalPrice = () =>
        cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        isAuthenticated ? (
            <Box sx={{ maxWidth: "800px", margin: "0 auto", padding: "2rem" }}>
                <Typography variant="h4" gutterBottom>
                    Your Cart
                </Typography>
                {cartItems.length > 0 ? (
                    <>
                        {cartItems.map((item) => (
                            <Paper key={item.id} className="cart-item">
                                <Grid container spacing={2} alignItems="center">
                                    <Grid item xs={3}>
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="cart-item-image"
                                        />
                                    </Grid>
                                    <Grid item xs={5}>
                                        <Typography variant="h6">{item.name}</Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            ${item.price.toFixed(2)}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Box className="quantity-controls">
                                            <IconButton
                                                size="small"
                                                onClick={() => handleDecrement(item.id)}
                                            >
                                                <Remove />
                                            </IconButton>
                                            <Typography>{item.quantity}</Typography>
                                            <IconButton
                                                size="small"
                                                onClick={() => handleIncrement(item.id)}
                                            >
                                                <Add />
                                            </IconButton>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <IconButton
                                            color="error"
                                            onClick={() => handleRemove(item.id)}
                                        >
                                            <Delete />
                                        </IconButton>
                                    </Grid>
                                </Grid>
                            </Paper>
                        ))}
                        <Divider sx={{ margin: "1rem 0" }} />
                        <Box className="cart-summary">
                            <Typography variant="h6">
                                Total: ${getTotalPrice().toFixed(2)}
                            </Typography>
                            <Button variant="contained" color="primary" size="large">
                                Proceed to Checkout
                            </Button>
                        </Box>
                    </>
                ) : (
                    <Typography variant="body1">Your cart is empty.</Typography>
                )}
            </Box>
        ) : (
            <Typography variant="body1" align="center">
                Please log in to view your cart.
            </Typography>
        )
    );    
};

export default Cart;
