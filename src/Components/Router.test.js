// import React from 'react';
// import ReactDOM from 'react-dom';
// import renderer from 'react-test-renderer';
// import { BrowserRouter } from 'react-router-dom'
// import Router from './Router';

// const RouterWithContext = () => {
//     const value = {
//         data: undefined,
//         status: 'Not Found'
//     } 
// }

// describe('test Router', () => {
//     it('should renders without crashing', () => {
//         const usuario = {
//             name: 'nome',
//             bio: 'bio',
//             location: 'location'
//         }
//         const repos = [
//             {
//                 name: 'name',
//                 language: 'language',
//                 description: 'description'
//             }
//         ]
//         const div = document.createElement('div')
//         ReactDOM.render(
//             <BrowserRouter>
//                 <Router usuario={usuario} repos={repos} />
//             </BrowserRouter>
//             , div)
//         ReactDOM.unmountComponentAtNode(div)
//     })
// })