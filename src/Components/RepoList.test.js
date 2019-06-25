import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import RepoList from './RepoList';
import { loadingContext } from '../App';
import Repo from './Repo';

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
        const div = document.createElement('div')
        ReactDOM.render(<RepoListWithContextWithEmptyArray />, div)
        ReactDOM.unmountComponentAtNode(div)
    });
    it("should renders without crashing with repos not found", () => {
        const div = document.createElement('div')
        ReactDOM.render(<RepoListWithContextNotFound />, div)
        ReactDOM.unmountComponentAtNode(div)
    });
    it("should renders without crashing with repos", () => {
        const div = document.createElement('div')
        ReactDOM.render(<RepoListWithContextWithRepos />, div)
        ReactDOM.unmountComponentAtNode(div)
    });
    // it("snapshot", () => {
    //     const repos = [
    //         {
    //             name: 'name',
    //             language: 'language',
    //             description: 'description',
    //             html_url: 'link'
    //         },
    //         {
    //             name: 'name2',
    //             language: 'language2',
    //             description: 'description2',
    //             html_url: 'link2'
    //         },
    //         {
    //             name: 'name3',
    //             language: 'language3',
    //             description: 'description3',
    //             html_url: 'link3'
    //         }
    //     ];
    //     const tree = renderer.create(<RepoList repos={repos}></RepoList>).toJSON();
    //     expect(tree).toMatchSnapshot();
    // });
})