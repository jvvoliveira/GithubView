import React from "react";
import nock from "nock";
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

afterEach(function() {
  nock.cleanAll();
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
  nock("https://api.github.com")
    .get("/users/jvvoliveira")
    .reply(404, {
      response: {
        message: "user not found",
        status: 404
      }
    })
    .get("/users/jvvoliveira/repos?per_page=8&page=1")
    .reply(404, {
      message: "user not found",
      status: 404
    });

  const container = render(<App />);

  const msgInitial = container.getByText("Pesquise por algum usuário GitHub");

  const [inputNomeUsuario, searchButton] = await waitForElement(() => [
    container.getByPlaceholderText("nome do usuário no github"),
    container.getByTestId("searchButton")
  ]);

  act(() => {
    fireEvent.input(inputNomeUsuario, {
      target: { value: "jvvoliveira" }
    });

    fireEvent.click(searchButton);
  });

  const msgNotFound = await waitForElement(() =>
    container.getByText("Usuário não encontrado")
  );

  expect(msgInitial).not.toBeInTheDocument();
});

test("Renderizar perfil com erro", async () => {
  nock("https://api.github.com")
    .get("/users/jvvoliveira")
    .delay(2000)
    .reply(500, {
      response: {
        response: {
          message: "error",
          status: 500
        }
      }
    })
    .get("/users/jvvoliveira/repos?per_page=8&page=1")
    .delay(2000)
    .reply(500, {
      message: "error",
      status: 500
    });

  const container = render(<App />);

  const msgInitial = container.getByText("Pesquise por algum usuário GitHub");

  const [inputNomeUsuario, searchButton] = await waitForElement(() => [
    container.getByPlaceholderText("nome do usuário no github"),
    container.getByTestId("searchButton")
  ]);

  act(() => {
    fireEvent.input(inputNomeUsuario, {
      target: { value: "jvvoliveira" }
    });

    fireEvent.click(searchButton);
  });

  const loading = await waitForElement(() => container.getByTestId("loading"));
  waitForElementToBeRemoved(() => loading);

  await waitForDomChange();
});

test("Renderizar perfil com usuário correto", async () => {
  nock("https://api.github.com")
    .get("/users/jvvoliveira")
    .reply(200, {
      login: "jvvoliveira",
      name: "joãoVictor",
      avatar_url: "https://avatars3.githubusercontent.com/u/48499490?v=4",
      location: "Recife, PE",
      bio: "Fazendo teste com React Testing library",
      public_repos: 4,
      followers: 100,
      created_at: "2000-06-28T00:34:36Z"
    })
    .get("/users/jvvoliveira/repos?per_page=8&page=1")
    .reply(200, []);
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

  expect(nome.innerHTML).toEqual("joãoVictor");
  expect(foto).toHaveAttribute(
    "src",
    "https://avatars3.githubusercontent.com/u/48499490?v=4"
  );
  expect(bio).toHaveTextContent("Fazendo teste com React Testing library");
  expect(local).toHaveTextContent("Recife, PE");
  expect(seguidores.innerHTML).toEqual("Seguidores: 100");
  expect(reposPublicos).toHaveTextContent("Repositórios públicos: 4");
  expect(dataCriacao).toHaveTextContent("Criado em: 2000-06-28T00:34:36Z");
});

test("Renderizar perfil com usuário sem atributo name", async () => {
  nock("https://api.github.com")
    .get("/users/jvvoliveira")
    .reply(200, {
      login: "jvvoliveira",
      //name
      avatar_url: "https://avatars3.githubusercontent.com/u/48499490?v=4",
      location: "Recife, PE",
      bio: "Fazendo teste com React Testing library",
      public_repos: 4,
      followers: 100,
      created_at: "2000-06-28T00:34:36Z"
    })
    .get("/users/jvvoliveira/repos?per_page=8&page=1")
    .reply(200, []);
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
  const nome = await waitForElement(() => container.getByTestId("nome"));

  expect(nome.innerHTML).toEqual("jvvoliveira");
});
