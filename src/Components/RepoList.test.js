import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import RepoList from './RepoList';
import Repo from './Repo';

describe("test initial Repolist", () => {
    it("should renders without crashing", () => {
        const repos = [
            {
                name: 'name',
                language: 'language',
                description: 'description',
                html_url: 'link'
            }
        ]
        const div = document.createElement('div');
        ReactDOM.render(<RepoList repos={repos} />, div);
        ReactDOM.unmountComponentAtNode(div);
    });
    it("snapshot", () => {
        const repos = [
            {
                name: 'name',
                language: 'language',
                description: 'description',
                html_url: 'link'
            },
            {
                name: 'name2',
                language: 'language2',
                description: 'description2',
                html_url: 'link2'
            },
            {
                name: 'name3',
                language: 'language3',
                description: 'description3',
                html_url: 'link3'
            }
        ];
        const tree = renderer.create(<RepoList repos={repos}></RepoList>).toJSON();
        expect(tree).toMatchSnapshot();
    });
})