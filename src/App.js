import './App.css';
import Menu from "./components/Menu";
import Router from "./components/Router";
import {useState} from "react";
import {Grid} from "@mui/material";
import useFiles from './hooks/useFiles'

function App() {
  const [page, setPage] = useState('home');
  const files = useFiles();
  return (
    <div className="App">
      <Grid container >
        <Grid item xs={3} md={2}>
          <Menu {...{page, setPage}}/>
        </Grid>
        <Grid item xs={9} md={10}>
          <Router {...{page, files}}/>
        </Grid>
      </Grid>


    </div>
  );
}

export default App;
