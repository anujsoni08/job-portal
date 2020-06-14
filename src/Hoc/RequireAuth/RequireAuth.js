const RequireAuth = ({ children }) => {
  if (!fakeAuth.signedIn) {
    return <Redirect to={LOGIN_URL} />;
  }

  return children;
};
