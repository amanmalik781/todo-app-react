import { Avatar, Button, Divider, IconButton, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText } from '@material-ui/core';
import React from 'react';
import db from './firebase';
import { makeStyles } from '@material-ui/core/styles';
import { green, pink } from '@material-ui/core/colors';
import AssignmentIcon from '@material-ui/icons/Assignment';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  pink: {
    color: theme.palette.getContrastText(pink[500]),
    backgroundColor: pink[500],
  },
  green: {
    color: '#fff',
    backgroundColor: green[500],
  },
}));

function Todo(props) {
  return (

    <List>
      <ListItem >
        <ListItemAvatar>

          <AssignmentIcon style={{ color: green[500] }} />

        </ListItemAvatar>

        <ListItemText primary={props.todo.task} />
        <ListItemSecondaryAction>
          <IconButton edge="end" aria-label="delete" onClick={event => { db.collection('todos').doc(props.todo.id).delete() }}>
            <DeleteForeverIcon color="secondary" />
          </IconButton>
        </ListItemSecondaryAction>

      </ListItem>
      <Divider />
    </List>



  )
}

export default Todo;
