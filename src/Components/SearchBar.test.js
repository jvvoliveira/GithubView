import React from 'react';
import ReactDOM from 'react-dom';
import SearchBar from './SearchBar';
import TestRenderer from 'react-test-renderer';
import renderer from 'react-test-renderer';
import { request } from 'http';
import App from '../App';
import { promises } from 'fs';
import { reject } from 'q';


describe("initial test SearchBar", () => {
    it('should renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<SearchBar />, div);
        ReactDOM.unmountComponentAtNode(div);
    });
    // it('should take public repos by a github user', (done) => {
    //     const setRepos = jest.fn(); //mock de função
    //     const testRenderer = TestRenderer.create(
    //         <SearchBar setRepos={setRepos}></SearchBar>
    //     );

    //     let searchBar = testRenderer.getInstance();
    //     const usuario = "jvvoliveira";
    //     searchBar.setState({ usuario });
    //     expect(searchBar.state.usuario).toEqual("jvvoliveira");

    //     const event = {
    //         //propriedade que não faz nada, apenas para ser chamada no método de pesquisar e não dar undefined
    //         preventDefault: () => { }

    //     }

    //     //fazer promise dentro de promise
    //     const request = () => {
    //         return new Promise((resolve, reject) => {
    //             resolve(() => {
    //                 return {
    //                     json: () => {
    //                         return new Promise((resolve, reject) => {
    //                             resolve(() => {
    //                                 return {
    //                                     name: 'name',
    //                                     description: 'description',
    //                                     link: 'link',
    //                                     language: 'language'
    //                                 };
    //                             });
    //                         });
    //                     }
    //                 }

    //             });
    //         });
    //     };
    //     async function test() {
    //         try {
    //             await searchBar.pesquisar(event, request);
    //             expect(setRepos).toBeCalled();
    //         } catch (error) {
    //             console.log("await devolveu reject da promisse");
    //         }
    //     }
    //     test();
    // });
    it('snapshot view public repos', () => {
        const tree = renderer.create(<SearchBar></SearchBar>).toJSON();
        expect(tree).toMatchSnapshot();
    });
});

