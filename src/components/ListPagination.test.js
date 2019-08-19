import React from 'react';
import { shallow } from 'enzyme';
import { spy } from 'sinon';
import ListPagination from './ListPagination';

describe('ListPagination', () => {
    it('renders proper elements with 1 page', () => {
        const wrapper = shallow(
            <ListPagination
                currentPage={1}
                pageSize={10}
                systemUserCount={1}
            />
        );

        const children = wrapper.children();

        expect(children.length).toBe(5);
    });

    it('renders proper elements with 10 pages and elipses on both sides', () => {
        const wrapper = shallow(
            <ListPagination
                currentPage={5}
                pageSize={10}
                systemUserCount={100}
            />
        );

        const children = wrapper.children();

        expect(children.length).toBe(11);
    });

    it('renders proper elements with 10 pages and elipses on the right side only', () => {
        const wrapper = shallow(
            <ListPagination
                currentPage={1}
                pageSize={10}
                systemUserCount={100}
            />
        );

        const children = wrapper.children();

        expect(children.length).toBe(10);
    });

    it('renders proper elements with 10 pages and elipses on the left side only', () => {
        const wrapper = shallow(
            <ListPagination
                currentPage={10}
                pageSize={10}
                systemUserCount={100}
            />
        );

        const children = wrapper.children();

        expect(children.length).toBe(10);
    });

    it('clicking the first item calls "onChangePage(1)"', () => {
        const onChangePageSpy = spy();
        const wrapper = shallow(
            <ListPagination
                currentPage={1}
                pageSize={10}
                systemUserCount={100}
                onChangePage={onChangePageSpy}
            />
        );

        wrapper.children().first().simulate('click');

        expect(onChangePageSpy.callCount).toBe(1);
        expect(onChangePageSpy.args[0][0]).toBe(1);
    });

    it('clicking the last item calls "onChangePage(10)"', () => {
        const onChangePageSpy = spy();
        const wrapper = shallow(
            <ListPagination
                currentPage={1}
                pageSize={10}
                systemUserCount={100}
                onChangePage={onChangePageSpy}
            />
        );

        wrapper.children().last().simulate('click');

        expect(onChangePageSpy.callCount).toBe(1);
        expect(onChangePageSpy.args[0][0]).toBe(10);
    });

    it('clicking the left elipsis calls "onChangePage(2)" when on page 5', () => {
        const onChangePageSpy = spy();
        const wrapper = shallow(
            <ListPagination
                currentPage={5}
                pageSize={10}
                systemUserCount={100}
                onChangePage={onChangePageSpy}
            />
        );

        wrapper.children().at(2).simulate('click');

        expect(onChangePageSpy.callCount).toBe(1);
        expect(onChangePageSpy.args[0][0]).toBe(2);
    });

    it('clicking the left elipsis calls "onChangePage(8)" when on page 5', () => {
        const onChangePageSpy = spy();
        const wrapper = shallow(
            <ListPagination
                currentPage={5}
                pageSize={10}
                systemUserCount={100}
                onChangePage={onChangePageSpy}
            />
        );

        wrapper.children().at(8).simulate('click');

        expect(onChangePageSpy.callCount).toBe(1);
        expect(onChangePageSpy.args[0][0]).toBe(8);
    });
});
