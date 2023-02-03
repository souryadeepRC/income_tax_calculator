
import './App.css';
import Income from './Income/Income';

function App() {

  return (
    <div className="App">
      <header>
        <p>Tax Calculator</p>
        <p>[Based on Latest Budget's modified Tax Slab]</p>
      </header>
      <Income />
      <footer>&copy;Developed by&nbsp;
        <a href="https://www.linkedin.com/in/souryadeep-roy-chowdhury/" target="_blank" rel="noreferrer" >
          Souryadeep Roy Chowdhury
        </a>
      </footer>
    </div>
  );
}

export default App;
