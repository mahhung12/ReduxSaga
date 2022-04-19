import { Box } from "@material-ui/core";
import { useAppDispatch } from "app/hooks";
import { cityActions } from "features/city/citySlice";
import { useEffect } from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import AddEditPage from "./pages/AddEditPage";
import ListPage from "./pages/ListPage";

export default function StudenFeature() {
  const match = useRouteMatch();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(cityActions.fetchCityList());
  }, [dispatch])

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
