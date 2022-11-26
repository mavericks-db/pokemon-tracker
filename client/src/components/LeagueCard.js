import { nanoid } from 'nanoid';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function LeagueCard() {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    id, title, leaguelocation, terrain, date, slots, maxstats, jsonPokemon,
  } = location.state;
  const apiURL = 'http://localhost:5000/api/my_pokemons';
  const saveURL = 'http://localhost:5000/api/updateleague';
  const availslots = new Array(slots).fill('');
  const [arr, setArr] = useState();
  let checkSelection = [];
  const selectedPokemons = [];

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(apiURL);
      const data = await response.json();
      setArr(data);
    }
    fetchData();
  }, []);

  const clickHandler = (num) => {
    const btn = document.querySelector(`#confirmBtn${num}`);
    btn.setAttribute('disabled', '');
    const slot1 = document.querySelector(`#slotA_${num}`);
    const slot2 = document.querySelector(`#slotB_${num}`);
    let output1 = slot1.value;
    let output2 = slot2.value;
    const errorMsg = document.querySelector('#error_msg');
    const btnAll = document.querySelectorAll('.confirm');

    const reset = () => {
      checkSelection = [];
      btnAll.forEach((button) => {
        button.removeAttribute('disabled');
      });
      setTimeout(() => {
        errorMsg.textContent = ' ';
      }, 3000);
    };

    if (output1 !== 0 && output2 === '0') {
      output2 = 'solo';
      checkSelection.push(output1);
    }
    if (output2 !== 0 && output1 === '0') {
      output1 = 'solo';
      checkSelection.push(output2);
    }
    if (checkSelection.length !== new Set(checkSelection).size) {
      errorMsg.textContent = 'A pokemon can only fight solo once. Please choose again.';
      reset();
    }
    if (output1 === output2) {
      errorMsg.textContent = 'Duplicate pokemon. Please choose again.';
      reset();
    }
    selectedPokemons.push([output1, output2]);
  };

  const saveHandler = () => {
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
    navigate('/all_leagues');
  };

  return (
    <>
      <h1>This is a league card</h1>
      <h3>{id}</h3>
      <h3>{title}</h3>
      <h5>{leaguelocation}</h5>
      <h5>{terrain}</h5>
      <h5>{date}</h5>
      <h5>{maxstats}</h5>
      <h5>{slots}</h5>
      <table>
        <thead>
          <tr>
            <td>Slot #</td>
            <td>Selected Pokemons</td>
          </tr>
        </thead>
        <tbody>
          {jsonPokemon ? (
            jsonPokemon.map((pokemon, index) => (
              <React.Fragment key={nanoid()}>
                <tr>
                  <td>{index + 1}</td>
                  <td>
                    {pokemon.map((slot, idx) => (
                      <h5 key={nanoid()}>
                        {`${idx + 1}.)`}
                        {' '}
&nbsp;
                        {' '}
                        {slot === 'solo' ? '---' : slot}
                      </h5>
                    ))}
                  </td>
                </tr>
              </React.Fragment>
            ))
          ) : (
            <tr>
              <td>
                <h5>No pokemon selected yet.</h5>
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <h2>Slot Details</h2>
      <table>
        <thead>
          <tr>
            <td>Slot #</td>
            <td>Pokemon Slot 1</td>
            <td>Pokemon Slot 2</td>
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
                    <select id={`slotA_${idx + 1}`}>
                      <option value="0">&nbsp;</option>
                      {arr ? (
                        arr.map((pokemon) => (
                          <option value={pokemon.name} key={nanoid()}>
                            {pokemon.name}
                          </option>
                        ))
                      ) : (
                        <option value="0">&nbsp;</option>
                      )}
                    </select>
                  </td>
                  <td>
                    <select id={`slotB_${idx + 1}`}>
                      <option value="0">&nbsp;</option>
                      {arr ? (
                        arr.map((pokemon) => (
                          <option value={pokemon.name} key={nanoid()}>
                            {pokemon.name}
                          </option>
                        ))
                      ) : (
                        <option value="0">&nbsp;</option>
                      )}
                    </select>
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
      <button type="button" id="save" onClick={() => saveHandler()}>
        Save
      </button>
      <h2 id="error_msg"> </h2>
    </>
  );
}

export default LeagueCard;
