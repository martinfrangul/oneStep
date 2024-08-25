import logo from "../assets/logoOneStep.png";

const Navbar = () => {

  return (
    <div className="p-4 border-b-2 border-solid border-gray-700 shadow-lg shadow-gray-500 w-full h-fit bg-black bg-opacity-20 flex flex-row justify-between">
      <img
        className="w-32 lg:w-44 rounded-xl shadow-md flex"
        src={logo}
        alt="Logo"
      />
    </div>
  );
};

export default Navbar;
