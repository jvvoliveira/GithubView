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
import '@testing-library/jest-dom/extend-expect';
import App from "../App";

test("Renderizar home sem conteúdo", async () => {
  const container = render(<App />);

  const [linkPerfil, linkRepositorios] = await waitForElement(() => [
    container.getByText("Perfil"),
    container.getByText("Repositórios")
  ]);

  const msgInitial = container.getByTestId("messageInitial");
  expect(msgInitial).toHaveTextContent("Pesquise por algum usuário GitHub");
});
