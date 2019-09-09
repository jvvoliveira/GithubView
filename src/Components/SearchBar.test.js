// import React from 'react';
// import ReactDOM from 'react-dom';
// import SearchBar, { _pesquisar } from './SearchBar';
// import {
//     render,
//     fireEvent,
//     cleanup,
//     waitForElement,
//     createEvent
// } from '@testing-library/react';


// describe("initial test SearchBar", () => {
//     it('should renders without crashing', () => {
//         const div = document.createElement('div');
//         ReactDOM.render(<SearchBar />, div);
//         ReactDOM.unmountComponentAtNode(div);
//     });
//     it('should write and make search', () => {
//         const constPesquisa = jest.fn();

//         const { getByTestId } = render(
//             <SearchBar />
//         )

//         const input = getByTestId('input')
//         const button = getByTestId('searchButton')
//         button.onclick = constPesquisa;

//         fireEvent.change(input, { target: { value: 'jvvoliveira' } })

//         waitForElement(() => fireEvent.click(button))

//         expect(input.value).toBe('jvvoliveira')
//         expect(constPesquisa).toBeCalledTimes(1)
//     });
//     it('should search user and repos in the API', async () => {
//         const event = { preventDefault: jest.fn() }
//         const showLoading = jest.fn()
//         const hideLoading = jest.fn()
//         const setUsuario = jest.fn()
//         const setRepos = jest.fn()
//         const json = () => {
//             return new Promise((resolve) => {
//                 resolve({});
//             })
//         }
//         const request = () => {
//             return new Promise((resolve) => {
//                 resolve({ json });
//             })
//         }

//         await _pesquisar(event, showLoading, hideLoading, 
//             'nomeUsuario', setUsuario, setRepos, request)

//         expect(event.preventDefault).toBeCalled()
//         expect(showLoading).toBeCalled()
//         expect(hideLoading).toBeCalled()
//         expect(setUsuario).toBeCalledWith({}, 'OK')
//         expect(setRepos).toBeCalledWith({}, 'OK')
//     });
//     it('should search user and repos in the API but not found', async () => {
//         const event = { preventDefault: jest.fn() }
//         const showLoading = jest.fn()
//         const hideLoading = jest.fn()
//         const setUsuario = jest.fn()
//         const setRepos = jest.fn()
//         const json = () => {
//             return new Promise((resolve) => {
//                 resolve({message: 'Not Found'});
//             })
//         }
//         const request = () => {
//             return new Promise((resolve) => {
//                 resolve({ json });
//             })
//         }

//         await _pesquisar(event, showLoading, hideLoading, 
//             'nomeUsuario', setUsuario, setRepos, request)

//         expect(event.preventDefault).toBeCalled()
//         expect(showLoading).toBeCalled()
//         expect(hideLoading).toBeCalled()
//         expect(setUsuario).toBeCalledWith(null, 'Not Found')
//         expect(setRepos).toBeCalledWith([], 'Not Found')
//     });
// });

