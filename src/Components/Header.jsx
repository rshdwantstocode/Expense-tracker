import { PhilippinePeso } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Header() {

    const [username, setUsername] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            try {
                // Decode the JWT token to get user info
                const payload = JSON.parse(atob(token.split('.')[1]));

                setUsername(payload.username);
            } catch (error) {
                console.error('Error decoding token:', error);
            }
        }
    }, []);

    return <>
        <nav>
            <Link to="/dashboard">
                <span className="logo-header">
                    <h1 className="flex"><PhilippinePeso /> eso Tracker</h1>
                </span>
            </Link>

            <span className="name-header">
                <p>Need Help?</p>
                <p>Read our Blog</p>
                <p>Hi {username || "User"}</p>

            </span>
        </nav>
    </>
}