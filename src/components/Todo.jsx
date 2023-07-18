const Todo = ({ todo, removeTodo, completeTodo }) => {
  return (
    <div
      className="todo"
      style={{ textDecoration: todo.isCompleted ? "line-through" : "" }}//quando to-do tem 'isCompleted', text-decoration é line-through
    >
      <div className="content">
        <p>{todo.text}</p>
        <p className="category">{todo.category}</p>
      </div>
      <div>
        <button className="complete" onClick={() => completeTodo(todo.id)}>
          Completar
        </button>
        <button className="remove" onClick={() => removeTodo(todo.id)}>
          {/*todo id precisou ser passado como argumento*/}x
        </button>
      </div>
    </div>
  );
};

export default Todo;
