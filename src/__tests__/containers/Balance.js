import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import { Balance } from '../../containers/Balance';

describe('Balance', () => {
  it('should dispatch action \'ADD_BALANCE\' when submitting form', () => {
    const props = {
      balanceList: [5000],
      count: 0,
      addBalance: sinon.spy(),
      addCount: () => {}
    };

    const wrapper = mount(<Balance {...props} />);
    wrapper.find('#balanceForm').simulate('submit');
    expect(props.addBalance.calledOnce).to.equal(true);
  });

  it('should dispatch action \'ADD_COUNT\' when submitting form', () => {
    const props = {
      balanceList: [5000],
      count: 0,
      addBalance: () => {},
      addCount: sinon.spy()
    };

    const wrapper = mount(<Balance {...props} />);
    wrapper.find('#balanceForm').simulate('submit');
    expect(props.addCount.calledOnce).to.equal(true);
  });

  it('Count should render 2', () => {
    const props = {
      balanceList: [5000],
      count: 0,
      addBalance: () => {},
      addCount: sinon.spy()
    };

    const wrapper = mount(<Balance {...props} />);
    const count = wrapper.find('strong');
    wrapper.setProps({ count: 2 });

    expect(count.text()).to.equal('Count: 2');
  });
});