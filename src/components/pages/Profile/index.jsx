/**
 * TODO: Ticket 3:
 * Implement authentication using Auth0:
 * - Get the user data from Auth0
 * - Create and style the component
 * - Display the data
 * - Make this page a protected Route
 */
import { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {
  // TODO: Replace these with functionality from Auth0
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div className="text-center p-4 text-xl">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <div className="text-center p-4 text-xl">You must be logged in to view this page nerd!</div>
  }

  return (
    <div className="flex flex-col items-center p-8">
      <img
        src={user.picture}
        alt={user.name}
        className="w-32 h-32 rounded-full shadow-lg mb-6"
      />
      <h1></h1>
      <p></p>
      <div>
        <pre></pre>
      </div>
    </div>
  );
};
export default Profile;