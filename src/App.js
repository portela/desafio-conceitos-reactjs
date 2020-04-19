import React, { useEffect, useState } from "react";

import "./styles.css";

import Api from "./services/api";

function App() {
  const [repositories, setRepositories] = useState([]);

  async function loadRepositories() {
    const response = await Api.get(`/repositories`);
    setRepositories(response.data);
  }

  useEffect(() => {
    loadRepositories();
  }, []);

  async function handleAddRepository() {
    const data = {
      url: "https://github.com/josepholiveira",
      title: "Desafio ReactJS",
      techs: ["React", "Node.js"],
    };
    try {
      await Api.post(`/repositories`, data);
      loadRepositories();
    } catch (e) {
      console.log("Unable to add repository");
      console.error(e);
    }
  }

  async function handleRemoveRepository(id) {
    try {
      await Api.delete(`/repositories/${id}`);
      loadRepositories();
    } catch (e) {
      console.log("Unable to remove repository!");
      console.error(e);
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repo) => (
          <li key={repo.id}>
            {repo.title}
            <button onClick={() => handleRemoveRepository(repo.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
