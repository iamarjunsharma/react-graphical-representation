import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import { Repayment } from '../../containers/Repayment';

describe('Repayment', () => {
  it('should dispatch action \'ADD_REPAYMENT\' when submitting form', () => {
    const props = {
      balance: 5000,
      repayment: 0,
      addRepayment: sinon.spy()
    };

    const wrapper = mount(<Repayment {...props} />);
    wrapper.find('#repaymentForm').simulate('submit');
    expect(props.addRepayment.calledOnce).to.equal(true);
  });
});