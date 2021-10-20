import React from "react"
import './App.scss';
import { useStore } from './store/Store';

import Container from 'react-bootstrap/Container';

import FiltersComponent from "./components/FiltersComponent"
import LineChart from './components/LineChart';

function App() {
  const [state, dispatch] = useStore();
  const dataPoints = state.datapoints;

  const groupedBy = state.groupedDate;
  return (
    <div className="App">
      <Container fluid="md">

        <FiltersComponent />
        {dataPoints.length > 0 &&
          <LineChart dataPoints={dataPoints} groupedBy={groupedBy} />
        }
      </Container>
    </div>
  );
}

export default App;
