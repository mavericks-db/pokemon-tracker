import React from 'react';
import { useForm } from 'react-hook-form';
import '../stylesheets/league.scss';
import { Link, useNavigate } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import { nanoid } from 'nanoid';
import { BsInfoCircle } from 'react-icons/bs';

function League() {
  const { register, handleSubmit } = useForm();
  const apiURL = 'http://localhost:5000/api/bookleague';
  const navigate = useNavigate();

  const pokeleagues = [{
    title: 'Indigo League',
    location: 'Kanto',
  },
  {
    title: 'Indigo League',
    location: 'Johto',
  },
  {
    title: 'Orange League',
    location: 'Orange Archipelago',
  },
  {
    title: 'Hoenn League',
    location: 'Hoenn',
  },
  {
    title: 'Sinnoh League',
    location: 'Sinnoh',
  },
  {
    title: 'Unova League',
    location: 'Unova',
  },
  {
    title: 'Kalos League',
    location: 'Kalos',
  },
  {
    title: 'Alola League',
    location: 'Alola',
  },
  {
    title: 'Galar League',
    location: 'Galar',
  },
  ];

  return (
    <>
      <div className="league-wrapper">
        <h2>Please book a league</h2>
        <div className="form-wrapper">
          <form
            onSubmit={handleSubmit((data) => {
              async function fetchData() {
                await fetch(apiURL, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(data),
                });
              }
              fetchData();
              navigate('/home/all_leagues');
            })}
            className="form-container"
          >
            <h2>League Details</h2>
            <label htmlFor="title">
              Title:
              <input
                {...register('title', { required: true })}
                placeholder="Title"
                id="title"
              />
            </label>
            <label htmlFor="type">
              Location:
              <input
                {...register('location', { required: true })}
                placeholder="Location"
                id="location"
              />
            </label>
            <label htmlFor="terrain">
              Terrain:
              <input
                {...register('terrain', { required: true })}
                placeholder="Terrain"
                id="terrain"
              />
            </label>
            <label htmlFor="date">
              Date:
              <input
                {...register('date', { required: true })}
                placeholder="Date"
                id="date"
                type="date"
              />
            </label>
            <label htmlFor="slots">
              No. of slots:
              <input
                {...register('slots', { required: true })}
                placeholder="Slots"
                id="slots"
                type="number"
              />
            </label>
            <label htmlFor="maxstats">
              Max limit of total stats:
              <input
                {...register('maxstats', { required: true })}
                placeholder="Max Limit"
                id="maxstats"
                type="number"
              />
            </label>
            <div>
              <button type="submit">Submit</button>
              <button
                type="button"
                id="reset"
                onClick={() => window.location.reload()}
              >
                Reset
              </button>
            </div>
          </form>
          <div className="notes">
            <h4>
              <BsInfoCircle />
              There are nine (9) known regional Leagues:
            </h4>
            <ul>
              {pokeleagues.map((ll) => (
                <React.Fragment key={nanoid()}>
                  <li>{ll.title}</li>
                </React.Fragment>
              ))}
            </ul>
          </div>
        </div>
        <Link to="/home" className="home-league">
          <FaHome />
          Home
        </Link>
      </div>
    </>
  );
}

export default League;
