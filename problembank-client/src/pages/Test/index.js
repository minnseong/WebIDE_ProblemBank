import React from 'react'
import {Route, Switch, useRouteMatch} from 'react-router-dom';
import TestPage from './pages/TestPage';
import ProblemsByCategory from './pages/ProblemsByCategory';
import DDetailProblem from './pages/Problem'
import ResultPage from './pages/ResultPage'
import Header from '../../components/Header';

function ProblemsByCategories(props) {
    const match = useRouteMatch();

    return (
        <div>
            <Header/>
        <Switch>
            <Route exact path ={`${match.url}`}component = {TestPage} />        
            <Route  path ={`${match.url}/level2`}component = {DDetailProblem} />        
            <Route  path ={`${match.url}/level1`}component = {DDetailProblem} />        
            <Route  path ={`${match.url}/level3`}component = {DDetailProblem} />               
            <Route path = {`${match.url}/listproblems`} component = {ProblemsByCategory} />       
            <Route path = {`${match.url}/result`} component = {ResultPage} />       
        </Switch>
        </div>
    )
}

export default ProblemsByCategories

