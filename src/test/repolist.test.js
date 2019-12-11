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

test("Renderizar tela de repositórios sem nenhum conteúdo", async () => {
  const container = render(<App />);

  const linkRepositorios = await waitForElement(() =>
    container.getByText("Repositórios")
  );

  act(() => {
    fireEvent.click(linkRepositorios);
  });

  const repositorios = await waitForElement(() =>
    container.getByText("Repositórios não encontrados")
  );
});
test("Renderizar tela de repositórios com usuário não encontrado", async () => {
  nock("https://api.github.com")
    .get("/users/jvvoliveira")
    .reply(404, {
      message: "user not found",
      status: 404
    })
    .get("/users/jvvoliveira/repos?per_page=8&page=1")
    .reply(404, {
      message: "user not found",
      status: 404
    });

  const container = render(<App />);

  const linkRepositorios = await waitForElement(() =>
    container.getByText("Repositórios")
  );

  act(() => {
    fireEvent.click(linkRepositorios);
  });

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

  const repositorios = await waitForElement(() =>
    container.getByTestId("semRepositorio")
  );
});

test("Renderizar tela de repositórios com usuário sem repositório", async () => {
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

  const linkRepositorios = await waitForElement(() =>
    container.getByText("Repositórios")
  );

  act(() => {
    fireEvent.click(linkRepositorios);
  });

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

  const repositorios = await waitForElement(() =>
    container.getByText("Usuário sem repositórios públicos")
  );
});

test("Renderizar tela de repositórios com usuário com mais de 8 repositórios", async () => {
  nock("https://api.github.com")
    .get("/users/jvvoliveira")
    .reply(200, {
      login: "jvvoliveira",
      name: "joãoVictor",
      avatar_url: "https://avatars3.githubusercontent.com/u/48499490?v=4",
      location: "Recife, PE",
      bio: "Fazendo teste com React Testing library",
      public_repos: 10,
      followers: 100,
      created_at: "2000-06-28T00:34:36Z"
    })
    .get("/users/jvvoliveira/repos?per_page=8&page=1")
    .delay(2000)
    .reply(200, [
      {
        name: "repo1",
        link: "github.com",
        language: "javascript",
        description: "primeiro repositório"
      },
      {
        name: "repo2",
        link: "github.com",
        language: "javascript",
        description: "segundo repositório"
      },
      {
        name: "repo3",
        link: "github.com",
        language: "javascript",
        description: "terceiro repositório"
      },
      {
        name: "repo4",
        link: "github.com",
        language: "javascript",
        description: "quarto repositório"
      },
      {
        name: "repo5",
        link: "github.com",
        language: "javascript",
        description: "quinto repositório"
      },
      {
        name: "repo6",
        link: "github.com",
        language: "javascript",
        description: "sexto repositório"
      },
      {
        name: "repo7",
        link: "github.com",
        language: "javascript",
        description: "sétimo repositório"
      },
      {
        name: "repo8",
        link: "github.com",
        language: "javascript",
        description: "oitavo repositório"
      }
    ])
    .get("/users/jvvoliveira/repos?per_page=8&page=2")
    .delay(2000)
    .reply(200, [
      {
        name: "repo9",
        link: "github.com",
        language: "javascript",
        description: "nono repositório"
      },
      {
        name: "repo10",
        link: "github.com",
        language: "javascript",
        description: "décimo repositório"
      }
    ]);

  const container = render(<App />);

  const linkRepositorios = await waitForElement(() =>
    container.getByText("Repositórios")
  );

  act(() => {
    fireEvent.click(linkRepositorios);
  });

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
    repo0,
    repo1,
    repo2,
    repo3,
    repo4,
    repo5,
    repo6,
    repo7,
    viewMore
  ] = await waitForElement(() => [
    container.getByTestId("repo-0"),
    container.getByTestId("repo-1"),
    container.getByTestId("repo-2"),
    container.getByTestId("repo-3"),
    container.getByTestId("repo-4"),
    container.getByTestId("repo-5"),
    container.getByTestId("repo-6"),
    container.getByTestId("repo-7"),
    container.getByTestId("viewMore")
  ]);

  act(() => {
    fireEvent.click(viewMore);
  });

  const [repo8, repo9] = await waitForElement(() => [
    container.getByTestId("repo-8"),
    container.getByTestId("repo-9")
  ]);

  expect(viewMore).not.toBeInTheDocument();
});
