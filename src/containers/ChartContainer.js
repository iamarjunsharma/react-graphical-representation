import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Chart from 'chart.js';
import { connect } from 'react-redux';

// Component for Chart
export class ChartContainer extends Component {
  constructor(props) {
    super(props);

    this.prepareData = this.prepareData.bind(this);
    this.prepareChart = this.prepareChart.bind(this);
  }

  componentDidMount() {
    this.prepareChart();
  }

  componentDidUpdate(prevProps) {
    // only update chart if the data has changed
    if (prevProps.balance !== this.props.balance || prevProps.repayment !== this.props.repayment) {
      this.prepareChart();
    }
  }

  prepareData(bal, rep) {
    const chartData = [];
    while (bal > -rep) {
      bal > 0 ? chartData.push(bal) : chartData.push(0);
      bal -= rep;
    }
    return chartData;
  }

  prepareChart() {
    // create Chart
    const ctx = document.getElementById('chart');
    const data = {
      labels: [...this.prepareData(this.props.balance, this.props.repayment).keys()],
      datasets: [{
        data: this.prepareData(this.props.balance, this.props.repayment),
        label: 'Repayment',
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
        ],
        borderColor: [
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
        ],
        borderWidth: 2,
        fill: false
      }]
    };

    // Initialize Chart
    const lineChart = new Chart(ctx, {
      type: 'line',
      data
    });
  }

  render() {
    return (
      <div className="chart-wrapper">
        <p><strong>Balance of accounts after a number of months</strong></p>
        <canvas id="chart" />
      </div>
    );
  }
}

ChartContainer.propTypes = {
  balance: PropTypes.number.isRequired,
  repayment: PropTypes.number.isRequired
};

const mapStateToProps = state => {
  const balance = state.balanceList.length > 0 ? state.balanceList.reduce((item, total = 0) => item + total) : 0;
  return {
    balance,
    repayment: state.repayment
  }
};

export default connect(mapStateToProps)(ChartContainer);
