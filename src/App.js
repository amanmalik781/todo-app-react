import { AppBar, Button, FormControl, IconButton, Input, InputLabel, List, Toolbar, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { useState, useEffect } from 'react';
import './App.css';
import Todo from './Todo';
import db from './firebase';
import firebase from 'firebase';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import Brightness4Icon from '@material-ui/icons/Brightness4';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));
function App() {
  const [darkmode, setDarkmode] = useState(getInitialMode());
  const [todos, setTodos] = useState([]);//todos is an array of objects
  const [input, setInput] = useState('');
  const classes = useStyles();
  useEffect(() => {
    localStorage.setItem("dark", JSON.stringify(darkmode));
  }, [darkmode])

  function getInitialMode() {
    const savedMode = JSON.parse(localStorage.getItem("dark"));
    return savedMode || false;

  }
  useEffect(() => {
    //this runs when App.js loads and when the dependencies change
    //collection name in firestore is 'todos'
    //'todos' have several docs, map function is to loop through them
    //if orderby is not used then it is by default sorted by the auto generated doc id
    db.collection('todos').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      setTodos(snapshot.docs.map(doc => ({
        id: doc.id,
        task: doc.data().text,
        time: doc.data().timestamp
      })))
    })

  }
    , []);

  const addTodo = (event) => {
    event.preventDefault();//so that the page do not refresh after submit
    db.collection('todos').add({
      text: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()

    })
    setInput('');//to clear the field after add button is clicked 
  }
  return (
    <div className={darkmode ? "App-dark-mode" : "App-light-mode"}>
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <AssignmentTurnedInIcon />
            <Typography variant="h6" className={classes.title}>
              TO-DO APP
            </Typography>
            <IconButton edge="end" aria-label="DARK MODE" onClick={event => { setDarkmode(prevMode => !prevMode) }}>
              <Brightness4Icon style={{ color: 'white' }} />
            </IconButton>
          </Toolbar>
        </AppBar>
      </div>
      <div className='todo-input-container'>
        <FormControl>
          <InputLabel>ADD YOUR TO-DO</InputLabel>
          <Input value={input} onChange={event => setInput(event.target.value)} />
          <Button type="submit" onClick={addTodo} variant="contained" color="primary">ADD</Button>
        </FormControl>
      </div>







      <div className='todo-list-container'>
        {todos.map(todo => (
          <Todo todo={todo}></Todo>
        ))}

      </div>
    </div>
  );
}

export default App;
