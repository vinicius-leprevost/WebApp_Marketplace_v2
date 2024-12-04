import React from 'react';
import App from './App.jsx';
import { createRoot } from 'react-dom/client';
import { AuthProvider } from '../helpers/auth-context';
import { CartProvider } from '../helpers/CartContext';
import { FavoritesProvider } from '../helpers/FavoritesContext';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <AuthProvider>
    <CartProvider>
      <FavoritesProvider>
        <App />
      </FavoritesProvider>
    </CartProvider>
  </AuthProvider>
);