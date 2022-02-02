import './App.css';

import instagram from './images/Instagram-Logo.png';
import avatar from './images/logo.jpeg';
import Posts from './components/Posts';

function App() {
  return (
    <div className="App">
      <header className="app__header" >
        <img className="app__headerImage" alt="logo" src={instagram} width="120px"></img>
        <img className="app__headerAvatar" alt="logo" src={avatar} width="100px"></img>
      </header>
      <Posts />
    </div>
  );
}

export default App;
