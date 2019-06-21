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

const PerfilWithContext = () => {
    const usuario = {
        data: undefined,
        status: null
    };
    return (
        <loadingContext.Provider value={usuario}>
            <Perfil/>
        </loadingContext.Provider>
    );
};


describe('initial test Perfil', () => {
    it('should renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<PerfilWithContext />, div);
        ReactDOM.unmountComponentAtNode(div);
    });
})