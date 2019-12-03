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
import App from "../App";

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
