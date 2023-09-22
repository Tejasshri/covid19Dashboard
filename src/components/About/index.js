import React from 'react'

import Header from '../Header'
import Footer from '../Footer'
import LoadingView from '../LoadingView'
import CovidContext from '../../context/CovidContext'

import './index.css'

export default class About extends React.Component {
  state = {
    isLoading: true,
    faqsList: [],
    isThemeLight: false,
  }

  componentDidMount() {
    this.renderFaqData()
  }

  renderFaqData = async () => {
    const apiUrl = 'https://apis.ccbp.in/covid19-faqs'
    const response = await fetch(apiUrl)
    const data = await response.json()
    console.log(data)
    this.setState({faqsList: data.faq, isLoading: false})
  }

  renderAboutContainer = () => {
    const {faqsList} = this.state

    return (
      <div className="about-route-content">
        <h1 className="about-heading">About</h1>
        <p className="update-paragraph">Last updated on march 28th 2021</p>
        <h1 className="vaccine-ready-heading">
          COVID-19 vaccines be ready for distribution
        </h1>
        <ul className="faqs-unordered-list">
          {faqsList.map(each => (
            <li className="faq-list-item" key={each.qno}>
              <p className="question">{each.question}</p>
              <p className="answer">{each.answer}</p>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  render() {
    const {isLoading} = this.state
    return (
      <CovidContext.Consumer>
        {({isThemeLight}) => {
          const routeClassName = isThemeLight
            ? 'about-route-light'
            : 'about-route'
          return (
            <div className={routeClassName}>
              <Header />
              {isLoading ? <LoadingView /> : this.renderAboutContainer()}
              <Footer />
            </div>
          )
        }}
      </CovidContext.Consumer>
    )
  }
}
