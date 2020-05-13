import React, {memo} from 'react';
import Board from "./components/board/board";
import { useAlert } from 'react-alert'
import './App.css';

const App = memo(() => {
  const alert = useAlert()
 
  return (
    <Board alert={alert}/>
  )
})

export default App;
