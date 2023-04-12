import styles from '../index.css';
import React, { useEffect, useState, createContext } from "react";
import { Switch, Route } from "react-router-dom";
import NavBar from "./NavBar";
import Login from "../pages/Login";
import Trails from "../pages/Trails"
import ReviewPage from "./ReviewPage";
import GearPage from "./GearPage";
import Gear from "../pages/Gear";
import TrailCard from "./TrailCard"
import TrailCollection from "./TrailCollection"
import TrailsModal from "./TrailsModal"
// import backgroundImage from '../styles/80532.jpg'

export const UserContext = createContext()

function App() {
  const [user, setUser] = useState(null);
  const [trails, setTrails] = useState([]);
  const [gears, setGears] = useState([]);
  const [review, setReview] = useState([]);
  const [clickState, setClickState] = useState('');
  
  useEffect(() => {
    fetch("/check_session").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }, []);
  
  useEffect(() => {
    fetch("/trails")   
      .then((res) => res.json())
      .then((data) => setTrails(data));
  }, []);

  useEffect(() => {
    fetch("/gear")   
      .then((res) => res.json())
      .then((data) => setGears(data));
  }, []);
  
  useEffect(() => {
    fetch("/reviews")   
      .then((res) => res.json())
      .then((data) => setReview(data));
  }, []);

  if (!user) return <Login onLogin={setUser} />;

  return (
    <>
      <UserContext.Provider value = {[user, setUser]}>
        <NavBar />
        <main>
          <Switch className={styles.container}>
            <Route exact path="/">
              Welcome to GreenSpace
            </Route>
            <Route exact path="/trails">
              <Trails/>
            </Route>
            <Route path={`/trails/:id`}>
              <TrailCard trail= {trails}/>
            </Route>
            <Route path="/gear" >
              <GearPage gears = {gears}/>
            </Route>
            <Route path="/reviews" >
              <ReviewPage reviews = {review} setReviews = {setReview} />
            </Route>
          </Switch>
        </main>
        </UserContext.Provider>
    </>
  );
}

export default App;
