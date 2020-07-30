import React, { useState, useEffect } from "react";
export function Todolist() {
	const [newTask, setNewTask] = useState("");
	const [tasks, setTasks] = useState([]);
	function handleChange(event) {
		setNewTask(event.target.value);
	}
	async function handleEnter(event) {
		console.log("hello");
		if (event.key == "Enter") {
			var newTasks = [
				...tasks,
				{
					label: newTask,
					done: false
				}
			];
			//from this line all the way to line 38 will about the same to do for the delete button, to catch from API
			let response = await fetch(
				"https://assets.breatheco.de/apis/fake/todos/user/nvera",
				{
					method: "PUT",
					body: JSON.stringify(newTasks),
					headers: {
						"Content-Type": "application/json"
					}
				}
			);
			if (!response.ok) {
				throw Error(response.statusText);
			}
			response = await fetch(
				"https://assets.breatheco.de/apis/fake/todos/user/nvera"
			);
			if (!response.ok) {
				throw Error(response.statusText);
			}
			let todolist = await response.json();
			setTasks(todolist);
			setNewTask("");
		}
	}
	async function removeTask(index) {
		let filteredTasks = tasks.filter((task, i) => {
			return index != i;
		});
		console.log(filteredTasks);
		let response = await fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/nvera",
			{
				method: "PUT",
				body: JSON.stringify(filteredTasks),
				headers: {
					"Content-Type": "application/json"
				}
			}
		);
		if (!response.ok) {
			throw Error(response.statusText);
		}
		response = await fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/nvera"
		);
		if (!response.ok) {
			throw Error(response.statusText);
		}
		let todolist = await response.json();
		setTasks(todolist);
	}
	useEffect(() => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/nvera")
			.then(response => {
				if (!response.ok) {
					throw Error(response.statusText);
				}
				return response.json();
			})
			.then(todolist => setTasks(todolist))
			.catch(error => console.log(error));
	}, []);
	return (
		<div className="container w-75 mt-5">
			<h2 className="font-weight-light text-danger">{"todo's"}</h2>
			<div className="col-8 container">
				<input
					type="text"
					placeholder="Add a task here"
					className="form-control  mb-3 no-border"
					onChange={handleChange}
					value={newTask}
					onKeyPress={handleEnter}
				/>
				<ul className="pl-2 pr-2 text-muted">
					{tasks.map((task, index) => {
						return (
							<div
								key={index}
								className="d-flex justify-content-between">
								<li>{task.label}</li>
								<i
									className="fas fa-trash-alt"
									onClick={event => removeTask(index)}
								/>
							</div>
						);
					})}
					<div>
						<small>{tasks.length + " task(s) left"}</small>
					</div>
				</ul>
			</div>
		</div>
	);
}
