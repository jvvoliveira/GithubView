// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './App';
// import TestRenderer from 'react-test-renderer';
// import renderer from 'react-test-renderer';

// describe("initial test App", () => {
//   it('should renders without crashing', () => {
//     const div = document.createElement('div');
//     ReactDOM.render(<App />, div);
//     ReactDOM.unmountComponentAtNode(div);
//   });
//   it('should set state repos value', () => {

//     const data = [{
//       name: "repo1",
//       description: "primeiro repositório de teste",
//       link: "www.google.com",
//       language: "java"
//     }]
//     const status = 'OK'

//     const testRenderer = TestRenderer.create(
//       <App></App>
//     );

//     let app = testRenderer.getInstance();
//     app.setRepos(data, status);

//     expect(app.state.repos.status).toEqual("OK");
//     expect(app.state.repos.data[0].name).toEqual("repo1");
//     expect(app.state.repos.data[0].description).toEqual("primeiro repositório de teste");
//     expect(app.state.repos.data[0].link).toEqual("www.google.com");
//     expect(app.state.repos.data[0].language).toEqual("java");
//   });
//   it('should set state usuario value', () => {
//     const data =
//     {
//       name: 'teste',
//       login: 'login123',
//       location: 'Recife, PE',
//       bio: 'Um exemplo de bio',
//       followers: 5
//     }
//     const status = 'OK'

//     const testRenderer = TestRenderer.create(
//       <App></App>
//     );

//     let app = testRenderer.getInstance();
//     app.setUsuario(data, status);

//     expect(app.state.usuario.data.name).toEqual('teste');
//     expect(app.state.usuario.data.login).toEqual('login123');
//     expect(app.state.usuario.data.location).toEqual('Recife, PE');
//     expect(app.state.usuario.data.bio).toEqual('Um exemplo de bio');
//     expect(app.state.usuario.data.followers).toEqual(5);
//     expect(app.state.usuario.status).toEqual("OK");
//   });
//   it('should show and hide loading screen', () => {
//     const testRenderer = TestRenderer.create(
//       <App></App>
//     );
//     let app = testRenderer.getInstance();
//     app.showLoading('Carregando');
//     expect(app.state.loading).toEqual(true)
//     expect(app.state.message).toEqual('Carregando')
//     app.hideLoading();
//     expect(app.state.loading).toEqual(false)
//   });
//   it("snapshot", () => {
//     const tree = renderer.create(<App></App>).toJSON();
//     expect(tree).toMatchSnapshot();
//   });
// });

