import './App.css';
import Menu from './Components/Menu';
import Task from './Components/Task';


function App() {
  return (
    <div className="App">
      <div className='layer'>
       <Menu/>
        <Task/>
      </div>
    </div>
  );
}

export default App;
