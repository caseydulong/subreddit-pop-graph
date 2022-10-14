import React from 'react'
import Chart from 'react-apexcharts'

export default class Graph extends React.Component {
  render() {
    let noData = true
    if (this.props.series[0].data.length != 0) noData = false

    if (noData) return (
      <p>No data.</p>
    )
    return (
      <div className='Graph'>
        <div className='Graph-container'>
          <Chart
            options={this.props.options}
            series={this.props.series}
            type='bar'
          />
        </div>
      </div>
    )
  }
}
