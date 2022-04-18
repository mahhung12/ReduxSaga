import { Box } from "@material-ui/core";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import AddEditPage from "./pages/AddEditPage";
import ListPage from "./pages/ListPage";

export default function StudenFeature() {
  const match = useRouteMatch();

  return (
    <Box>
      <Switch>
        <Route path={match.path} exact>
          <ListPage />
        </Route>

        <Route path={`${match.path}/add`} >
          <AddEditPage />
        </Route>

        <Route path={`${match.path}/:studentId`} >
          <AddEditPage />
        </Route>

      </Switch>
    </Box>
  );
}
