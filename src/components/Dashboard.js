import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question from './Question'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

class Dashboard extends Component {
    render() {
        return (
            <div className='card'>
                  <Tabs className='container'>
                        <TabList>
                        <Tab className='btn tab text-light'>UnAnswered</Tab>
                        <Tab className='btn tab text-light'>Answered</Tab>
                        </TabList>

                        <TabPanel>
                        <div>{this.props.unansweredQuestions.map((q)=>(
                            <div key={q}>
                                <Question id={q} />
                            </div>
                        ))}</div>
                        </TabPanel>
                        <TabPanel>
                        <div>{this.props.answeredQuestions.map((q)=>(
                        <div key={q}>
                            <Question id={q} />
                        </div>
                    ))}</div>
                        </TabPanel>
                    </Tabs>
            </div>
        )
    }
}

function mapStateToProps({ questions, authedUser, users }){
    const answeredQuestions = Object.keys(users[authedUser].answers)
    const unansweredQuestions = Object.keys(questions)
    .filter((q)=> !answeredQuestions.includes(q))

    return{
        answeredQuestions,
        unansweredQuestions
    }
}
export default connect(mapStateToProps)(Dashboard)