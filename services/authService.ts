import type { LoginCredentials, RegisterUserData, User } from '../types';

interface AuthResponse {
    token: string;
    user: User;
}

// Custom error for API responses to carry more context
export class ApiError extends Error {
    status: number;
    fields?: Record<string, string>;

    constructor(message: string, status: number, fields?: Record<string, string>) {
        super(message);
        this.name = 'ApiError';
        this.status = status;
        this.fields = fields;
    }
}

// The base URL for the authentication API.
// This relative path assumes the frontend is served from the same domain
// as the backend, or a proxy is configured to forward requests.
const API_BASE_URL = '/api/auth';

/**
 * A helper function to handle API responses.
 * It checks for non-ok responses and throws an ApiError with the server's message.
 * @param response The fetch Response object.
 * @returns The JSON parsed response body.
 */
const handleResponse = async (response: Response) => {
    const text = await response.text();
    let data;

    try {
        data = text ? JSON.parse(text) : {};
    } catch (error) {
        // If the server returns a non-JSON error (e.g., plain text from a proxy error),
        // we create a standard error format.
        data = { message: text || `HTTP error! status: ${response.status}` };
    }

    if (!response.ok) {
        throw new ApiError(
            data.message || `An unexpected error occurred (Status: ${response.status})`,
            response.status,
            data.errors // Assuming backend sends field errors under an 'errors' key
        );
    }
    return data;
};

/**
 * Logs in a user by sending credentials to the backend API.
 * @param credentials The user's email and password.
 * @returns A promise that resolves with the authentication response (token and user data).
 */
export const apiLogin = async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
    });
    return handleResponse(response);
};

/**
 * Registers a new user by sending user data to the backend API.
 * @param userData The new user's username, email, and password.
 * @returns A promise that resolves with the authentication response (token and user data).
 */
export const apiRegister = async (userData: RegisterUserData): Promise<AuthResponse> => {
    const response = await fetch(`${API_BASE_URL}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });
    return handleResponse(response);
};

/**
 * Sends a password reset request to the backend endpoint.
 * @param email The user's email address.
 * @returns A promise that resolves when the request is complete.
 */
export const apiRequestPasswordReset = async (email: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/request-password-reset`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
    });
    // Use handleResponse for consistent error handling, even if we don't need the return value on success.
    await handleResponse(response);
};