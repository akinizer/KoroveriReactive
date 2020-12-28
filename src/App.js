import React, { Component } from "react";
import { Link, Switch, Route } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css";

//import { CaseModelList, AddCaseModel, CaseModel } from "react"

import {MainCase,AllCases,CityCases,DateCases, AddCases} from './components/Main'

export default class App extends Component{
  render(){
    return(
     <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/"} className="nav-link">
                <h5>CaseModel</h5>
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/all"} className="nav-link">
                All
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add
              </Link>
            </li>
			<li className="nav-item">
              <Link to={"/city"} className="nav-link">
                City
              </Link>
            </li>

			<li className="nav-item">
              <Link to={"/date"} className="nav-link">
                Date
              </Link>
            </li>
          </div>
        </nav>
       <div className="container mt-3">
          <Switch>
            <Route exact path={["/"]} component={MainCase} />
            <Route exact path={["/all"]} component={AllCases} />
            <Route 
              exact path="/city/:attr"
              children={({ match }) => match && <CityCases match={match} />}
            />

            <Route 
              exact path={["/date/:attr"]} component={DateCases}
               children={({ match }) => match && <DateCases match={match} />}/>
            <Route path={["/add"]} component={AddCases} />
          </Switch>
        </div>
      </div>
  )
  }
}