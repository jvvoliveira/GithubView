import React from 'react'
import ReactDOM from 'react-dom';
import Perfil, { pesquisar } from './Perfil'
import renderer from 'react-test-renderer';
import {
    render,
    fireEvent,
    cleanup,
    waitForElement,
    createEvent
} from '@testing-library/react';

// describe('teste do perfil', () => {
//     it('should renderer perfil', () => {
//         const div = document.createElement('div');
//         ReactDOM.render(<Perfil usuario={ usuario = {url: 'url'} }/>, div);
//         ReactDOM.unmountComponentAtNode(div);
//     }),
//     it('snapshot view perfil', () => {
//         const tree = renderer.create(<Perfil/>).toJSON();
//         expect(tree).toMatchSnapshot();
//     }),
//     it('should ', async () => {
//         const setUsuario = jest.fn()
//         const json = () => {
//             return new Promise((resolve) => {
//                 resolve('mock perfil');
//             })
//         }
//         const request = () => {
//             return new Promise((resolve) => {
//                 resolve({ json, status: 200 });
//             })
//         }

//         await pesquisar('url', setUsuario, request)
//         expect(setUsuario).toBeCalledWith('mock perfil')
//     })
// })