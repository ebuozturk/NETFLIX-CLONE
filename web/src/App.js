import React, { useEffect, useState } from "react"
import Navbar from './component/Navbar/Navbar';
import './App.css';
import { Switch, Route, Redirect } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import Dashboard from './component/root/DashBoard';
import MovieDetailPage from './component/Movie/MovieDetailPage';
import PersonDetailPage from "./component/Person/PersonDetailPage";
import FilteredMovies from "./component/tools/FilteredMovies";
import Logout from "./component/Logout/Logout";
import MovieWatchPage from "./component/Movie/MovieWatchPage";
import WelcomePage from "./component/root/WelcomePage"
import MovieAddPage from "./component/Movie/MovieAddPage";
import PrivateRoute from "./component/PrivateRoute";
import PersonAddPage from "./component/Person/PersonAddPage";
import UserProfile from "./component/User/UserProfile";
import GenreAddPage from "./component/Genre/GenreAddPage";
import PersonUpdatePage from "./component/Person/PersonUpdatePage"
import MovieUpdatePage from "./component/Movie/MovieUpdatePage";
import SuccessPage from "./component/SuccessPage";
import ErrorPage from "./component/ErrorPage";
import GenreUpdatePage from "./component/Genre/GenreUpdatePage";
import ChoosePlanPage from "./component/Signup/ChoosePlanPage";
import RegistrationPage from "./component/Signup/RegistrationPage";
import RegistrationForm from "./component/Signup/RegistrationForm";
import Planform from "./component/Signup/Planform";
import { useSelector, useDispatch } from "react-redux"
import setAutherizationToken from "./utils/setAuthorizationToken"
import { getUserByEmail, getUserByUsername } from "./redux/action/userActions"
import jwtDecode from 'jwt-decode';
import axios from "axios"
import LoadingPage from "./component/tools/LoadingPage";
import SendingPage from "./component/tools/SendingPage";
import Footer from "./component/Footer/Footer";
const App = () => {

  const [showHeader, setShowHeader] = useState(true);
  const user = useSelector(state => state.user);
  const [isLoading, setIsLoading] = useState(true)
  const dispatch = useDispatch()
  async function checkAuth() {

    if (localStorage.token) {
      const token = localStorage.token
      const username = jwtDecode(token).sub
      const result = await axios.post("/api/user/checkToken", {
        token,
        username
      }).catch(err => localStorage.removeItem('token'))
      if (result?.data.success) {
        setAutherizationToken(token)
        await getUserByEmail(username)(dispatch)
        setIsLoading(false)
      }
      else {
        localStorage.removeItem('token')
        setIsLoading(false)
      }

    }
    return setIsLoading(false)
  }


  useEffect(() => {
    checkAuth()
  }, [])
  return (
    <>
      <BrowserRouter>
        <Navbar showHeader={showHeader} />
        <Switch>

          {
            !isLoading ? (

              <>
                <Route exact path="/" component={Dashboard} />
                <Route exact path="/login" render={(props) => (
                  <WelcomePage loginPage={true} {...props} />
                )} />
                <Route exact path="/test" component={SendingPage} />
                <Route exact path="/signup" component={ChoosePlanPage} />
                <Route exact path="/signup/registration" component={RegistrationPage} />
                <Route exact path="/signup/regform" component={RegistrationForm} />
                <Route exact path="/signup/planform" component={Planform} />
                <PrivateRoute path="/logout" component={Logout} />
                <PrivateRoute path="/genre/:genreName/:genreId" component={FilteredMovies} />
                <PrivateRoute path="/movie/:movieId" component={MovieDetailPage} />
                <PrivateRoute path="/movie/watch/:movieId" component={MovieWatchPage} setShowHeader={setShowHeader} />
                <PrivateRoute path="/person/:personId" component={PersonDetailPage} />
                <PrivateRoute path="/addMovie" component={MovieAddPage} isAdmin={true} />
                <PrivateRoute path="/addPerson" component={PersonAddPage} isAdmin={true} />
                <PrivateRoute path="/updatePerson/:personId" component={PersonUpdatePage} isAdmin={true} />
                <PrivateRoute path="/updateMovie/:movieId" component={MovieUpdatePage} isAdmin={true} />
                <PrivateRoute path="/successResult/:name" component={SuccessPage} isAdmin={true} />
                <PrivateRoute path="/errorResult/:name" component={ErrorPage} isAdmin={true} />
                <PrivateRoute path="/addGenre" component={GenreAddPage} isAdmin={true} />
                <PrivateRoute path="/updateGenre/:genreId" component={GenreUpdatePage} isAdmin={true} />
                <PrivateRoute path="/profile" component={UserProfile} />

              </>

            ) : <LoadingPage />
          }
        </Switch>


      </BrowserRouter >

      <div style={{
        position: "relative",
        background: "rgb(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: "70px",
        marginTop: "auto"

      }}>
        <Footer />
      </div>
    </>
  );
}

export default App;
