import React from 'react';
import RepoList from './RepoList';
import {render} from '@testing-library/react';
import { loadingContext } from '../App';

const RepoListWithContextWithEmptyArray = () => {
    const repos = {
        data: [],
        status: 'OK'
    };
    return (
        <loadingContext.Provider value={{repos}}>
            <RepoList/>
        </loadingContext.Provider>
    );
}
const RepoListWithContextNotFound = () => {
    const repos = {
        data: [],
        status: 'Not Found'
    };
    return (
        <loadingContext.Provider value={{repos}}>
            <RepoList/>
        </loadingContext.Provider>
    );
}
const RepoListWithContextWithRepos = () => {
    const repos = {
        data: [
            {
                name: 'teste1',
                language: 'javascript',
                description: 'teste número 1',
                html_url: 'www.teste1'
            },
            {
                name: 'teste2',
                language: 'javascript',
                description: 'teste número 2',
                html_url: 'www.teste2'
            }
        ],
        status: 'OK'
    };
    return (
        <loadingContext.Provider value={{repos}}>
            <RepoList/>
        </loadingContext.Provider>
    );
}

describe("test initial Repolist", () => {
    it("should renders without crashing with empty array", () => {
        
    });
    it("should renders without crashing with repos not found", () => {
        
    });
    it("should renders without crashing with repos", () => {
        
    });
})