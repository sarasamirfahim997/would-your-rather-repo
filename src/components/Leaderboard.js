import React, { Component } from 'react'
import { connect } from 'react-redux'

class Leaderboard extends Component {
    render() {
        const { data } = this.props
        return (
            <div className='card d-flex justify-content-center'>
                {data ? data.map((user)=>(
                <ul key={user.id} className='cards align-self-center m-4'>
                    <li  className='row'>
                        <div className="col mb-2">
                        <img width='100' height='100' className='rounded m-4' src={user.avatarURL} alt=''/>
                        <h4 className='card__title d-inline text-light'>{user.name}</h4>
                        </div>

                        <div className="card__content">
                            <span className='card__title d-block text-center'>Answered Question : {user.answeredQuestions}</span>
                            <span className='card__title d-block text-center'>Asked Question : {user.askedQuestions}</span>
                            <span className='card__title d-block text-center'>Total: {user.answeredQuestions + user.askedQuestions}</span>
                        </div>
                    </li>
                </ul>
                )): null}
            </div>
        )
    }
}

function mapStateToProps({ authedUser, users, questions }){
    const data = Object.keys(users).map((user)=>({
        id: user,
        name: users[user].name,
        avatarURL: users[user].avatarURL,
        answeredQuestions: Object.keys(users[user].answers).length,
        askedQuestions: Object.keys(questions).filter((q)=> questions[q].author === user).length
    })).sort((a,b)=> b.answeredQuestions + b.askedQuestions - (a.answeredQuestions + a.askedQuestions))

    return {
        authedUser,
        data
    }
}
export default connect(mapStateToProps)(Leaderboard)