import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addBalance, addCount } from '../actions/index';

export class Balance extends Component {
  constructor(props) {
    super(props);

    this.handleSubmitBalanceForm = this.handleSubmitBalanceForm.bind(this);
  }

  handleSubmitBalanceForm(event) {
    event.preventDefault();

    let inputVal = this.input.value;
    this.props.addBalance(parseFloat(inputVal));
    this.props.addCount();

    inputVal = '';
  }

  render() {
    return (
      <div className="sidebar">
        <h1>Accounts</h1>
        <p><strong>Count: {this.props.count}</strong></p>
        <form id="balanceForm" onSubmit={this.handleSubmitBalanceForm}>
          <label htmlFor="balance">Balance</label>
          <input type="text" id="balance" ref={(node) => { this.input = node; }} />
          <input type="submit" value="Submit" />
        </form>
        <ul className="list">
          {this.props.balanceList.length !== 0 &&
            this.props.balanceList.map((item, i) => (
              <li key={i}>Balance: {item}</li>
            ))
          }
        </ul>
      </div>
    );
  };
}

Balance.propTypes = {
  balanceList: PropTypes.array,
  count: PropTypes.number
};

const mapStateToProps = state => (
  {
    balanceList: state.balanceList,
    count: state.count
  }
);

const mapDispatchToProps = dispatch => bindActionCreators({ addBalance, addCount }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Balance);
