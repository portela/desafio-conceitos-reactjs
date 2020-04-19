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
    // TODO
  }

  async function handleRemoveRepository(id) {
    try {
      await Api.delete(`/repositories/${id}`);
      loadRepositories();
    } catch (e) {
      console.error(e);
      console.log("Unable to remove repository!");
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
