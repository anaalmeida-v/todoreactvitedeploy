import { useState } from "react";
import Todo from "./components/Todo";
import TodoForm from "./components/TodoForm";
import Search from "./components/Search";
import Filter from "./components/Filter";

import "./App.css";
function App() {
  const [todos, setTodos] = useState([
    //não estão sendo usadas variáveis pois elas não re-renderizam componentes quando são atualizadas(gera problema de atualização na vizualização do proj)/o use state faz isso
    {
      id: 1,
      text: "Criar funcionalidade X no sistema",
      category: "Trabalho",
      isCompleted: false,
    },
    {
      id: 2,
      text: "Ir para a academia",
      category: "Pessoal",
      isCompleted: false,
    },
    {
      id: 3,
      text: "Estudar React",
      category: "Estudos",
      isCompleted: false,
    },
  ]);

  const [search, setSearch] = useState("");

  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState("Asc");

  const addTodo = (text, category) => {
    //adicionando tarefas novas a lista
    const newTodos = [
      ...todos, //recebe todos atuais e um novo todo
      {
        id: Math.floor(Math.random() * 1000), //id aleatório
        text,
        category,
        isCompleted: false,
      },
    ];
    setTodos(newTodos); //atualizar todos anteriores e novos
  };

  const removeTodo = (id) => {
    //remoção será baseada no id, por ser um número de identificação única
    const newTodos = [...todos]; //todos os to-dos estão aqui
    const filteredTodos = newTodos.filter(
      (todo) => (todo.id !== id ? todo : null) //se id do todo tiver o id diferente doq o que foi informado, será retornado / se for igual será nulo(não existe mais)
    ); //itens com ids diferentes da lista permanecem e os que tem igual serão excluídos
    setTodos(filteredTodos); //atualizando state com to-dos filtrados
  };

  const completeTodo = (id) => {
    //contrário do remove
    const newTodos = [...todos];
    newTodos.map(
      (
        todo //map, diferentemente do filter, modifica array original
      ) => (todo.id === id ? (todo.isCompleted = !todo.isCompleted) : todo)
    ); //quando id do elemento for igual ao id do to-do, to-do completo muda, para o contrário disso. / se o id n for igual to-do é retornado completo
    setTodos(newTodos); //atualizanod lista
  };

  return (
    <div className="app">
      <h1>Lista de tarefas</h1>
      <Search search={search} setSearch={setSearch} />
      <Filter filter={filter} setFilter={setFilter} setSort={setSort} />
      <div className="todo-list">
        {todos
          .filter(
            (todo) =>
              filter === "All"
                ? true //se for true mostra todos
                : filter === "Completed" //encadeamento de check - se filter for "Completed"(tarefas completas)
                ? todo.isCompleted //retorna apenas as tarefas que tem o ".isCompleted"
                : !todo.isCompleted //caso o contrário, retorna o contrário disso(tarefas incompletas)
          )
          .filter(
            (
              todo //filter vai passar por todos os to-dos
            ) => todo.text.toLowerCase().includes(search.toLowerCase()) //ver se texto do to-do está incluso na pesquisa
          ) //se no state de busca tiver caracteres igual ao do título, será retornado
          .sort(
            (
              a,
              b //comparação entre dois elementos(a e b)
            ) =>
              sort === "Asc" //se o state de sort for asc, começa a comparação com primeiro item da lista(a)
                ? a.text.localeCompare(b.text) //se condição de a for maior que o texto do b, será ordenado de forma asc(ordem alfabética)
                : b.text.localeCompare(a.text) //se não, será ordenado de forma desc(ordem alfabética ao contrário)
          ) //algoritmo de comparação que funciona bem com textos - identifica pela letra, se texto X é menor que texto X
          .map((todo) => {
            return (
              <Todo
                key={todo.id}
                todo={todo}
                removeTodo={removeTodo}
                completeTodo={completeTodo}
              />
            );
          })}
      </div>
      <TodoForm addTodo={addTodo} />
    </div>
  );
}

export default App;
