import React from 'react';
import ReactDOM from 'react-dom';
import SearchBar from './SearchBar';
import TestRenderer from 'react-test-renderer';
import renderer from 'react-test-renderer';
import { request } from 'http';


describe("initial test", () => {
    it('should renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<SearchBar />, div);
        ReactDOM.unmountComponentAtNode(div);
    });
    it('should take public repos by a github user', () => {
        const testRenderer = TestRenderer.create(
            <SearchBar></SearchBar>
        );

        let searchBar = testRenderer.getInstance();
        const usuario = "jvvoliveira";
        searchBar.setState({ usuario });
        expect(searchBar.state.usuario).toEqual("jvvoliveira");

        // const ev = jest.fn();
        // ev.mockReturnValue();

        const event = {
            //propriedade que não faz nada, apenas para ser chamada no método de pesquisar e não dar undefined
            preventDefault: () => {} 

        }

        const request = () => {
            //fazer promisse
        }

        searchBar.pesquisar(event, request);
    });
    it('snapshot view public repos', () => {
        const tree = renderer.create(<SearchBar></SearchBar>).toJSON();
        expect(tree).toMatchSnapshot();
    });
});

