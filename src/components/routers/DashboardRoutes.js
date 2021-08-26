import React from "react";
import { Redirect, Switch, Route } from "react-router-dom";
import { DcScreen } from "../dc/DcScreen";
import { HeroeScreen } from "../heroes/HeroeScreen";
import { MarvelScreen } from "../marvel/MarvelScreen";
import { SearchScreen } from "../search/SearchScreen";
import { Navbar } from "../ui/Navbar";

export const DashboardRoutes = () => {
  return (
    <>
      <Navbar />
      <div className='container mt-2'>
        <Switch>
          <Route exact path='/marvel' component={MarvelScreen} />
          <Route exact path='/heroe/:heroeId' component={HeroeScreen} />
          <Route exact path='/dc' component={DcScreen} />
          <Route exact path='/search' component={SearchScreen} />

          <Redirect to='/marvel' />
        </Switch>
      </div>
    </>
  );
};
