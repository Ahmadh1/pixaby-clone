import { useEffect, useState } from "react";
import Card from "./components/Card";
import Search from "./components/Search";

function App() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [term, setTerm] = useState("");

  useEffect(() => {
    fetch(
      `https://pixabay.com/api/?key=${process.env.REACT_APP_PIXABY_API_KEY}&q=${term}&image_type=photo&pretty=true`
    )
      .then((res) => res.json())
      .then((data) => {
        setImages(data.hits);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, [term]);

  return (
    <div className="container mx-auto">
      <Search searchText={(text) => setTerm(text)} />

      {!isLoading && images.length === 0 && (
        <h1 className="text-5xl text-center text-gray-400 mx-auto mt-32">
          No Images Found of {term}
        </h1>
      )}

      {isLoading ? (
        <h1 className="text-6xl text-center text-gray-400 mx-auto mt-32">
          Loading...
        </h1>
      ) : (
        <div className="grid gap-4 sm:gird-cols-12 md:grid-cols-3 lg:grid-cols-3">
          {images.map((image) => (
            <Card key={image.id} image={image} />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
