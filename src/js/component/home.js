import React, { useState } from "react";
export function Home() {
	const [todos, setTodos] = useState([]);
	const [task, setTask] = useState("");
	function todosEliminar(index) {
		if (index > -1) {
			console.log("eliminar");
			const filterList = todos.filter(item => item !== todos[index]);
			setTodos(filterList);
		}
	}
	return (
		<div className="text-center mt-5 container">
			<h1 className="display-4">To Do List</h1>

			<form
				onSubmit={evento => {
					evento.preventDefault();
					//para setear el enter solo cuando exista texto en el input
					if (task.length > 0) setTodos([...todos, task]);
					setTask("");
				}}>
				<div className="form-group">
					<input
						type="text"
						className="form-control"
						placeholder="What needs to be done?"
						onChange={evento => setTask(evento.target.value)}
						value={task}></input>
					<div className="form-group-append"></div>
				</div>
			</form>
			{/* 04 mostrar el contenido del arreglo */}
			<ul className="list-group list-group-flush">
				{todos.map((item, index) => {
					return (
						<li className="list-group-item" key={index}>
							<span>{item}</span>
							<button
								className="btn btn-light float-right"
								onClick={
									() => todosEliminar(index)
									// index,
									// "contenido:",
									// todos[index]
								}>
								<i
									className="fa fa-trash"
									aria-hidden="true"></i>
							</button>
						</li>
					);
				})}
			</ul>
			<div>
				<p className="text-muted float-left">
					{todos.length}
					{""} item left
				</p>
			</div>
		</div>
	);
}
