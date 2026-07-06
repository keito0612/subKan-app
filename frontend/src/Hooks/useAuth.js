import { useEffect, useState } from "react";

export function useAuth() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        async function getUser() {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const response = await fetch('/api/user', {
                        headers: { 'Authorization': `Bearer ${token}` },
                    });

                    if (response.ok) {
                        const data = await response.json();
                        setUser(data);
                    }
                } catch (err) {
                    console.error('Failed to fetch user:', err);
                }
            }
        }
        getUser();
    }, []);

    return { user };
}
