import React from "react";
import moxios from "moxios";
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
import App from "../App";

beforeEach(function() {
  // import and pass your custom axios instance to this method
  moxios.install();
});

afterEach(function() {
  // import and pass your custom axios instance to this method
  moxios.uninstall();
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
  moxios.stubRequest("https://api.github.com/users/jvvoliveira", {
    login: "jvvoliveira",
    avatar_url: "https://avatars3.githubusercontent.com/u/48499490?v=4",
    name: "joãoVictor",
    location: "Recife, PE",
    bio: "Fazendo teste com React Testing library",
    public_repos: 50,
    followers: 100
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

  expect(nome).toEqual("value", "joãoVictor");
  expect(foto).toHaveAttribute(
    "src",
    "https://avatars3.githubusercontent.com/u/48499490?v=4"
  );
  expect(bio).toEqual("Fazendo teste com React Testing library");
});
