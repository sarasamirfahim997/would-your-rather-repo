import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'

class SignIn extends Component {
    state={
        userSelected:''
    }
    handleSelectUser=(user)=>{
        this.setState(()=>({
            userSelected: user
        }))
    }
    handleSubmit=(e)=>{
        e.preventDefault();
        const { dispatch } = this.props
        dispatch(setAuthedUser(this.state.userSelected))
    }
    render() {
        console.log("singin page ")
        const { users } = this.props
        return (
            <div className='container'>
            <div className='row d-flex justify-content-center mt-5'>
            <div class="col-5">
                <div className='card p-4'>
            <div class="col-3">
                
                            <div class="line r"></div>
                        </div>
                        <div className='division'>
                        <div className='row'>
                        <div class="text-light "><span className='font-weight-bold'>Select user to continue</span></div>
                        </div>
                        </div>
            <form className='myform'>
                    <select className="form-select bg-dark text-light border-dark" onChange={(e)=> this.handleSelectUser(e.target.value)}>
                        <option selected disabled>Select User</option>
                        {users && Object.keys(users).map((user)=>(
                            <option key={user} value={user}>{users[user].name}</option>
                        ))}
                    </select>
                    <div className='row '>
                    <div class="form-group mt-3"> 
                    <button type="button" onClick={this.handleSubmit} disabled={!this.state.userSelected} className="col-12 btn btn-primary btn-lg"><small>Login</small></button>
                    </div>
                    </div>
            </form>
            </div>
            </div></div>
            </div>
        )
    }
}

function mapStateToProps({users}){
    return{
        users
    }
}

export default connect(mapStateToProps)(SignIn)