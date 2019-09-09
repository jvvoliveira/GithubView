import React from 'react'
import Perfil from './Perfil'
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
    it('should renders without user', () => {
        const { getByTestId } = render(<PerfilWithContextWithoutUser/>);
        const nodeMessage = getByTestId('messageInitial');
        expect(nodeMessage.innerHTML).toEqual('Pesquise por algum usuário GitHub');
        expect(nodeMessage).toBeDefined();
    });
    it('should renders with user not found', () => {
        const { getByTestId } = render(<PerfilWithContextWithUserNotFound/>);
        const nodeMessage = getByTestId('messageNotFound');
        expect(nodeMessage.innerHTML).toEqual('Usuário não encontrado');
        expect(nodeMessage).toBeDefined();
    });
    it('should renders with user', () => {
        const { getByTestId } = render(<PerfilWithContextWithUser/>);
        const nodeName = getByTestId('name');
        const nodeBio = getByTestId('bio');
        const nodeFollow = getByTestId('followers');

        expect(nodeName.innerHTML).toEqual('teste');
        expect(nodeBio.innerHTML).toEqual('Um teste');
        expect(nodeFollow.innerHTML).toEqual('Seguidores: 5');
    });
})