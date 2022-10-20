import logo from './logo.svg';
// import './App.css';
import './styles.css'

function App() {
  return (
    <div className="App">
      <header className="App-header ">
      <div className='bg-blue-500 md:bg-red-500'>hi</div>
       {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <p className="text-red-600">
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
