import React from "react";
import {
    Box,
    Typography,
    Button,
    IconButton,
    Paper,
    Divider,
    Grid,
} from "@mui/material";
import { useAuth } from "../../helpers/auth-context";
import { Add, Remove, Delete } from "@mui/icons-material";
import { useCart } from "../../helpers/CartContext";
//import "./Cart.css";

const Cart = () => {
    const { isAuthenticated } = useAuth();
    const { cartItems, incrementQuantity, decrementQuantity, removeFromCart } = useCart();

    const handleIncrement = (id) => {
        incrementQuantity(id);
    };

    const handleDecrement = (id) => {
        decrementQuantity(id);
    };

    const handleRemove = (id) => {
        removeFromCart(id);
    };

    const getTotalPrice = () =>
        cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        isAuthenticated ? (
            <Box sx={{ margin: "0 auto", padding: "2rem" }}>
                <Typography variant="h4" gutterBottom textAlign={'center'} fontWeight={'bold'}>
                    Your Cart
                </Typography>
                {cartItems.length > 0 ? (
                    <>
                        {cartItems.map((item) => (
                            <Paper key={item._id} className="cart-item">
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
                                                onClick={() => handleDecrement(item._id)}
                                            >
                                                <Remove />
                                            </IconButton>
                                            <Typography>{item.quantity}</Typography>
                                            <IconButton
                                                size="small"
                                                onClick={() => handleIncrement(item._id)}
                                            >
                                                <Add />
                                            </IconButton>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <IconButton
                                            color="error"
                                            onClick={() => handleRemove(item._id)}
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
                    <Typography variant="body1" textAlign={'center'}>Your cart is empty.</Typography>
                )}
            </Box>
        ) : (
            <Typography variant="body1" textAlign="center" sx={{margin: "2rem"}}>
                Please log in to view your cart.
            </Typography>
        )
    );    
};

export default Cart;