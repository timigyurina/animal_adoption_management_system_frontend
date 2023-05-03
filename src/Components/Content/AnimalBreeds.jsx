import { useState, useEffect } from "react";
import { useFetch } from "../../hooks/useFetch";
import Loader from "../UIElements/Loader";

const AnimalBreeds = () => {
  const [animalBreeds, setAnimalBreeds] = useState([]);
  const { loading, error, sendRequest, clearError } = useFetch();

  useEffect(() => {
    const url = `${process.env.REACT_APP_BACKEND_URL}/api/animalBreed`;
    const fetchAnimalBreeds = async () => {
      try {
        const responseData = await sendRequest(false, url);
        setAnimalBreeds(responseData.items);
        return;
      } catch (err) {}
    };
    fetchAnimalBreeds();
  }, [sendRequest]);

  return (
    <div>
      {error && (
        <div>
          {error} <button onClick={clearError}>OK</button>
        </div>
      )}
      {loading ? (
        <Loader/>
      ) : (
        animalBreeds.map((s) => <AnimalBreed key={s.id} animal={s} />)
      )}
    </div>
  );
};

const AnimalBreed = ({ animal }) => {
  return <div>{animal.description}</div>;
};


export default AnimalBreeds