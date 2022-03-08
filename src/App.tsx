import { NotFound, PrivateRoute } from "components/Common";
import { AdminLayout } from "components/Layout";
import LoginPage from "features/auth/pages/LoginPage";
import React from "react";
import { Route, Switch } from "react-router-dom";

function App() {
  return (
    <>
      <div className="">
        <Switch>
          <Route path="/login">
            <LoginPage />
          </Route>

          <PrivateRoute path="/admin">
            <AdminLayout />
          </PrivateRoute>

          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default App;
