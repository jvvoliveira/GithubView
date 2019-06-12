import React from 'react';
import ReactDOM from 'react-dom';
import SearchBar, { _pesquisar } from './SearchBar';
import TestRenderer from 'react-test-renderer';
import renderer from 'react-test-renderer';
import { request } from 'http';
import { promises } from 'fs';
import {
    render,
    fireEvent,
    cleanup,
    waitForElement,
    createEvent
} from '@testing-library/react';


describe("initial test SearchBar", () => {
    it('should renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<SearchBar />, div);
        ReactDOM.unmountComponentAtNode(div);
    });
    it('snapshot view public repos', () => {
        const tree = renderer.create(<SearchBar></SearchBar>).toJSON();
        expect(tree).toMatchSnapshot();
    });
    it('should write and make search', () => {
        const constPesquisa = jest.fn();

        const { getByText, getByTestId, asFragment, container } = render(
            <SearchBar />
        )

        const input = getByTestId('input')
        const button = getByTestId('searchButton')
        button.onclick = constPesquisa;

        fireEvent.change(input, { target: { value: 'jvvoliveira' } })

        waitForElement(() => fireEvent.click(button))

        expect(input.value).toBe('jvvoliveira')
        expect(constPesquisa).toBeCalledTimes(1)
    });
    it('should ', async () => {
        const event = { preventDefault: jest.fn() }
        const setRepos = jest.fn()
        const json = () => {
            return new Promise((resolve) => {
                resolve('mock user');
            })
        }
        const request = () => {
            return new Promise((resolve) => {
                resolve({ json, status: 200 });
            })
        }

        await _pesquisar(event, setRepos, 'usuario', request)
        expect(event.preventDefault).toBeCalled();
        expect(setRepos).toBeCalledWith('mock user')
    })

    it('should ', async () => {
        const event = { preventDefault: jest.fn() }
        const setRepos = jest.fn()
        const json = () => {
            return new Promise((resolve) => {
                resolve('mock user');
            })
        }
        const request = () => {
            return new Promise((resolve) => {
                resolve({ json, status: 404 });
            })
        }

        await _pesquisar(event, setRepos, 'usuario', request)
        expect(event.preventDefault).toBeCalled();
        expect(setRepos).toBeCalledWith([])
    })
});

