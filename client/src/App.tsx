import {
  BusyIndicator,
  Button,
  FlexBox,
  FlexBoxAlignItems,
  FlexBoxDirection,
  FlexBoxJustifyContent,
  Icon,
  IconDesign,
  InputPropTypes,
  MessageStrip,
  RatingIndicator,
} from "@ui5/webcomponents-react";
import {
  Footer,
  Header,
  Heading,
  InfoMessageStrip,
  LoadingComponent,
  MovieInfo,
  PrimaryLayout,
  SearchBar,
  WarningMessageStrip,
} from "./components/layout";
import "@ui5/webcomponents-icons/dist/heart-2";
import "@ui5/webcomponents-icons/dist/heart";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { fetchMovie, resetMovie } from "./redux/slices/movieSlice";
import useWindowSize from "./hooks/useWindowSize";

function App() {
  const [inputVal, setInputVal] = useState("");
  const [favorite, setFavorite] = useState(false);
  const dispatch = useAppDispatch();
  const movie = useAppSelector((state) => state.movie.data);
  const isLoading = useAppSelector((state) => state.movie.isLoading);
  const size = useWindowSize();

  const handleInput: InputPropTypes["onInput"] = (e) => {
    setInputVal(e.target.value ?? "");
  };

  const handleSearch = () => {
    dispatch(fetchMovie(inputVal));
    setFavorite(false);
  };

  const handleReset = () => {
    setInputVal("");
    dispatch(resetMovie());
  };

  return (
    <PrimaryLayout>
      <Header />
      <main>
        <Heading />
        <SearchBar {...{ inputVal, handleInput, handleSearch, handleReset }} />
        {movie.title && !movie?.message && !isLoading ? (
          <MovieInfo {...{ movie, favorite, setFavorite }} />
        ) : (
          <LoadingComponent {...{ isLoading }} />
        )}
        {movie?.message && (
          <WarningMessageStrip {...{ message: movie.message }} />
        )}
        {!movie.title && !movie?.message && !isLoading && <InfoMessageStrip />}
      </main>
      <Footer />
    </PrimaryLayout>
  );
}

export default App;
