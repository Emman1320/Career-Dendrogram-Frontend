import Dashboard from "../layout/Dashboard";
import CareerCard from "../Career library/CareerCard";
import { Grid, Box } from "@mui/material";
import { useSelector } from "react-redux";

const cardColor = {
  Engineering: "orange",
  "Computer Science & It": "blue",
  Business: "blue",
  "Medical Science": "blue",
  Others: "blue",
};

const SearchResults = (props) => {
  const searchResults = useSelector((state) => state.user.searchResults);
  return (
    <Dashboard>
      <Grid
        container
        justifyContent="center"
        spacing={{ md: 1, xs: 0 }}
        sx={{ marginTop: "-1.5rem !important", marginBottom: "8rem" }}
      >
        {searchResults.length === 0 ? (
          <Box
            component="h1"
            sx={{
              color: "hsl(234, 12%, 34%)",
              marginTop: window.innerWidth < 700 ? "30%" : "10%",
            }}
          >
            No results available
          </Box>
        ) : (
          searchResults?.map((career, index) => (
            <CareerCard
              color={cardColor[career?.domainName]}
              key={index}
              transitionDelay={0}
              to={`/career-library/${career?.domainName}/${career?.name}`}
              header={career?.name}
              details={
                career?.description.length > 175
                  ? career?.description.substring(
                      0,
                      window.innerWidth > 600 ? 175 : 140
                    ) + "..."
                  : career?.description
              }
              imageSrc={career?.imageUrl}
            />
          ))
        )}
      </Grid>
    </Dashboard>
  );
};

export default SearchResults;
