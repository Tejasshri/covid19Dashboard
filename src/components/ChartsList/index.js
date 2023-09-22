import React from 'react'
import {
  Bar,
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  LabelList,
  LineChart,
  Line,
} from 'recharts'
import LoadingView from '../LoadingView'

import './index.css'

class ChartsList extends React.Component {
  state = {
    isLoading: true,
    stateTimelineData: {},
  }

  componentDidMount() {
    this.getStateTimelineDetails()
  }

  getColor = tab => {
    switch (tab) {
      case 'confirmed':
        return 'red'
      case 'deceased':
        return 'grey'
      case 'recovered':
        return 'rgb(0,255,50)'
      default:
        return 'rgba(0,150,255,1)'
    }
  }

  renderSpreadChart = category => {
    const {stateCode} = this.props
    const {stateTimelineData} = this.state
    console.log(stateTimelineData[stateCode])
    const dateList = Object.keys(stateTimelineData[stateCode].dates)
    const activeCategoryDataList = dateList.map(each => ({
      date: `${each}`,
      dailyCount:
        category === 'active'
          ? stateTimelineData[stateCode].dates[each].total.confirmed -
            (stateTimelineData[stateCode].dates[each].total.recovered +
              stateTimelineData[stateCode].dates[each].total.deceased)
          : stateTimelineData[stateCode].dates[each].total[category],
    }))

    return (
      <LineChart data={activeCategoryDataList} width={800} height={500}>
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line dataKey="dailyCount" fill={this.getColor('')} />
      </LineChart>
    )
  }

  renderAllLineChart = () => <>{this.renderSpreadChart('confirmed')}</>

  renderBarChart = () => {
    const {activeTab, stateCode} = this.props
    const {stateTimelineData} = this.state
    console.log(stateTimelineData[stateCode])
    const dateList = Object.keys(stateTimelineData[stateCode].dates)
    const activeTabDataList = dateList
      .map(each => ({
        date: `${each}`,
        dailyCount:
          activeTab === 'active'
            ? stateTimelineData[stateCode].dates[each].total.confirmed -
              (stateTimelineData[stateCode].dates[each].total.recovered +
                stateTimelineData[stateCode].dates[each].total.deceased)
            : stateTimelineData[stateCode].dates[each].total[activeTab],
      }))
      .slice(40, 50)
    console.log(activeTabDataList)

    return (
      <>
        <BarChart
          width={800}
          height={500}
          data={activeTabDataList}
          className="bar-chart"
        >
          <XAxis dataKey="date" />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="dailyCount"
            fill={this.getColor(activeTab)}
            className="bar"
            label={{position: 'top', color: 'red'}}
            barSize="10%"
            name={activeTab}
          >
            <LabelList dataKey="dailyCount" />
          </Bar>
        </BarChart>
      </>
    )
  }

  getStateTimelineDetails = async () => {
    const {stateCode} = this.props
    const apiUrl = `https://apis.ccbp.in/covid19-timelines-data/${stateCode}`
    const response = await fetch(apiUrl)
    const data = await response.json()
    console.log(data)
    this.setState({stateTimelineData: data, isLoading: false})
  }

  render() {
    const {isLoading} = this.state
    return isLoading ? (
      <LoadingView />
    ) : (
      <div className="charts-container-list">
        <div className="bar-chart-container">{this.renderBarChart()}</div>
        <div className="line-chart-container">{this.renderAllLineChart()}</div>
      </div>
    )
  }
}

export default ChartsList
