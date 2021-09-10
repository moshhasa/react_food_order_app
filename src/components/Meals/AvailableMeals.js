import React, { useState, useEffect } from "react";
import useHttp from "../../hook/use-http";
import Card from "../UI/Card/Card";
import styles from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const { isLoading, error, sendRequest: fetchMeals } = useHttp();

  useEffect(() => {
    fetchMeals({ url: "http://localhost:8085/meals" }, (m) => setMeals(m));
  }, [fetchMeals]);

  let content = <p>No meals available</p>;

  if (isLoading) {
    content = <section className={styles['meals-loading']}> <p>Loading...</p> </section>;
  } else if (error) {
    content =<section className={styles['meals-error']}> <p>{error}</p> </section>;
  } else {
    content = (
      <section className={styles.meals}>
        <Card>
          <ul>
            {meals.map((meal) => (
              <li key={meal.id}>
                <MealItem meal={meal} />
              </li>
            ))}
          </ul>
        </Card>
      </section>
    );
  }

  return content;
};

export default AvailableMeals;
