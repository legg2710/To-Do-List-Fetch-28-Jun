import React, { useState, useEffect } from "react";
export function Home(props) {
	const [arreglo, setArreglo] = useState([]);

	const llamaArreglo = () => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/legg2710", {
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(resp => resp.json())
			.then(data => {
				setArreglo(data);
			});
	};

	const updateArreglo = newData => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/legg2710", {
			method: "PUT",
			body: JSON.stringify(newData),
			headers: {
				"Content-Type": "application/json"
			}
		});
		// .then(resp => llamaArreglo());
	};

	const handleKeyPress = e => {
		if (e.key === "Enter" && e.target.value !== "") {
			let array = { label: e.target.value, done: false };

			setArreglo(
				arreglo.concat({ label: `${e.target.value}`, done: false }),
				updateArreglo([...arreglo, array])
			);
			e.target.value = "";
		}
	};

	const borrar = data => {
		let nuevoArreglo = arreglo.filter(item => item !== arreglo[data]);
		setArreglo(nuevoArreglo, updateArreglo(nuevoArreglo));
	};

	useEffect(() => {
		llamaArreglo();
	}, []);

	///5. Ejecutamos el useEffect al final, justo antes del return, llamando la funcion que contiene el GET

	return (
		<div>
			<h1 className="text-center">To-Do List React With Fetch</h1>
			<input
				className="form-control shadow"
				id="input-text"
				type="text"
				placeholder="What Needs To Be Done?"
				onKeyPress={handleKeyPress}
			/>
			<ul className="list-group shadow">
				{arreglo.map((item, index) => {
					return (
						<li
							key={index}
							className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
							{item.label}
							<span>
								<a href="#">
									<i
										id={index}
										onClick={e => borrar(e.target.id)}
										className="fa fa-trash"
										aria-hidden="true"></i>
								</a>
							</span>
						</li>
					);
				})}

				<li className="list-group-item counter" id="task-counter">
					{arreglo.length}{" "}
					{arreglo.length > 0
						? "items left"
						: arreglo.length === 1
						? "item left"
						: "items left."}
				</li>
			</ul>
		</div>
	);
}
