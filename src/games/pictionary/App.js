import React, { useRef, useReducer, useEffect } from "react";
import "./App.css";
import Canvas from "./Canvas";
import Drawing from "./Drawing";
import Guessing from "./Guessing";
import Scoreboard from "./Scoreboard";

const initialState = {
  round: 1,
  phase: "drawing",
  score: 0,
  drawingPlayer: null,
  animal: "",
  players: [],
};

function reducer(state, action) {
  switch (action.type) {
    case "setPlayers":
      return {
        ...state,
        players: action.payload,
      };
    case "setPhase":
      return {
        ...state,
        phase: action.payload,
      };
    case "setAnimal":
      return {
        ...state,
        animal: action.payload,
      };
    case "setRound":
      return {
        ...state,
        round: state.round + 1,
      };
    case "setDrawingPlayer":
      let newDrawingPlayer;
      if (state.drawingPlayer === state.players[0]) {
        newDrawingPlayer = state.players[1];
      } else {
        newDrawingPlayer = state.players[0];
      }
      return {
        ...state,
        drawingPlayer: newDrawingPlayer,
      };
    case "setScore":
      return {
        ...state,
        score: state.score + 1,
      };
    default:
      console.error("Reducer case not found in App.js.");
  }
}

function App(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    dispatch({
      type: "setPlayers",
      payload: props.players,
    });
  }, []);

  useEffect(() => {
    dispatch({
      type: "setDrawingPlayer",
    });
  }, []);

  let refCanvas = useRef(null);

  function setScore() {
    globalUpdate({
      type: "setScore",
    });
  }

  function globalUpdate(action) {
    dispatch(action);
    props.updateFirebase(state);
  }
  console.table(state);
  return (
    <div className="pictionary-app">
      <h1>Code Nation Presents: Pictionary</h1>
      {state.phase === "drawing" && (
        <Drawing globalUpdate={globalUpdate} animal={state.animal} />
      )}
      <Canvas ref={refCanvas} animal={state.animal} phase={state.phase} />
      {state.phase === "guessing" && (
        <Guessing
          globalUpdate={globalUpdate}
          animal={state.animal}
          refCanvas={refCanvas}
          score={state.score}
          setScore={setScore}
        />
      )}
      <Scoreboard
        score={state.score}
        round={state.round}
        drawingPlayer={state.drawingPlayer}
      />
    </div>
  );
}

export default App;
