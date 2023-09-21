import React from 'react'

import Header from '../Header'
import Footer from '../Footer'
import LoadingView from '../LoadingView'
import CovidContext from '../../context/CovidContext'
import './index.css'

const statesList = [
  {
    state_code: 'AN',
    state_name: 'Andaman and Nicobar Islands',
  },
  {
    state_code: 'AP',
    state_name: 'Andhra Pradesh',
  },
  {
    state_code: 'AR',
    state_name: 'Arunachal Pradesh',
  },
  {
    state_code: 'AS',
    state_name: 'Assam',
  },
  {
    state_code: 'BR',
    state_name: 'Bihar',
  },
  {
    state_code: 'CH',
    state_name: 'Chandigarh',
  },
  {
    state_code: 'CT',
    state_name: 'Chhattisgarh',
  },
  {
    state_code: 'DN',
    state_name: 'Dadra and Nagar Haveli and Daman and Diu',
  },
  {
    state_code: 'DL',
    state_name: 'Delhi',
  },
  {
    state_code: 'GA',
    state_name: 'Goa',
  },
  {
    state_code: 'GJ',
    state_name: 'Gujarat',
  },
  {
    state_code: 'HR',
    state_name: 'Haryana',
  },
  {
    state_code: 'HP',
    state_name: 'Himachal Pradesh',
  },
  {
    state_code: 'JK',
    state_name: 'Jammu and Kashmir',
  },
  {
    state_code: 'JH',
    state_name: 'Jharkhand',
  },
  {
    state_code: 'KA',
    state_name: 'Karnataka',
  },
  {
    state_code: 'KL',
    state_name: 'Kerala',
  },
  {
    state_code: 'LA',
    state_name: 'Ladakh',
  },
  {
    state_code: 'LD',
    state_name: 'Lakshadweep',
  },
  {
    state_code: 'MH',
    state_name: 'Maharashtra',
  },
  {
    state_code: 'MP',
    state_name: 'Madhya Pradesh',
  },
  {
    state_code: 'MN',
    state_name: 'Manipur',
  },
  {
    state_code: 'ML',
    state_name: 'Meghalaya',
  },
  {
    state_code: 'MZ',
    state_name: 'Mizoram',
  },
  {
    state_code: 'NL',
    state_name: 'Nagaland',
  },
  {
    state_code: 'OR',
    state_name: 'Odisha',
  },
  {
    state_code: 'PY',
    state_name: 'Puducherry',
  },
  {
    state_code: 'PB',
    state_name: 'Punjab',
  },
  {
    state_code: 'RJ',
    state_name: 'Rajasthan',
  },
  {
    state_code: 'SK',
    state_name: 'Sikkim',
  },
  {
    state_code: 'TN',
    state_name: 'Tamil Nadu',
  },
  {
    state_code: 'TG',
    state_name: 'Telangana',
  },
  {
    state_code: 'TR',
    state_name: 'Tripura',
  },
  {
    state_code: 'UP',
    state_name: 'Uttar Pradesh',
  },
  {
    state_code: 'UT',
    state_name: 'Uttarakhand',
  },
  {
    state_code: 'WB',
    state_name: 'West Bengal',
  },
]

const apiStatusList = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inprogress: 'IN_PROGRESS',
}

const tabsList = {
  confirmed: 'confirmed',
  active: 'active',
  recovered: 'recovered',
  deceased: 'deceased',
}

class SpeificState extends React.Component {
  state = {
    apiStatus: apiStatusList.initial,
    stateData: {},
    stateName: '',
    activeTab: tabsList.confirmed,
  }

  componentDidMount() {
    this.getStateDetails()
  }

  getStateDetails = async () => {
    this.setState({apiStatus: apiStatusList.inprogress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const apiUrl = 'https://apis.ccbp.in/covid19-state-wise-data'
    console.log(apiUrl)
    const response = await fetch(apiUrl)
    if (response.ok) {
      const data = await response.json()
      const stateObj = data[id]
      console.log(stateObj)
      const stateName = statesList.find(each => each.state_code === id)
        .state_name
      this.setState({
        apiStatus: apiStatusList.success,
        stateData: stateObj,
        stateName,
      })
    } else {
      this.setState({apiStatus: apiStatusList.failure})
    }
  }

  renderStateRouteContainer = isThemeLight => {
    const {stateData, stateName, activeTab} = this.state
    const {total, meta, districts} = stateData
    const districtList = Object.keys(districts)

    return (
      <>
        <div className="data-update-details">
          <h1 className="state-name-heading">{stateName}</h1>
          <div className="state-tested-data">
            <p>Tested</p>
            <p>{meta.population}</p>
          </div>
        </div>
        <p className="date-para">
          Last updated on {`${new Date(meta.last_updated)}`}
        </p>
        <div className="state-covid-total-detail-box">
          <button
            type="button"
            className="state-covid-details-box-1"
            style={{
              backgroundColor:
                activeTab === tabsList.confirmed ? 'rgba(255,0,0,.2)' : null,
            }}
          >
            <p>Confirmed</p>
            <img
              className="state-covid-details-icon"
              alt="icon"
              src="https://res.cloudinary.com/dniq4wbom/image/upload/v1695199292/check-mark_1_je8igd.png"
            />
            <p>{total.confirmed}</p>
          </button>
          <button
            type="button"
            className="state-covid-details-box-2"
            style={{
              backgroundColor:
                activeTab === tabsList.confirmed ? 'rgba(0,150,255,.2)' : null,
            }}
          >
            <p>Active</p>
            <img
              className="state-covid-details-icon"
              alt="icon"
              src="https://res.cloudinary.com/dniq4wbom/image/upload/v1695199306/protection_1_qtlacm.png"
            />
            <p>{total.confirmed - (total.deceased + total.recovered)}</p>
          </button>
          <button
            className="state-covid-details-box-3"
            style={{
              backgroundColor:
                activeTab === tabsList.confirmed ? 'rgba(0,250,0,.2)' : null,
            }}
          >
            <p>Recovered</p>
            <img
              className="state-covid-details-icon"
              alt="icon"
              src="https://res.cloudinary.com/dniq4wbom/image/upload/v1695199313/recovered_1_gwsiyn.png"
            />
            <p>{total.recovered}</p>
          </button>
          <button
            className="state-covid-details-box-4"
            style={{
              backgroundColor:
                activeTab === tabsList.confirmed
                  ? 'rgba(100,100,100,.3)'
                  : null,
            }}
          >
            <p>Deceased</p>
            <img
              className="state-covid-details-icon"
              alt="icon"
              src="https://res.cloudinary.com/dniq4wbom/image/upload/v1695199300/breathing_1_f5oqyd.png"
            />
            <p>{total.deceased}</p>
          </button>
        </div>
        <ul className="district-list-container">hello</ul>
      </>
    )
  }

  renderView = isThemeLight => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusList.inprogress:
        return <LoadingView />
      case apiStatusList.success:
        return this.renderStateRouteContainer(isThemeLight)
      default:
        return null
    }
  }

  render() {
    return (
      <CovidContext.Consumer>
        {value => {
          const {isThemeLight} = value
          const routeClassName = isThemeLight
            ? 'state-route-light'
            : 'state-route'
          return (
            <div className={routeClassName}>
              <Header />
              <div className="state-route-container">
                <div className="state-details">
                  {this.renderView(isThemeLight)}
                </div>
              </div>
              <Footer />
            </div>
          )
        }}
      </CovidContext.Consumer>
    )
  }
}

export default SpeificState
