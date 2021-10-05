import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Subjects from './components/Subjects';
import AcRegistration from './components/AcRegistration';
import StaffRoom from './components/StaffRoom';
import Login from './components/Login';
import Register from './components/Register';
import {  useSelector } from "react-redux";
function App() {

    
  const userLogin = useSelector((state) => state.userLogin);
  const {userInfo } = userLogin;

  return (
    <Router>
      <Switch>

      <Route path="/staff">
          <Header/>
          <div className="App__main">
            <div className="App__content">
              <Sidebar/>
              <StaffRoom />
            </div>
          </div>
          <Footer/>
          
        </Route>

      <Route path="/subReg">
          <Header/>
          <div className="App__main">
            <div className="App__content">
              <Sidebar/>
              <AcRegistration />
            </div>
          </div>
          <Footer/>
          
        </Route>
        <Route path="/allSubject">
          <Header/>
              <div className="App__main">
            <div className="App__content">
                <Sidebar/>
                <Subjects />
              </div>
          </div>
          <Footer/>
          
        </Route>

         <Route path="/home">
          <Header/>
          <div className="App__main">
              <div className="App__content">
                <Sidebar/>
                <Home/>
              </div>
          <Footer/>
          </div>
          
        </Route>


        <Route path="/login" component={Login}  />
        <Route path="/register" component={Register} />
        

        {!userInfo ? (
        <Login />
      ) : (
          <>
          <Register/>
        </>
      )}
      </Switch>

     
    
    </Router>

  );
}

export default App;
