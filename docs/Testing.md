# Testing for MyPokeTeam

## Banner test
Snapshot test to test banner renders with correct text and image on root path, 
and that banner renders with correct text and image on /team path for desktop and mobile

## Favourites test
Mathces the favourite component with correct props. It renders with correct number of PokemonCard components. It also renders "No Pokémons in your team" when there are no Pokémon.
It also tests prevention of a longer name than 20 characters. And toggles favourite is clicked.
## Filter test
Filter component matches snapshot, it also test if filter renders with corrct amount of options and correct props. It also checks if filter change when value is selected. It also checks if filter value persists in storage, and restores filter value from sessionStorage.

## Nav test
Checks link elements of the navbar.

## Pokemon Card test
Makes sure pokemon Card renders with correct data.
## Team page test
Matches snapshot with correct props.

## Routing test
Renders root component on homepage correctly. Renders TeamPage on /team route. Renders ErrorPage on invalid path.



