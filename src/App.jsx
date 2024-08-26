import "./App.css";
import Navbar from "./components/Navbar";
import Counter from "./components/Counter";

const App = () => {

  return (
    <div className="flex flex-col justify-start m-auto w-full h-screen bg-backgroundSM xl:bg-backgroundLG bg-cover bg-no-repeat bg-center">
      <Navbar />
      <Counter />
    </div>
  );
};

export default App;
