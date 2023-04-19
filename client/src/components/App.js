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
// import TrailCollection from "./TrailCollection"
// import TrailsModal from "./TrailsModal"
import '../index.css'
// import backgroundImage from '../styles/80532.jpg'

export const UserContext = createContext()

function App() {
  const [user, setUser] = useState(null);
  const [trails, setTrails] = useState([]);
  const [gears, setGears] = useState([]);
  const [review, setReview] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [clickState, setClickState] = useState('');
  const [refresh, setRefresh] = useState(false);
  
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
      .then((data) => setReviews(data));
  }, []);


  const handleReviewDelete = (index, reviewId) => {
    fetch(`/reviews/${reviewId}`, {
      method: "DELETE"
    })
    .then(() => {
      // const newReviews = [...reviews];
      // newReviews.splice(index, 1);
      setReviews(reviews.filter(review => reviewId !== review.id ));
      setRefresh(prev => !prev);
      // console.log(reviews)
    })
    .catch(error => console.error(error));
  };

  if (!user) return <Login onLogin={setUser} />;

  return (
    <div className = "all">
      <UserContext.Provider value = {[user, setUser]}>
        <NavBar className = "navbar"/>
        <main>
          <Switch className={styles.container}>
            <Route exact path="/">
              Welcome to GreenSpace this is where i write things
            </Route>
            <Route exact path="/trails">
              <Trails/>
            </Route>
            <Route path={`/trails/:id`}>
              <TrailCard refresh = {refresh} setRefresh = {setRefresh} reviews = {reviews} trail= {trails} setReviews={setReviews} handleReviewDelete= {handleReviewDelete}/>
            </Route>
            <Route path="/gear" >
              <GearPage gears = {gears}/>
            </Route>
            <Route path="/reviews" >
              <ReviewPage reviews = {reviews} setReviews = {setReviews} handleReviewDelete= {handleReviewDelete}/>
            </Route>
          </Switch>
        </main>
        </UserContext.Provider>
    </div>
  );
}

export default App;
