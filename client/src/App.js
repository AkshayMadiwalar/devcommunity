import './App.css';
import { useEffect } from 'react';
import Navbar from './components/layouts/Navbar';
import Landing from './components/layouts/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import { Routes, Route } from 'react-router-dom';
import { loadUser} from './actions/auth'
import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/profile-form/CreateProfile';
import PrivateRoute from './components/dashboard/routing/PrivateRoute';
//Redux
import { Provider } from 'react-redux'
import store from './store'
import Alert from './components/layouts/Alert';
import setAuthToken from './utils/setAuthToken';
import EditProfile from './components/profile-form/EditProfile';
import AddExperience from './components/profile-form/AddExperience';
import AddEducation from './components/profile-form/AddEducation';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
import Posts from './components/post/Posts';
import Post from './components/post/Post';

if(localStorage.token){
  setAuthToken(localStorage.token)
}
function App() {
  useEffect(() => {
    store.dispatch(loadUser())
  },[])
  return (
    <Provider store={store}>
      <div>
        <Navbar />
        <section className="container">
          <Alert />
          <Routes>
            <Route path="/" element={<Landing/>}/>
            <Route path="/dashboard" element={<PrivateRoute/>}> 
              <Route path="/dashboard" element={<Dashboard/>}/>
            </Route>
            <Route path="/create-profile" element={<PrivateRoute/>}>
                <Route path="/create-profile" element={<CreateProfile/>}/>
              </Route>
            <Route path="/edit-profile" element={<PrivateRoute/>}>
                <Route path="/edit-profile" element={<EditProfile/>}/>
              </Route>
              <Route path="/add-experience" element={<PrivateRoute/>}>
                <Route path="/add-experience" element={<AddExperience/>}/>
              </Route>
              <Route path="/add-education" element={<PrivateRoute/>}>
                <Route path="/add-education" element={<AddEducation/>}/>
              </Route>
              <Route path="/posts" element={<PrivateRoute/>}>
                <Route path="/posts" element={<Posts/>}/>
              </Route>
              <Route path="/posts/:id" element={<PrivateRoute/>}>
                <Route path="/posts/:id" element={<Post/>}/>
              </Route>
             <Route path="/profile/:id" element={<Profile/>}/>
            <Route path="/profiles" element={<Profiles/>}/>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </section>
      </div>
    </Provider>
  );
}

export default App;
