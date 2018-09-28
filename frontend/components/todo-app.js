import React from 'react';
import FetchApi from '../fetch-api';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

const ENTER_KEY_CODE = 13;

export default class TodoApp extends React.Component {
	state = { todos: [], newText: '' };

	constructor(props) {
		super(props);
		this.getTodos();
	}

	getTodos = () => {
		return FetchApi
			.get('/todo')
			.then(todos => this.setState({ todos }))
			.catch(() => alert('There was an error getting todos'));
	};

	createTodo = () => {
		FetchApi
			.post('/todo', { text: this.state.newText, completed: false })
			.then((newTodo) => {
				const newTodos = Array.from(this.state.todos);
				newTodos.push(newTodo);
				this.setState({ todos: newTodos, newText: '' });
			})
			.catch(() => alert('There was an error creating the todo'));
	};

	handleDeleteRequest = (id) => {
		FetchApi
			.delete(`/todo/${id}`)
			.then(() => {
				const newTodos = Array.from(this.state.todos);
				const todoIndex = newTodos.findIndex(todo => todo.id.toString() === id.toString());
				newTodos.splice(todoIndex, 1);
				this.setState({ todos: newTodos });
			})
			.catch(() => alert('Error removing todo'));
	};

	handleUpdateRequest = (id) => {
		FetchApi
			.put(`/todo/${id}`)
			.then(todos => {
				this.setState({ todos: todos });
			})
			.catch(() => alert('Error updating todo'));
	};
	handleChange = e => {
		this.setState({ newText: e.target.value });
	};

	handleKeyDown = e => {
		if (e.keyCode !== ENTER_KEY_CODE) return;
		this.createTodo();
	};

	getCompleted = () => {
		if (this.state.todos) {
			return this.state.todos.filter(t => t.completed === true).length;
		} else {
			return 0;
		}
	}

	getTodoStyle = (completed) => {
		if (completed) {
			return "line-through";
		} else {
			return "none";
		}
	}

	render() {
		return (
			<div>
				<AppBar position="static" color="primary">
					<Toolbar>
						<h1>Todos</h1>
					</Toolbar>
				</AppBar>
				<div className="container" style={{ paddingTop: "20px" }}>
					<div>
						<Input
							placeholder="What needs to be done?"
							style={{ fontSize: "1.8rem", marginLeft: "15px" }}
							inputProps={{
								'aria-label': 'Description',
							}}
							autoFocus
							onChange={this.handleChange}
							onKeyDown={this.handleKeyDown}
							value={this.state.newText}
						/>
					</div>
					<div className="col-lg-6">
						{this.state.todos.map(todo => (
							<div key={todo.id} className="row" style={{ paddingTop: "10px" }}>
								<div className="col-lg-2">
									<Checkbox
										checked={todo.completed}
										onChange={() => this.handleUpdateRequest(todo.id)}
										value={todo.text}
										color="primary"
									/>
								</div>
								<div className="col-lg-6" style={{ paddingTop: "15px" }}>
									<span
										style={{
											textDecoration: this.getTodoStyle(todo.completed),
											fontFamily: "sans-serif"
										}}>
										{todo.text}
									</span>
								</div>
								<div className="col-lg-2">
									<IconButton aria-label="Delete" onClick={() => this.handleDeleteRequest(todo.id)}>
										<DeleteIcon fontSize="small" />
									</IconButton>
								</div>
							</div>
						))}
					</div>
					<div className="col-lg-12" style={{ paddingTop: "10px" }}>
						<span>{this.getCompleted()} OF {this.state.todos.length} COMPLETED</span><br />
					</div>
				</div>
			</div>
		);
	}
}
