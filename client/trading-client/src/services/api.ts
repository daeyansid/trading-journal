const API_URL = process.env.NEXT_PUBLIC_FAST_API_BACKEND_URL;;

export const refreshTokenIfNeeded = async (): Promise<string | null> => {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) return null;

    try {
        const response = await fetch(`${API_URL}/token/refresh`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ old_refresh_token: refreshToken }),
        });

        if (!response.ok) throw new Error('Failed to refresh token');

        const data = await response.json();
        localStorage.setItem('token', data.access_token);
        localStorage.setItem('refreshToken', data.refresh_token);

        return data.access_token;
    } catch (error) {
        console.error('Error refreshing token:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        return null;
    }
};

export const fetchWithAuth = async (
    url: string,
    options: RequestInit = {}
): Promise<Response> => {
    // Get token from localStorage
    let token = localStorage.getItem('token');

    // Set up headers
    const headers: Record<string, string> = {
        ...options.headers as Record<string, string>,
        'Content-Type': 'application/json',
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    // Attempt the request
    let response = await fetch(`${API_URL}${url}`, {
        ...options,
        headers,
    });

    // If unauthorized, try to refresh token
    if (response.status === 401) {
        const newToken = await refreshTokenIfNeeded();
        if (newToken) {
            // Retry with new token
            headers['Authorization'] = `Bearer ${newToken}`;
            response = await fetch(`${API_URL}${url}`, {
                ...options,
                headers,
            });
        }
    }

    return response;
};

// User API calls
export const getUserProfile = async () => {
    const response = await fetchWithAuth('/users/me');
    if (!response.ok) throw new Error('Failed to fetch user profile');
    return response.json();
};
