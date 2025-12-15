import { useAuth0 } from "@auth0/auth0-react";
/**
 * TODO: Ticket 3:
 * Implement authentication and logging functionality using Auth0
 */

export function LoggingButtons() {
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();

  const handleLogging = () => {
    if (isAuthenticated) {
      logout({
        logoutParams: {
          returnTo: window.location.origin
        }
      });
    } else {
      loginWithRedirect();
    }
  };

  return (
    <button onClick={handleLogging} className="nav-btn">
      {isAuthenticated ? "Log Out" : "Log In"}
    </button>
  );
};