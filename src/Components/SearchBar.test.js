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
    // it('should take public repos by a github user', (done) => {
    //     const setRepos = jest.fn(); //mock de função
    //     const { getByText, getByTestId, asFragment, container} = render(
    //         <SearchBar setRepos={setRepos}/>
    //     )

    //     const input = getByTestId('input')
    //     fireEvent.change(input, {target:{value: 'jvvoliveira'}})
    //     expect(input.value).toBe("jvvoliveira");

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
    //             await searchBar.pesquisar(event, setRepos, usuario.value, request);
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
    // it('should returned repos', () =>{
    //     const{getByTestId} = render( <SearchBar /> )

    //     const input = getByTestId('input')
    //     button.onclick = constPesquisa;

    //     fireEvent.change(input, { target: { value: 'jvvoliveira' } })
    //     fireEvent.keyPress(input, {key:13});



    // });
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

