import React, { useEffect } from 'react';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Layout from './hoc/Layout/Layout';
import Quiz from './containers/Quiz/Quiz';
import QuizList from './containers/QuizList/QuizList';
import QuizCreator from './containers/QuizCreator/QuizCreator';
import Auth from './containers/Auth/Auth';
import Logout from './components/Logout/Logout';
import { autoLogin } from './store/actions/auth';

function App(props) {
  useEffect(() => {
    props.autoLogin();
  });

  let routes = (
    <Switch>
      <Route path="/auth" component={Auth}></Route>
      <Route path="/quiz/:id" component={Quiz}></Route>
      <Route path="/" component={QuizList}></Route>
      <Redirect to="/" />
    </Switch>
  );

  if (props.isAuth) {
    routes = (
      <Switch>
        <Route path="/quiz-creator" component={QuizCreator}></Route>
        <Route path="/quiz/:id" component={Quiz}></Route>
        <Route path="/logout" component={Logout}></Route>
        <Route path="/" component={QuizList}></Route>
        <Redirect to="/" />
      </Switch>
    );
  }

  return <Layout>{routes}</Layout>;
}

function mapStateToProps(state) {
  return {
    isAuth: !!state.auth.token,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    autoLogin: () => dispatch(autoLogin()),
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
