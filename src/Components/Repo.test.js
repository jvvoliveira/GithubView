import Repo from './Repo';
import React from 'react';
import ReactDOM from 'react-dom';
import TestRenderer from 'react-test-renderer';
import renderer from 'react-test-renderer';

describe("test initial Repo", ()=>{
    it("should renders without crashing", ()=>{
        const div = document.createElement('div');
        ReactDOM.render(<Repo />, div);
        ReactDOM.unmountComponentAtNode(div);
    });
    it("snapshot",()=>{
        const tree = renderer.create(<Repo></Repo>).toJSON();
        expect(tree).toMatchSnapshot();
        
    });
})