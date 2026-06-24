// Constant credentials for authentication
export const AUTH_CREDENTIALS = {
  email: "admin@tracker.com",
  password: "admin123",
} as const;

// Cookie name used for auth token
export const AUTH_COOKIE_NAME = "token";

// Token value stored in cookie when authenticated
export const AUTH_TOKEN_VALUE = "authenticated";

/**
 * Validate credentials against constant values
 */
export function validateCredentials(email: string, password: string): boolean {
  return (
    email === AUTH_CREDENTIALS.email &&
    password === AUTH_CREDENTIALS.password
  );
}

/**
 * Set the auth cookie in the browser
 */
export function setAuthCookie(): void {
  document.cookie = `${AUTH_COOKIE_NAME}=${AUTH_TOKEN_VALUE}; path=/`;
}

/**
 * Clear the auth cookie from the browser
 */
export function clearAuthCookie(): void {
  document.cookie = `${AUTH_COOKIE_NAME}=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT`;
}
