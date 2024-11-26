import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { read } from '../../frontend-ctrl/api-user.js';
import { useAuth } from '../../helpers/auth-context';
import { Card, CardContent, Typography, CircularProgress, Avatar, Button } from '@mui/material';
import './Profile.css';
import '../EditProfile/EditProfile.jsx';
import EditProfile from '../EditProfile/EditProfile.jsx';

const Profile = () => {
    const { isAuthenticated } = useAuth();
    const [user, setUser] = useState({});
    const [redirectToSignin, setRedirectToSignin] = useState(false);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false); // New state to control edit mode

    function stringAvatar(name) {
        const nameParts = name.split(' ');
        const initials = nameParts.length > 1
            ? `${nameParts[0][0]}${nameParts[1][0]}`
            : `${nameParts[0][0]}${nameParts[0][1] || ''}`;

        return {
            sx: {
                bgcolor: stringToColor(name),
            },
            children: initials.toUpperCase(),
        };
    }

    function stringToColor(string) {
        let hash = 0;
        let i;

        for (i = 0; i < string.length; i += 1) {
            hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }

        let color = '#';

        for (i = 0; i < 3; i += 1) {
            const value = (hash >> (i * 8)) & 0xff;
            color += `00${value.toString(16)}`.slice(-2);
        }

        return color;
    }

    useEffect(() => {
        let isMounted = true;
        const abortController = new AbortController();
        const signal = abortController.signal;

        const jwt = isAuthenticated;
        if (!jwt) {
            setRedirectToSignin(true);
            return;
        }

        read({ userId: jwt.user._id }, { t: jwt.token }, signal).then((data) => {
            if (isMounted) {
                if (data && data.error) {
                    setRedirectToSignin(true);
                } else {
                    setUser(data);
                    setLoading(false);
                }
            }
        }).catch(err => {
            if (isMounted) {
                console.error(err);
            }
        });

        return function cleanup() {
            isMounted = false;
            abortController.abort();
        };
    }, [isAuthenticated]);

    if (redirectToSignin) {
        return <Navigate to="/signin" />;
    }

    return (
        <div className="profile-container">
            {loading ? (
                <CircularProgress />
            ) : (
                <Card className="profile-card">
                    <CardContent className="profile-content">
                        <div className="profile-header">
                            <Avatar {...stringAvatar(user.name)} style={{ marginRight: '0.5em' }} />
                            <Typography variant="h6" className="profile-title">Profile</Typography>
                        </div>
                        <Typography variant="body1">Name: {user.name}</Typography>
                        <Typography variant="body1">Email: {user.email}</Typography>
                        <Typography variant="body1">Joined: {new Date(user.created).toDateString()}</Typography>
                        
                        {/* Button to toggle EditProfile component */}
                        <Button 
                            variant="outlined" 
                            color="primary" 
                            onClick={() => setIsEditing(!isEditing)} 
                            style={{ marginTop: '1em' }}
                        >
                            {isEditing ? 'Cancel' : 'Edit Profile'}
                        </Button>

                        {/* Conditionally render EditProfile component */}
                        {isEditing && <EditProfile user={user} />}
                    </CardContent>
                </Card>
            )}
        </div>
    );
};

export default Profile;
