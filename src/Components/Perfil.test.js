import React from 'react'
import ReactDOM from 'react-dom';
import Perfil, { pesquisar } from './Perfil'
import renderer from 'react-test-renderer';
import { loadingContext } from '../App';
import {
    render,
    fireEvent,
    cleanup,
    waitForElement,
    createEvent
} from '@testing-library/react';

const PerfilWithContextWithoutUser = () => {
    const usuario = {
        data: undefined,
        status: null
    };
    return (
        <loadingContext.Provider value={{usuario}}>
            <Perfil/>
        </loadingContext.Provider>
    );
};

const PerfilWithContextWithUserNotFound = () => {
    const usuario = {
        data: {},
        status: 'Not Found'
    };
    return (
        <loadingContext.Provider value={{usuario}}>
            <Perfil/>
        </loadingContext.Provider>
    );
};

const PerfilWithContextWithUser = () => {
    const usuario = {
        data: {
            name: 'teste',
            login: 'teste',
            bio: 'Um teste',
            followers: 5
        },
        status: 'OK'
    };
    return (
        <loadingContext.Provider value={{usuario}}>
            <Perfil/>
        </loadingContext.Provider>
    );
};


describe('initial test Perfil', () => {
    it('should renders without crashing without user', () => {
        const div = document.createElement('div')
        ReactDOM.render(<PerfilWithContextWithoutUser />, div)
        ReactDOM.unmountComponentAtNode(div)
    });
    it('should renders with user not found', () => {
        const div = document.createElement('div')
        ReactDOM.render(<PerfilWithContextWithUserNotFound />, div)
        ReactDOM.unmountComponentAtNode(div)
    });
    it('should renders with user not found', () => {
        const div = document.createElement('div')
        ReactDOM.render(<PerfilWithContextWithUser />, div)
        ReactDOM.unmountComponentAtNode(div)
    });
})