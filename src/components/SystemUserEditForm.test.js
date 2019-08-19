import React from 'react';
import { shallow } from 'enzyme';
import { spy } from 'sinon';
import SystemUserEditForm from './SystemUserEditForm';

describe('SystemUserEditForm', () => {
    it('renders proper elements', () => {
        const wrapper = shallow(<SystemUserEditForm />);

        expect(wrapper.find('h3').length).toBe(1);
        expect(wrapper.find('h3').text()).toBe('User Information');
        expect(wrapper.find('FormRow').length).toBe(4);
        expect(wrapper.find('FormGroup').length).toBe(8);
    });
});
