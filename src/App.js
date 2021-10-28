/* eslint-disable no-undef */
import "regenerator-runtime/runtime";
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Big from "big.js";
import SignIn from "./components/SignIn";
import "./style.css";
import Field from "./components/Field";

const BOATLOAD_OF_GAS = Big(3)
  .times(10 ** 13)
  .toFixed();

const App = ({ contract, currentUser, nearConfig, wallet }) => {
  const [steps, setSteps] = useState([]);
  const [activeField, setActiveField] = useState();
  const [winner, setWinner] = useState("No winner");
  const [endGame, setEndGame] = useState(false);

  useEffect(async () => {
    try {
      const winner = await contract.checkWinner();
      setWinner(winner);
      setSteps(await contract.showAllSteps());
      if (winner !== "No winner") {
        setEndGame(true);
      }
    } catch (e) {
      console.log(e);
    }
  }, []);

  const signIn = () => {
    wallet.requestSignIn(nearConfig.contractName, "NEAR Tic-Tac-Toe");
  };

  const signOut = () => {
    wallet.signOut();
    window.location.replace(window.location.origin + window.location.pathname);
  };

  const handClickApprove = () => {
    if (!activeField) return;

    contract.addStep(
      { number: activeField },
      BOATLOAD_OF_GAS,
      Big("0")
        .times(10 ** 24)
        .toFixed()
    );
  };

  const handleNewGame = async () => {
    let result = await contract.newGame();
    console.log("result", result);
  };

  return (
    <main>
      <header>
        <h1>Tic-Tac-Toe : NEAR GAME</h1>
        {currentUser ? (
          <button onClick={signOut}>Log out</button>
        ) : (
          <button onClick={signIn}>Log in</button>
        )}
      </header>
      {currentUser ? (
        <div className="game">
          <Field
            steps={steps}
            activeField={activeField}
            setActiveField={setActiveField}
            className={`${endGame && "end-game"}`}
          />
          <div className="control-button">
            <button onClick={handleNewGame}>New game</button>
            {endGame && <div>{winner}</div>}
            <button onClick={handClickApprove} disabled={endGame}>
              Approve move
            </button>
          </div>
        </div>
      ) : (
        <SignIn />
      )}
    </main>
  );
};

App.propTypes = {
  contract: PropTypes.shape({
    addStep: PropTypes.func.isRequired,
    showAllSteps: PropTypes.func.isRequired,
  }).isRequired,
  currentUser: PropTypes.shape({
    accountId: PropTypes.string.isRequired,
    balance: PropTypes.string.isRequired,
  }),
  nearConfig: PropTypes.shape({
    contractName: PropTypes.string.isRequired,
  }).isRequired,
  wallet: PropTypes.shape({
    requestSignIn: PropTypes.func.isRequired,
    signOut: PropTypes.func.isRequired,
  }).isRequired,
};

export default App;
