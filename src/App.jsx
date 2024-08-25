import "./App.css";
import Navbar from "./components/Navbar";

const App = () => {

  return (
    <div className="flex flex-col justify-start m-auto w-full h-screen bg-backgroundSM lg:bg-backgroundLG bg-cover bg-no-repeat bg-center">
      <Navbar />
    </div>
  );
};

export default App;
