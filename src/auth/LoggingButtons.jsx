/**
 * TODO: Ticket 3:
 * Implement authentication and logging functionality using Auth0
 */
import { useAuth0 } from "@auth0/auth0-react";

export const LoggingButtons = () => {
  // TODO: Replace these with Auth0 functionality
  const { loginWithRedirect, logout, isAuthenticatd } = useAuth0();

  const handleLogging = () => {
    if (isAuthenticated) {
      logout({
        logoutParams: {
          returnTo: window.location.orgin, //retunr to app after logout
        },
      });
    } else {
      loginWithRedirect();
    }
  };

  return (
    <button className='nav-btn  px-4 py-1' onClick={handleLogging}>
      {isAuthenticatd ? 'Log Out' : 'Log In'}
    </button>
  );
};