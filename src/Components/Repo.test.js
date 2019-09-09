import Repo from './Repo';
import React from 'react';
import {render} from '@testing-library/react'

describe("test initial Repo", ()=>{
    it("should renders without crashing", ()=>{
        const _name = 'testNome';
        const _description = 'testDescription'
        const { getByTestId } = render(<Repo name={_name} description={_description}/>)
        
        const nodeName = getByTestId('name');
        expect(nodeName.innerHTML).toEqual(_name);

        const nodeDescription = getByTestId('description');
        expect(nodeDescription.innerHTML).toEqual(_description);
    });
})