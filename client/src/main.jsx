import React from 'react';
import App from './App.jsx';
import { createRoot } from 'react-dom/client';
import { AuthProvider } from '../helpers/auth-context.jsx';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
    <AuthProvider>
        <App />
    </AuthProvider>
);
