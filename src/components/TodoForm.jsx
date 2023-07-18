import { useState } from "react";

const TodoForm = ({ addTodo }) => {
  const [value, setValue] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = (e) => {
    //cuida do submit(enviar) do form
    e.preventDefault();
    if (!value || !category) return; //se valores não forem preenchidos, retorna(não segue a função)
    //se tiverem preenchidos:
    //adicionar todo
    addTodo(value, category); //dados da nova tarefa para ser possível a exibição

    //limpar os campos
    setValue("");
    setCategory("");
  };

  return (
    <div className="todo-form">
      <h2>Criar tarefa</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Digite o título"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        {/*ao mudar valor, será executada uma função que captura o evento e vai dizer que setValue(função que muda estado de value) vai ser igual a e(evento).target(input).value(valor do input)*/}
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Selecione uma categoria</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Pessoal">Pessoal</option>
          <option value="Estudos">Estudos</option>
        </select>
        <button type="submit">Criar tarefa</button>
      </form>
    </div>
  );
};

export default TodoForm;
