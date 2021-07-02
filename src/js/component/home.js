import React, { useState, useEffect } from "react";
export function Home() {
	//01 - Crear un array
	const [todos, setTodos] = useState([]);
	//02 - Guardar texto que digita el usuario
	const [task, setTask] = useState("");
	//03 - Crear funcion que llamara al api
	const todoReq = () => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/legg2710", {
			method: "GET",
			// body: JSON.stringify(todos),  //El body se usa cuando creamos o modificamos algo.
			//Los headers establecen el lenguaje de la comunicacion entre el front y la api.
			headers: {
				"Content-Type": "application/json"
			}
		})
			//Cuando la api conteste el llamado entra el metodo .then() que retorna una promesa.
			//En este caso pedimos el parametro resp.
			.then(resp => {
				console.log(resp.ok); // si el llamado es exitoso el response retornara true.
				console.log(resp.status); // retornara el estado del code = 200 or code = 400 etc.
				console.log(resp.text()); // retornara el response exacto como string.
				return resp.json(); // retorna la promesa del api y la convierte a json (este es un proceso asincrono)
			})
			//El parametro data retorna la info de la api
			.then(data => {
				//here is were your code should start after the fetch finishes
				console.log(data); //aqui imprime el objeto llamado del servidor (api)
				//04. modificamos la variable de estado
				setTodos();
				//se ha guardado la data en el useState
			})
			.catch(error => {
				//error handling
				console.log(error);
			});
	};

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
