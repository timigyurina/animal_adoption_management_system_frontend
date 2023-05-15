import { useState, useEffect } from "react";
import { useFetch } from "../../../hooks/useFetch";
import AnimalCard from "./AnimalCard";
import Loader from "../../SharedElements/Loader";

const Animals = () => {
  const [animals, setAnimals] = useState([]);
  const { loading, error, sendRequest, clearError } = useFetch();

  useEffect(() => {
    const url = `${process.env.REACT_APP_BACKEND_URL}/api/animal`;
    const fetchAnimals = async () => {
      try {
        const responseData = await sendRequest(false, url);
        setAnimals(responseData.items);
        return;
      } catch (err) {}
    };
    fetchAnimals();
  }, [sendRequest]);

  return (
    <div>
      {error && (
        <div>
          {error} <button onClick={clearError}>OK</button>
        </div>
      )}
      {loading ? (
        <Loader />
      ) : (
        animals.map((s) => <AnimalCard key={s.id} animal={s} />)
      )}
    </div>
  );
};

export default Animals;
