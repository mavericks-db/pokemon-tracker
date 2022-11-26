import { nanoid } from 'nanoid';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function LeagueCard() {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    id,
    title,
    leaguelocation,
    terrain,
    date,
    slots,
    maxstats,
    jsonPokemon,
  } = location.state;
  const apiURL = 'http://localhost:5000/api/my_pokemons';
  const saveURL = 'http://localhost:5000/api/updateleague';
  const statsURL = 'http://localhost:5000/api/selectpokemon';
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
    const spanAll = document.getElementsByClassName('spanStats');
    const totalArr = [];
    Array.from(spanAll).forEach((el) => {
      totalArr.push(parseInt(el.innerText, 10));
    });
    const total = totalArr.reduce((a, b) => a + b);
    const errorMsg = document.querySelector('#error_msg');
    if (total > maxstats) {
      errorMsg.textContent = 'The sum of the total stats of all slots should not exceed the total maximum stats allowed for the league. Please choose again. Reloading in 3 seconds.';
      // const btnAll = document.querySelectorAll('.confirm');
      // checkSelection = [];
      // Array.from(spanAll).forEach((i) => {
      //   const el = i;
      //   console.log(i.textContent);
      //   el.textContent = 0;
      // });
      // btnAll.forEach((button) => {
      //   button.removeAttribute('disabled');
      // });

      setTimeout(() => {
        errorMsg.textContent = ' ';
        window.location.reload();
      }, 3000);

      return null;
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
    navigate('/all_leagues');
    return null;
  };

  const statsHandler = (e) => {
    const target1 = e.target.nextSibling.id;
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
      const sibling = document.querySelector(`#${target1}`);
      sibling.textContent = data[0].attack + data[0].defense + data[0].speed;
    }
    fetchData();
  };

  return (
    <>
      <h1>This is a league card</h1>
      <h3>
        League ID:
        {id}
      </h3>
      <h3>
        Title:
        {title}
      </h3>
      <h5>
        Location:
        {leaguelocation}
      </h5>
      <h5>
        Terrain:
        {terrain}
      </h5>
      <h5>
        Date:
        {date}
      </h5>
      <h5>
        Total Maximum Stats:
        {maxstats}
      </h5>
      <h5>
        No. of required slots:
        {slots}
      </h5>
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
                    <select
                      id={`slotA_${idx + 1}`}
                      onChange={(e) => statsHandler(e)}
                    >
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
                    <span id={`spanA_${idx + 1}`} className="spanStats">
                      0
                    </span>
                  </td>
                  <td>
                    <select
                      id={`slotB_${idx + 1}`}
                      onChange={(e) => statsHandler(e)}
                    >
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
                    <span id={`spanB_${idx + 1}`} className="spanStats">
                      0
                    </span>
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
