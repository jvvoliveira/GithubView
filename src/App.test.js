import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import TestRenderer from 'react-test-renderer';
import renderer from 'react-test-renderer';

describe("initial test App", () =>{
  it('should renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  it('should set state repos value', () => {
    const repos = [
      {
        name:"repo1",
        description:"primeiro repositório de teste",
        link:"www.google.com",
        language:"java"
      }
    ];
    const testRenderer = TestRenderer.create(
      <App></App>
    );

    let app = testRenderer.getInstance();
    app.setRepos(repos);

    expect(app.state.repos[0].name).toEqual("repo1");
    expect(app.state.repos[0].description).toEqual("primeiro repositório de teste");
    expect(app.state.repos[0].link).toEqual("www.google.com");
    expect(app.state.repos[0].language).toEqual("java");

  });
  it("snapshot",()=>{
    const tree = renderer.create(<App></App>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

