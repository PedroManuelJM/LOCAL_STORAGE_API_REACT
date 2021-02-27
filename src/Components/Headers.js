import logo from '../assets/img/react.png';


function Headers() {
  return (
    <div className="App container-fluid">
      <header className="App-header text-center">
        <h5 className="text-white"> <img id="icono" src={logo} className="App-logo" alt="logo" />
        Local Storage - API </h5>
      </header>
    </div>
  );
}

export default Headers;
