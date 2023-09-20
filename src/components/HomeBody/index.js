import React from 'react'
import {withRouter} from 'react-router-dom'
import {BsSearch, BsSortDownAlt, BsSortDown} from 'react-icons/bs'
import {BiChevronRightSquare} from 'react-icons/bi'
import {AiOutlineCheckCircle} from 'react-icons/ai'
import {MdSort} from 'react-icons/md'

import CovidContext from '../../context/CovidContext'
import LoadingView from '../LoadingView'
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

class HomeBody extends React.Component {
  state = {
    searchInput: '',
    apiStatus: apiStatusList.initial,
    covidData: [],
  }

  componentDidMount() {
    this.getCovidData()
  }

  getCovidData = async () => {
    this.setState({apiStatus: apiStatusList.inprogress})
    const apiUrl = 'https://apis.ccbp.in/covid19-state-wise-data'
    const response = await fetch(apiUrl)
    if (response.ok) {
      const data = await response.json()
      this.setState({apiStatus: apiStatusList.success, covidData: data})
    } else {
      this.setState({apiStatus: apiStatusList.failure})
    }
  }

  onClickStateButton = obj => {
    this.setState({searchInput: obj.state_name})
    const {history} = this.props
    history.replace(`/state/${obj.state_name}`)
  }

  renderResultList = isThemeLight => {
    const {searchInput} = this.state
    const filterData = statesList.filter(each =>
      each.state_name.toLowerCase().includes(searchInput.toLowerCase()),
    )
    return (
      <ul className="search-result-container">
        {filterData.map(each => (
          <li className="search-result-item" key={each.state_code}>
            <p>{each.state_name}</p>
            <button
              className="state-button"
              type="button"
              onClick={() => this.onClickStateButton(each)}
            >
              <p>{each.state_code}</p>
              <BiChevronRightSquare size={20} />
            </button>
          </li>
        ))}
      </ul>
    )
  }

  getTotalOfData = () => {
    const {covidData} = this.state
    let [confirmedTotal, deceasedTotal, recoveredTotal] = [0, 0, 0]
    statesList.forEach(obj => {
      const stateObj = covidData[`${obj.state_code}`]
      console.log(stateObj)
      const {total} = stateObj
      const {confirmed, deceased, recovered} = total
      confirmedTotal += confirmed
      deceasedTotal += deceased
      recoveredTotal += recovered
    })
    const activeTotal = confirmedTotal - deceasedTotal - recoveredTotal
    return {
      confirmedTotal,
      activeTotal,
      deceasedTotal,
      recoveredTotal,
    }
  }

  renderStateWiseDataTable = () => {
    const {covidData} = this.state
    return (
      <table className="state-wise-data-table">
        <thead>
          <tr>
            <th className="first-head">
              States/UT
              <button type="button" className="sort-button">
                <BsSortDownAlt size="20" color="grey" />
              </button>
              <button type="button" className="sort-button">
                <BsSortDown size="20" color="grey" />
              </button>
            </th>
            <th>Confirmed</th>
            <th>Active</th>
            <th>Recovered</th>
            <th>Deceased</th>
            <th>Population</th>
          </tr>
        </thead>
        <tbody>
          {statesList.map(each => {
            const stateObj = covidData[`${each.state_code}`]
            const {total} = stateObj
            return (
              <tr key={each.state_code}>
                <td>{each.state_name}</td>
                <td>{total.confirmed}</td>
                <td>Active</td>
                <td>{total.recovered}</td>
                <td>{total.deceased}</td>
                <td>{total.confirmed}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    )
  }

  renderCovidView = () => (
    <CovidContext.Consumer>
      {value => {
        const {isThemeLight} = value
        const totalOfData = this.getTotalOfData()
        /* const confirmed = covidData.reduce((obj1, obj2) => obj1.) */

        return (
          <>
            <div className="covid-total-detail-box">
              <div className="covid-details-box-1">
                <p>Confirmed</p>
                <img
                  className="covid-details-icon"
                  alt="icon"
                  src="https://res.cloudinary.com/dniq4wbom/image/upload/v1695199292/check-mark_1_je8igd.png"
                />
                <p>{totalOfData.confirmedTotal}</p>
              </div>
              <div className="covid-details-box-2">
                <p>Active</p>
                <img
                  className="covid-details-icon"
                  alt="icon"
                  src="https://res.cloudinary.com/dniq4wbom/image/upload/v1695199306/protection_1_qtlacm.png"
                />
                <p>{totalOfData.activeTotal}</p>
              </div>
              <div className="covid-details-box-3">
                <p>Recovered</p>
                <img
                  className="covid-details-icon"
                  alt="icon"
                  src="https://res.cloudinary.com/dniq4wbom/image/upload/v1695199313/recovered_1_gwsiyn.png"
                />
                <p>{totalOfData.recoveredTotal}</p>
              </div>
              <div className="covid-details-box-4">
                <p>Deceased</p>
                <img
                  className="covid-details-icon"
                  alt="icon"
                  src="https://res.cloudinary.com/dniq4wbom/image/upload/v1695199300/breathing_1_f5oqyd.png"
                />
                <p>{totalOfData.deceasedTotal}</p>
              </div>
            </div>
            {this.renderStateWiseDataTable()}
          </>
        )
      }}
    </CovidContext.Consumer>
  )

  renderView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusList.inprogress:
        return <LoadingView />
      case apiStatusList.success:
        return this.renderCovidView()
      default:
        return null
    }
  }

  onChangeInput = event => this.setState({searchInput: event.target.value})

  render() {
    return (
      <CovidContext.Consumer>
        {value => {
          const {searchInput} = this.state
          const {isThemeLight} = value
          const homeBodyClass = isThemeLight ? 'home-body-light' : 'home-body'
          const searchBoxClass = isThemeLight
            ? 'search-box-light'
            : 'search-box'
          return (
            <div className={homeBodyClass}>
              <div className="search-box-container">
                <div className={searchBoxClass}>
                  <button type="button" className="search-button">
                    <BsSearch
                      color={isThemeLight ? 'black' : 'white'}
                      size="20"
                    />
                  </button>
                  <input
                    placeholder="Enter the State"
                    type="search"
                    className="search-input"
                    onChange={this.onChangeInput}
                    value={searchInput}
                    style={{
                      color: isThemeLight ? 'black' : 'white',
                    }}
                  />
                </div>
                {searchInput !== '' && this.renderResultList(isThemeLight)}
              </div>
              {searchInput === '' && this.renderView()}
            </div>
          )
        }}
      </CovidContext.Consumer>
    )
  }
}

export default withRouter(HomeBody)
