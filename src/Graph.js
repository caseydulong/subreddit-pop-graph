import React from 'react'
import Chart from 'react-apexcharts'

export default class Graph extends React.Component {
  render() {
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
