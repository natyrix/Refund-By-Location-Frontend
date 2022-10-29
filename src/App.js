import logo from './logo.svg';
import { EthProvider } from "./contexts/EthContext";
import './App.css';
import Page from './components/Page';

function App() {
  return (
    <EthProvider>
      <div className="App">
        <div className="main"> 
          <Page/>
        </div>
      </div>
    </EthProvider>
  );
}

export default App;
