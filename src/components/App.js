import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  BrowserRouter,
  Switch,
  Route
} from "react-router-dom";
import { handleInitialData } from '../actions/shared'
import '../App.css'
import Dashboard from './Dashboard'
import SignIn from './SignIn'
import NewQuestion from './NewQuestion'
import QuestionPage from './QuestionPage'
import NavBar from './NavBar'
import Leaderboard from './Leaderboard'
import NotFound from './NotFound'
import LoadingBar from "react-redux-loading";

class App extends Component {
  componentDidMount(){
    this.props.dispatch(handleInitialData())
  }

  render() {
    console.log(this.props)
    return (
      <BrowserRouter>
      <div>
        <LoadingBar style={{ backgroundColor: 'rgb(176, 106, 252)', height: '5px' }} />
      </div>
      {this.props.noAuthed === true ? (
          <Route render={() => <SignIn />} />
      ):(
        <>
        <NavBar authedUser={this.props.authedUser} />
      <Switch>
        <Route exact path="/" component={Dashboard}/>
        <Route path='/questions/:id'  component={QuestionPage} />
        <Route path='/add'  component={NewQuestion} />
        <Route path='/leaderboard'  component={Leaderboard} />
        <Route path='/notfound'  component={NotFound} />
      </Switch>
      </>
      )}
      
      </BrowserRouter>
    )
  }
}

function mapStateToProps({ authedUser }){
  return{
    noAuthed: authedUser === null,
    authedUser
  }
}

export default connect(mapStateToProps)(App)