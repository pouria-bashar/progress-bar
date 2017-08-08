import React from 'react';
import chai , { expect } from 'chai';
import { shallow } from 'enzyme';
import ProgressBar, { colors } from '../../src/components/ProgressBar';

describe('<ProgressBar />', () => {

  it('renders', function() {
    const wrapper = shallow(<ProgressBar />);
    expect(wrapper).to.have.length(1);
  });

  it('default percentage is zero', function() {
    const wrapper = shallow(<ProgressBar />);
    expect(wrapper.text()).to.equal('0%');
  });

  it('percentage is correctly shown', function() {
    const wrapper = shallow(<ProgressBar percentage={20} />);
    expect(wrapper.text()).to.equal('20%');
  });

  it('progress bar has correct width', () => {
    const alerPercentages = [101, 120];
    const negativePercentages = [-1, -20];
    const naturalPercentages = [0, 10, 99, 100];

    alerPercentages.map((percentage) => {
      const wrapper = shallow(<ProgressBar percentage={percentage} />).childAt(1);
      const width = wrapper.props().style.width;
      expect(width).to.equal('100%');
    });

    negativePercentages.map((percentage) => {
      const wrapper = shallow(<ProgressBar percentage={percentage} />).childAt(1);
      const width = wrapper.props().style.width;
      expect(width).to.equal('0%');
    });

    naturalPercentages.map((percentage) => {
      const wrapper = shallow(<ProgressBar percentage={percentage} />).childAt(1);
      const width = wrapper.props().style.width;
      expect(width).to.equal(`${percentage}%`);
    });
  });

  it('progress bar has correct background color', () => {
    const alertCases = [101, 120];
    const progressCases = [-1, 0, 10, 99, 100];

    progressCases.map(percentage => {
      const wrapper = shallow(<ProgressBar percentage={percentage} />).childAt(1);
      const { background } = wrapper.props().style;
      expect(background).to.equal(colors.progress);
    });

    alertCases.map(percentage => {
      const wrapper = shallow(<ProgressBar percentage={percentage} />).childAt(1);
      const { background } = wrapper.props().style;
      expect(background).to.equal(colors.alert);
    });
  });
})
