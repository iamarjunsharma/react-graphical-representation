import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ChartContainer from '../containers/ChartContainer';
import { addRepayment } from '../actions/index';

export class Repayment extends Component {
  constructor(props) {
    super(props);

    this.handleSubmitRepaymentForm = this.handleSubmitRepaymentForm.bind(this);
  }

  handleSubmitRepaymentForm(event) {
    event.preventDefault();
    const inputVal = this.repaymentInput.value;
    this.props.addRepayment(parseFloat(inputVal));
  }

  render() {
    return (
      <div className="main">
        <h4>Initial Balance: {this.props.balance}</h4>
        <form id="repaymentForm" onSubmit={this.handleSubmitRepaymentForm}>
          <label htmlFor="repayment">Monthly Payment</label>
          <input type="text" id="repayment" ref={(input) => { this.repaymentInput = input; }} />
          <input type="submit" hidden />
        </form>
        {this.props.balance > 0 && this.props.repayment > 0 &&
          <ChartContainer />}
      </div>
    );
  }
}

Repayment.propTypes = {
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

const mapDispatchToProps = dispatch => bindActionCreators({ addRepayment }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Repayment);
