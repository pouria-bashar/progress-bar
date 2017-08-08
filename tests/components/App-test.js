import React from 'react';
import chai , { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import App from '../../src/App';
import ProgressBar from '../../src/components/ProgressBar';

describe('<App />', () => {

  it('renders', function() {
    const wrapper = shallow(<App />);
    expect(wrapper).to.have.length(1);
  });

  it('has correct number of progress bars, buttons and dropdown', function() {
    const wrapper = shallow(<App />);
    wrapper.setState({ bars: [1, 2, 3], buttons: [1, 2, 3] });

    expect(wrapper.find(ProgressBar)).to.have.length(3);
    expect(wrapper.find('button')).to.have.length(3);
    expect(wrapper.find('select').children()).to.have.length(3);
  });

  it('sets correct value on each bar', function() {
    const wrapper = mount(<App />);
    wrapper.setState({ bars: [1, 2, 3], buttons: [10, 20, 30] });

    wrapper.find('button').at(0).simulate('click');
    let state = wrapper.state();

    expect(state).to.deep.include({ bars: [11,2,3] });

    //Second bar second button
    wrapper.find('select').simulate('change', { target: { value: 1 }});
    wrapper.find('button').at(1).simulate('click');

    state = wrapper.state();
    expect(state).to.deep.include({ bars: [11, 22, 3] });

    //third bar third button
    wrapper.find('select').simulate('change', { target: { value: 2 }});
    wrapper.find('button').at(2).simulate('click');

    state = wrapper.state();
    expect(state).to.deep.include({ bars: [11, 22, 33] });
  });


})
