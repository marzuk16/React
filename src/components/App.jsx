import './App.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from './layout/Navbar';

import Home from './pages/Home';
import Contact from './pages/Contact';
import About from './pages/About';
import NotFound from './pages/NotFound';
import AddUser from './user/AddUser';
import EditUser from './user/EditUser';

function App() {
  return (
    <>
    <ToastContainer />
    <Router>
      <div className="App">

        <Navbar />
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/users/add" component={AddUser}/>
          <Route exact path="/users/edit/:id" component={EditUser}/>
          <Route exact path="/about" component={About}/>
          <Route exact path="/contact" component={Contact}/>
          <Route component={NotFound}/>
        </Switch>
      </div>
    </Router>
    </>
  );
}

export default App;