import React, {useState, useEffect} from "react";
import SearchBox from "../components/SearchBox";
import CardList from "../components/CardList";
import Scroll from "../components/Scroll";
import ErrorBoundary from "../components/ErrorBoundary";
import './App.css';

function App() {

  const [robots, setRobots] = useState([])
  const [searchfield, setSearchField] = useState('')
  const [count, setCount] = useState(0)

  useEffect(()=> {
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(response=> response.json())
    .then(users => setRobots(users))
  }, [])

  const onSearchChange = (event) => {
    setSearchField(event.target.value);
  };

  const filteredRobots = robots.filter(robot => {
    return robot.name.toLowerCase().includes(searchfield.toLowerCase());
  });
  return !robots.length? 
  <h1>Loading</h1> :
  (
    <div className="tc">
      <h1 className="f1">RoboFriends</h1>
      <button onClick={()=>setCount(count+1)}>Click Me!</button>
      <SearchBox searchChange={onSearchChange}/>
      <Scroll>
        <ErrorBoundary>
          <CardList robots={filteredRobots}/>
        </ErrorBoundary>
      </Scroll>
    </div>
  )
}

export default App;