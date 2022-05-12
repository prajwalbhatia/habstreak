import React from "react";
import { Redirect, Route } from "react-router-dom";

function ProtectedRoute({ component: Component, ...restOfProps }) {
  const isAuthenticated = JSON.parse(localStorage.getItem('profile'));

  return (
    <Route
      {...restOfProps}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Redirect to="/account" />
      }
    />
  );
}

export default ProtectedRoute;