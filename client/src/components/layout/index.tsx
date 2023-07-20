import {
  Bar,
  BarDesign,
  BusyIndicator,
  Button,
  FlexBox,
  FlexBoxAlignItems,
  FlexBoxDirection,
  FlexBoxJustifyContent,
  Icon,
  IconDesign,
  Input,
  MessageStrip,
  RatingIndicator,
} from "@ui5/webcomponents-react";
import "@ui5/webcomponents-icons/dist/video";
import useWindowSize from "../../hooks/useWindowSize";

export const PrimaryLayout = ({ children }) => (
  <FlexBox
    direction={FlexBoxDirection.Column}
    justifyContent={FlexBoxJustifyContent.Center}
    alignItems={FlexBoxAlignItems.Center}
  >
    {children}
  </FlexBox>
);

export const Header = () => (
  <header>
    <Bar className="bar">
      <Icon name="video"></Icon>
      <h1>Movies Information</h1>
    </Bar>
  </header>
);

export const Heading = () => (
  <section>
    <FlexBox
      direction={FlexBoxDirection.Column}
      justifyContent={FlexBoxJustifyContent.Center}
      alignItems={FlexBoxAlignItems.Center}
    >
      <h2>Search Movies</h2>
      <p>
        Find your favorite movies information by typing the title of the movie
        in the search box below.
      </p>
    </FlexBox>
  </section>
);

export const SearchBar = ({
  inputVal,
  handleInput,
  handleSearch,
  handleReset,
}) => {
  const size = useWindowSize();
  return (
    <section>
      <FlexBox
        direction={
          size.width <= 1000 ? FlexBoxDirection.Column : FlexBoxDirection.Row
        }
        justifyContent={FlexBoxJustifyContent.Center}
        alignItems={FlexBoxAlignItems.Center}
      >
        <FlexBox>
          <Icon className="search-icon" name="search"></Icon>
          <Input
            className="input"
            placeholder="Serach by title ex: 'finding nemo'"
            onInput={handleInput}
            value={inputVal}
            valueState="Success"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }

              if (e.key === "Escape") {
                handleReset();
              }
            }}
          />
        </FlexBox>

        <FlexBox>
          <Button
            className="button"
            disabled={inputVal === ""}
            onClick={handleSearch}
          >
            Search
          </Button>
          <Button className="button" onClick={handleReset}>
            Reset
          </Button>
        </FlexBox>
      </FlexBox>
    </section>
  );
};

export const MovieInfo = ({ movie, favorite, setFavorite }) => {
  const size = useWindowSize();
  return (
    <section>
      <FlexBox
        direction={
          size.width <= 1000
            ? FlexBoxDirection.ColumnReverse
            : FlexBoxDirection.Row
        }
        justifyContent={FlexBoxJustifyContent.SpaceBetween}
        alignItems={FlexBoxAlignItems.Center}
      >
        <section>
          <FlexBox
            direction={FlexBoxDirection.Column}
            justifyContent={FlexBoxJustifyContent.SpaceAround}
            alignItems={FlexBoxAlignItems.Start}
          >
            <h1>{movie.title}</h1>
            <p>{movie.plot}</p>
            <p>Actors: {movie.actors}</p>
            <FlexBox
              direction={FlexBoxDirection.Row}
              justifyContent={FlexBoxJustifyContent.Center}
              alignItems={FlexBoxAlignItems.Center}
            >
              <p className="rating">Rating:</p>
              <RatingIndicator readonly value={Number(movie.rating) / 2} />
            </FlexBox>
            <Button onClick={() => setFavorite(!favorite)} className="button">
              Favorite
              {!favorite ? (
                <Icon
                  className="icon"
                  name="heart-2"
                  design={IconDesign.Neutral}
                />
              ) : (
                <Icon
                  className="icon"
                  name="heart"
                  design={IconDesign.Critical}
                />
              )}
            </Button>
          </FlexBox>
        </section>
        {movie.poster !== "N/A" && (
          <section className="poster">
            <FlexBox>
              <img src={movie.poster} alt="movie poster" />
            </FlexBox>
          </section>
        )}
      </FlexBox>
    </section>
  );
};

export const LoadingComponent = ({ isLoading }) => (
  <FlexBox
    direction={FlexBoxDirection.Row}
    justifyContent={FlexBoxJustifyContent.Center}
    alignItems={FlexBoxAlignItems.Center}
  >
    <BusyIndicator
      style={{ marginTop: "10rem", color: "#a3b18a" }}
      active={isLoading}
      delay={0}
      size="Large"
    />
  </FlexBox>
);

export const WarningMessageStrip = ({ message }) => (
  <section>
    <FlexBox
      direction={FlexBoxDirection.Row}
      alignItems={FlexBoxAlignItems.Center}
      justifyContent={FlexBoxJustifyContent.Center}
    >
      <MessageStrip
        style={{ maxWidth: "22rem" }}
        design="Warning"
        hideCloseButton
      >
        {message}
      </MessageStrip>
    </FlexBox>
  </section>
);

export const InfoMessageStrip = () => (
  <FlexBox
    direction={FlexBoxDirection.Row}
    alignItems={FlexBoxAlignItems.Center}
    justifyContent={FlexBoxJustifyContent.Center}
  >
    <MessageStrip
      style={{ maxWidth: "20rem" }}
      design="Positive"
      hideCloseButton
    >
      If found, your movie info will appear here.
    </MessageStrip>
  </FlexBox>
);

export const Footer = () => (
  <footer>
    <Bar className="bar" design={BarDesign.Footer}>
      <p
        onClick={() =>
          window.open(
            "https://www.linkedin.com/in/fredericodalgrande",
            "_blank"
          )
        }
      >
        About the developer
      </p>
    </Bar>
  </footer>
);
