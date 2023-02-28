import './App.css';
import React from "react";

function App() {
  // const [data, setData] = React.useState(null);

  // React.useEffect(() => {
  //   fetch("/api")
  //     .then((res) => res.json())
  //     .then((data) => setData(data.toString));
  // }, []);


  return (
    // <div className="App">
    //   <header className="App-header">
    //     {/* <p>
    //       {!data ? "Loading..." : data}
    //     </p> */}

        

        
    //   </header>
    // </div>
  <form>
    <label>
      Article name:
      <input type="text" name="name" />
    </label>
    <input type="submit" value="Submit">Enter article</input>
  </form>
  );
}

export default App;
