import { useState } from "react";

function Home() {
  const [counter, setCounter] = useState(0);

  function handleClick() {
    setCounter(counter + 1);
  }

  return (
    <div>
      <div>{counter}</div>
      <button onClick={handleClick}>increment</button>
    </div>
  );
}

export default Home;
