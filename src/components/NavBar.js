import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import { setAuthedUser } from '../actions/authedUser'

class NavBar extends Component {
    handleLogOut =()=>{
        const { dispatch } = this.props
        dispatch(setAuthedUser(null))
    }
    render() {
        const { authedUser, users } = this.props
        return (
            <div className="nav col-12 d-flex justify-content-between">
                <div className='col-9'>
                    <ul className="nav ">
                    <Link className='font text-light' to='/' ><li>Home</li></Link>
                    <Link className='font text-light' to='/add'><li>New Question</li></Link>
                    <Link className='font text-light' to='/leaderboard'><li>Leaderboard</li></Link>
                    </ul>
                    </div>
            <div className='col-3'>
                <span className='font text-light'>{users[authedUser].name}</span>
                <img className='m-2 rounded' width="40" height="40" src={users[authedUser].avatarURL} alt='userAvatar' />
                <button className='font btn btn-primary' onClick={this.handleLogOut}>
                    LogOut
                </button>
            </div>
            </div>
        )
    }
}

function mapStateToProps({ authedUser, users}){
    return{
        authedUser,
        users
    }
}

export default connect(mapStateToProps)(NavBar)