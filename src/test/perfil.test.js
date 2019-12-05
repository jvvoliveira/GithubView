import React from "react";
import {
  render,
  fireEvent,
  cleanup,
  waitForElement,
  act,
  waitForDomChange,
  waitForElementToBeRemoved
} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { mockAxios, restoreAxios } from "./mockAxios";
import App from "../App";

let axios = null;

beforeAll(() => {
  axios = mockAxios();
});

afterAll(() => {
  restoreAxios();
});

afterEach(function() {
  cleanup();
});

test("Renderizar perfil sem conteúdo", async () => {
  const container = render(<App />);

  const [linkPerfil, linkRepositorios] = await waitForElement(() => [
    container.getByText("Perfil"),
    container.getByText("Repositórios")
  ]);

  const msgInitial = container.getByTestId("messageInitial");
  expect(msgInitial).toHaveTextContent("Pesquise por algum usuário GitHub");
});

test("Renderizar perfil com usuário não encontrado", async () => {
  const container = render(<App />);

  const msgInitial = container.getByText("Pesquise por algum usuário GitHub");

  const [inputNomeUsuario, searchButton] = await waitForElement(() => [
    container.getByPlaceholderText("nome do usuário no github"),
    container.getByTestId("searchButton")
  ]);

  act(() => {
    fireEvent.input(inputNomeUsuario, {
      target: { value: "jjjjjjoooooooaaaaaooooo" }
    });

    fireEvent.click(searchButton);
  });

  const msgNotFound = await waitForElement(() =>
    container.getByText("Usuário não encontrado")
  );

  expect(msgInitial).not.toBeInTheDocument();
});

test("Renderizar perfil com usuário correto", async () => {
  axios.addMockResponse("https://api.github.com/users/jvvoliveira", {
    status: "OK",
    data: {
      login: "jvvoliveira",
      avatar_url: "https://avatars3.githubusercontent.com/u/48499490?v=4",
      name: "joãoVictor",
      location: "Recife, PE",
      bio: "Fazendo teste com React Testing library",
      public_repos: 50,
      followers: 100
    }
  });

  const container = render(<App />);

  const [inputNomeUsuario, searchButton] = await waitForElement(() => [
    container.getByPlaceholderText("nome do usuário no github"),
    container.getByTestId("searchButton")
  ]);

  act(() => {
    fireEvent.input(inputNomeUsuario, {
      target: { value: "jvvoliveira" }
    });
  });
  act(() => {
    fireEvent.click(searchButton);
  });
  const [imagemPerfil, informacoesPerfil] = await waitForElement(() => [
    container.getByTestId("imagemPerfil"),
    container.getByTestId("informacoesPerfil")
  ]);
  // expect(imagemPerfil).toBeInTheDocument();
  // expect(informacoesPerfil).toBeInTheDocument();

  const [
    nome,
    foto,
    bio,
    local,
    seguidores,
    reposPublicos,
    dataCriacao
  ] = await waitForElement(() => [
    container.getByTestId("nome"),
    container.getByTestId("foto"),
    container.getByTestId("bio"),
    container.getByTestId("local"),
    container.getByTestId("seguidores"),
    container.getByTestId("reposPublicos"),
    container.getByTestId("dataCriacao")
  ]);

  expect(nome).toEqual("joãoVictor");
  expect(foto).toHaveAttribute(
    "src",
    "https://avatars3.githubusercontent.com/u/48499490?v=4"
  );
  expect(bio).toEqual("Fazendo teste com React Testing library");
});
