import { Pokemon } from '../models';
import { showToaster } from '../hooks';

const MAX_TEAM_SIZE = 6;

/**
 * Adds a Pokémon to the team if the team size is within limits and the Pokémon is not already added.
 * @param pokemon The Pokémon to add.
 * @param team The current team of Pokémon.
 * @param setTeam React's state setter for the team.
 */
export const addToTeam = (
  pokemon: Pokemon,
  team: Pokemon[],
  setTeam: React.Dispatch<React.SetStateAction<Pokemon[]>>
): void => {
  if (team.some(p => p.id === pokemon.id)) {
    showToaster('Pokémon already in the team!', 'warning');
    return;
  }

  if (team.length >= MAX_TEAM_SIZE) {
    showToaster('You can only add up to 6 Pokémon!', 'warning');
    return;
  }

  const newTeam = [...team, pokemon];
  setTeam(newTeam);
  localStorage.setItem('pokemonTeam', JSON.stringify(newTeam));

  showToaster('Pokémon added to the team!', 'success');
};

/**
 * Loads the Pokémon team from localStorage.
 */
export const loadTeamFromLocalStorage = (): Pokemon[] => {
  const storedTeam = JSON.parse(localStorage.getItem('pokemonTeam') || '[]');
  return storedTeam;
};
