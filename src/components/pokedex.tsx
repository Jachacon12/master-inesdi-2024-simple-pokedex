import c from 'classnames';
import { useTheme } from 'contexts/use-theme';
import { usePokemon, usePokemonList, useTextTransition } from 'hooks';
import { useState } from 'react';
import { randomMode } from 'utils/random';
import { Button } from './button';
import { LedDisplay } from './led-display';
import './pokedex.css';

export function Pokedex() {
  const { theme } = useTheme();
  const { ready, resetTransition } = useTextTransition();
  const { pokemonList } = usePokemonList();
  const [i, setI] = useState(0);
  const { pokemon: selectedPokemon } = usePokemon(pokemonList[i]);

  const prev = () => {
    resetTransition();
    if (i === 0) {
      setI(pokemonList.length - 1);
    }
    setI(i => i - 1);
  };

  const next = () => {
    resetTransition();
    if (i === pokemonList.length - 1) {
      setI(0);
    }
    setI(i => i + 1);
  };

  return (
    <div className={c('pokedex', `pokedex-${theme}`)}>
      <div className="panel left-panel">
        <div className="left-top-container">
          <svg
            viewBox="0 0 300 100"
            className="left-svg"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
          >
            <polyline points="0,75 70,75 90,38 300,38" />
          </svg>

          <div className="lights-container">
            <div className="big-light-boarder">
              <div className="big-light blue">
                <div className="big-dot light-blue"></div>
              </div>
            </div>
            <div className="small-lights-container">
              <LedDisplay color="red" />
              <LedDisplay color="yellow" />
              <LedDisplay color="green" />
            </div>
          </div>
        </div>
        <div className="screen main-screen">
          {selectedPokemon && (
            <img
              className={c(
                'sprite',
                'obfuscated',
                ready && 'ready',
                ready && `ready--${randomMode()}`
              )}
              src={selectedPokemon.sprites.front_default}
              alt={selectedPokemon.name}
            />
          )}
        </div>
        <div className="screen name-display">
          <div
            className={c(
              'name',
              'obfuscated',
              ready && 'ready',
              ready && `ready--${randomMode()}`
            )}
          >
            {selectedPokemon?.name}
          </div>
        </div>
        <div className="controls">
          <Button label="prev" onClick={prev} />
          <Button label="next" onClick={next} />
        </div>
      </div>
      <div className="right-panel">
        <div className="empty-container">
          <svg
            viewBox="0 0 270 100"
            className="left-svg"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
          >
            <polyline points="0,40 138,40 158,75 270,75"></polyline>
          </svg>
        </div>
        <div className="screen second-screen">
          {selectedPokemon && (
            <div className="name-display information-display">
              <details className="information-button">
                <summary>Types</summary>
                <div className="information-child">
                  {selectedPokemon.types.slice(0, 3).map(a => (
                    <p key={a.type?.name}>{a.type?.name}</p>
                  ))}
                </div>
              </details>
              <details className="information-button">
                <summary>Weaknesses</summary>
                <div className="information-child">
                  {selectedPokemon.weaknesses.slice(0, 3).map(a => (
                    <p key={a.weakness?.name}>{a.weakness?.name}</p>
                  ))}
                </div>
              </details>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
