import { useState, useEffect, useContext } from "react";
import { useFetch } from "../../../hooks/useFetch";
import { AuthContext } from "../../../context/AuthContext";
import ImageCard from "./ImageCard";


const Images = () => {
  const [images, setImages] = useState([]);
  const { loading, error, sendRequest, clearError } = useFetch();
  const auth = useContext(AuthContext);

  const fetchImages = async () => {
    const url = `${process.env.REACT_APP_BACKEND_URL}/api/image`;
    try {
      const responseData = await sendRequest(false, url);
      setImages(responseData.items);
      return;
    } catch (err) {}
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return <div>{images.map(i => <ImageCard key={i.id} image={i} />)}</div>;
};

export default Images;
