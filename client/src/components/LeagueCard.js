import { nanoid } from 'nanoid';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../stylesheets/leaguecard.scss';

function LeagueCard() {
  const ulocation = useLocation();
  const navigate = useNavigate();
  const {
    id,
    title,
    location,
    terrain,
    date,
    slots,
    maxstats,
    jsonPokemon,
  } = ulocation.state;
  const apiURL = `${process.env.REACT_APP_API_BASE_URL}api/my_pokemons`;
  const saveURL = `${process.env.REACT_APP_API_BASE_URL}api/updateleague`;
  const statsURL = `${process.env.REACT_APP_API_BASE_URL}api/selectpokemon`;
  const availslots = new Array(slots).fill('');
  const [arr, setArr] = useState();
  let checkSelection = [];
  let selectedPokemons = [];

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(apiURL);
      const data = await response.json();
      setArr(data);
    }
    fetchData();
  }, [apiURL]);

  const clickHandler = (num) => {
    const btn = document.querySelector(`#confirmBtn${num}`);
    btn.setAttribute('disabled', '');
    btn.textContent = 'Confirmed';
    const slot1 = document.querySelector(`#slotA_${num}`);
    const slot2 = document.querySelector(`#slotB_${num}`);
    slot1.setAttribute('disabled', '');
    slot2.setAttribute('disabled', '');
    let outputA = slot1.value;
    let outputB = slot2.value;
    const errorMsg = document.querySelector('#error_msg');
    const btnAll = document.querySelectorAll('.confirm');

    const spanAll = document.getElementsByClassName('spanStats');
    const totalArr = [];
    Array.from(spanAll).forEach((el) => {
      totalArr.push(parseInt(el.innerText, 10));
    });
    const total = totalArr.reduce((a, b) => a + b);
    const currentTotal = document.querySelector('#currenttotal');
    currentTotal.textContent = total;

    const reset = () => {
      checkSelection = [];
      const selectOptions = document.querySelectorAll('.selectQuery');
      selectOptions.forEach((sel) => {
        const el = sel;
        el.value = '???';
        el.removeAttribute('disabled');
      });
      btnAll.forEach((button) => {
        button.removeAttribute('disabled');
        const btn = button;
        btn.textContent = 'Confirm';
      });
      setTimeout(() => {
        errorMsg.textContent = ' ';
        currentTotal.textContent = 0;
        Array.from(spanAll).forEach((el) => {
          const span = el;
          span.innerText = 0;
        });
        selectedPokemons = [];
      }, 2000);
    };

    if (outputA !== '???' && outputB === '???') {
      outputB = 'solo';
      checkSelection.push(outputA);
    }
    if (outputB !== '???' && outputA === '???') {
      outputA = 'solo';
      checkSelection.push(outputB);
    }
    if (checkSelection.length !== new Set(checkSelection).size) {
      errorMsg.textContent = 'A pokémon can only fight solo once. Please choose again.';
      reset();
    }
    if (outputA === outputB) {
      errorMsg.textContent = 'Empty or duplicate pokémon on a slot are not allowed. Please choose again.';
      reset();
    }

    if (total > maxstats) {
      errorMsg.textContent = 'The sum of the total stats of all slots should not exceed the total maximum stats allowed for the league. Please choose again.';
      reset();
    }

    selectedPokemons.push([outputA, outputB]);
  };

  const saveHandler = () => {
    const btnAll = document.querySelectorAll('.confirm');
    btnAll.forEach((button) => {
      if (button.disabled === false) {
        return false;
      }
      return null;
    });

    if (!selectedPokemons.length) {
      return false;
    }

    async function fetchData() {
      await fetch(saveURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ selectedPokemons, id }),
      });
    }
    fetchData();
    navigate('/home/all_leagues');
    return null;
  };

  const statsHandler = (e) => {
    const target1 = e.target.nextSibling.id;
    const sibling = document.querySelector(`#${target1}`);
    if (e.target.value === '???') {
      sibling.textContent = 0;
    }
    const obj = {
      pokemon: e.target.value,
    };
    async function fetchData() {
      const response = await fetch(statsURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj),
      });
      const data = await response.json();
      sibling.textContent = data[0].attack + data[0].defense + data[0].speed;
    }
    fetchData();
    return null;
  };

  return (
    <>
      <div className="league-wrapper-card">
        <div className="league-details">
          <div>
            <h4>
              League ID #:
              &emsp;
              {id}
            </h4>
            <h4>
              Title:
              &emsp;
              {title.charAt(0).toUpperCase() + title.slice(1)}
            </h4>
            <h4>
              Location:
              &emsp;
              {location.charAt(0).toUpperCase() + location.slice(1)}
            </h4>
            <h4>
              Terrain:
              &emsp;
              {terrain.charAt(0).toUpperCase() + terrain.slice(1)}
            </h4>
            <h4>
              Date:
              &emsp;
              {date.slice(0, 10)}
            </h4>
            <h4>
              Max Limit of Total Stats:
              &emsp;
              {maxstats}
            </h4>
            <h3>
              Required no. of slots:
              &emsp;
              {slots}
            </h3>
          </div>
          <div>
            <table>
              <thead>
                <tr>
                  <td>Slot #</td>
                  <td>Selected Pokémons</td>
                </tr>
              </thead>
              <tbody>
                {jsonPokemon ? (
                  jsonPokemon.map((pokemon, index) => (
                    <React.Fragment key={nanoid()}>
                      <tr>
                        <td>{index + 1}</td>
                        <td>
                          {pokemon.map((slot) => (
                            <h5 key={nanoid()}>
                              {slot === 'solo' ? '---' : (slot.charAt(0).toUpperCase() + slot.slice(1))}
                            </h5>
                          ))}
                        </td>
                      </tr>
                    </React.Fragment>
                  ))
                ) : (
                  <tr>
                    <td>
                      <h5>No pokémon selected yet.</h5>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div className="slot-details">
          <h4>Update Slot Details</h4>
          <table>
            <thead>
              <tr>
                <td>Slot #</td>
                <td>Pokémon Slot A (Total Stats)</td>
                <td>Pokémon Slot B (Total Stats)</td>
                <td>Action</td>
              </tr>
            </thead>
            <tbody>
              {availslots.length ? (
                availslots.map((slot, idx) => (
                  <React.Fragment key={nanoid()}>
                    <tr>
                      <td key={nanoid()}>{idx + 1}</td>
                      <td>
                        <select
                          id={`slotA_${idx + 1}`}
                          onChange={(e) => statsHandler(e)}
                          className="selectQuery"
                        >
                          <option value="???">???</option>
                          {arr ? (
                            arr.map((pokemon) => (
                              <option
                                value={pokemon.name.charAt(0).toUpperCase()
                                + pokemon.name.slice(1)}
                                key={nanoid()}
                              >
                                {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
                              </option>
                            ))
                          ) : (
                            <option value="???">???</option>
                          )}
                        </select>
                        <h4 id={`spanA_${idx + 1}`} className="spanStats">
                          0
                        </h4>
                      </td>
                      <td>
                        <select
                          id={`slotB_${idx + 1}`}
                          onChange={(e) => statsHandler(e)}
                          className="selectQuery"
                        >
                          <option value="???">???</option>
                          {arr ? (
                            arr.map((pokemon) => (
                              <option
                                value={pokemon.name.charAt(0).toUpperCase()
                                + pokemon.name.slice(1)}
                                key={nanoid()}
                              >
                                {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
                              </option>
                            ))
                          ) : (
                            <option value="???">???</option>
                          )}
                        </select>
                        <h4 id={`spanB_${idx + 1}`} className="spanStats">
                          0
                        </h4>
                      </td>
                      <td>
                        <button
                          type="button"
                          id={`confirmBtn${idx + 1}`}
                          onClick={() => clickHandler(idx + 1)}
                          className="confirm"
                        >
                          Confirm
                        </button>
                      </td>
                    </tr>
                  </React.Fragment>
                ))
              ) : (
                <td>Computing slots ... </td>
              )}
            </tbody>
          </table>
          <div className="buttons-section">
            <div>
              <button type="button" id="save" onClick={(e) => saveHandler(e)}>
                Save
              </button>
              <button
                type="button"
                id="reset"
                onClick={() => window.location.reload()}
              >
                Reset
              </button>
            </div>
            <h4>
              Current Total Stats: &emsp;
              <span id="currenttotal">&nbsp;0</span>
            </h4>
          </div>
          <h2 id="error_msg"> </h2>
        </div>
      </div>
    </>
  );
}

export default LeagueCard;
