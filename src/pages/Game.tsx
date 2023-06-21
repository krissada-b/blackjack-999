import React, { Component } from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card } from "../entities/card";

import DealerHand from "../component/dealerHand";
import PlayerHand from "../component/playerHand";

function Game() {

  const [gameStarted, setGameStarted] = useState(false);

  const [dealerDeck, setDealerDeck] = useState<Card[]>([]);
  const [yourDeck, setYourDeck] = useState<Card[]>([]);

  const [dealerSum, setDealerSum] = useState(0);
  const [yourSum, setYourSum] = useState(0);

  const [seconds, setSeconds] = useState(0);
  const [stopLoading, setStopLoading] = useState(true);
  var timer: number;

	const [canPlay, setCanPlay] = useState(true);

	const [yourCoin, setYourCoin] = useState(100);
  const [dealerCoin, setDealerCoin] = useState(100);


  const cloneDeck = [...dealerDeck];
  const hiddenScore = cloneDeck;

  const [winner, setWinner] = useState<'dealer' | 'you' | 'tie' | ''>('');

  useEffect(() => {
    if (dealerDeck.length < 2 && yourDeck.length < 2) {
      setDealerSum(buildDeck(dealerDeck));
      setYourSum(buildDeck(yourDeck));
    }
  }, [winner]);

  if (!canPlay && winner == '') {
    setTimeout(() => {
      dealerPlay();
    }, 1000);
  }

  useEffect(() => {
    if (canPlay && gameStarted) {
      timer = setInterval(() => {
        setSeconds(seconds + 1);
      }, 1000)

      setStopLoading(true);
      if (seconds >= 6) {
        clearInterval(timer);
        setStopLoading(false);

        setCanPlay(false);
        setTimeout(() => {
          dealerPlay();
        }, 1000);
      }

      if (yourSum >= 21) {
        setStopLoading(false);
        setSeconds(10);
      }
      return () => clearInterval(timer);
    }

  }, [seconds, gameStarted]);

  const stay = () => {
    if (canPlay) {
      clearInterval(timer);
      setSeconds(10);

      setCanPlay(false);
      setStopLoading(false);
    } else {
      console.log('you cant play')
    }
  }

  const hit = () => {
    if (canPlay) {
      clearInterval(timer);
      setSeconds(10);

      gameStarted ? null : setGameStarted(true);

      if (yourSum < 21) {
        const card = new Card();
        const newDeck = yourDeck;
        const newSum = yourSum + card.value;
        newDeck.push(card);

        setYourSum(newSum)
        setYourDeck(newDeck);

        setSeconds(0);
        setStopLoading(false);
      }
    } else {
      console.log('you cant play')
    }
  }

  function dealerPlay() {
		if (yourSum === 21 && dealerSum < 21) {
			if (!dealerHit()) {
				setWinner("you")
				setYourCoin(yourCoin + 20)
				setDealerCoin(dealerCoin - 20)
			}
    }
    else if (dealerSum === 21 && yourSum < 21) {
			setWinner("dealer")
			setYourCoin(yourCoin - 20)
			setDealerCoin(dealerCoin + 20)
    }
    else if (dealerSum === 21 && yourSum === 21 || yourSum === dealerSum) {
      dealerHit() ? '' : setWinner("tie");
    }
    else if (dealerSum > 21 && yourSum < dealerSum) {
			setWinner("you");
			setYourCoin(yourCoin + 20)
			setDealerCoin(dealerCoin - 20)
    }
    else if (yourSum > 21 && dealerSum < yourSum) {
			setWinner("dealer");
			setYourCoin(yourCoin - 20)
			setDealerCoin(dealerCoin + 20)
    }
    else if (dealerSum < yourSum) {
      if (!dealerHit()) {
				setWinner("you")
				setYourCoin(yourCoin + 20)
				setDealerCoin(dealerCoin - 20)
			}
    }
    else if (yourSum < dealerSum) {
			setWinner("dealer");
			setYourCoin(yourCoin - 20)
			setDealerCoin(dealerCoin + 20)
    }
  }

  function buildDeck(deck: Card[]): number {
    let sum = 0;

    for (let index = 0; index < 2; index++) {
      const card = new Card;
      sum = sum + card.value;
      deck.push(card);
    }
    return sum;
  }

  function dealerHit() {
    if (dealerSum < 16) {
      const card = new Card();
      const newDeck = dealerDeck;
      const newSum = dealerSum + card.value;
      newDeck.push(card);

      setDealerSum(newSum)
      setDealerDeck(newDeck);

      return true;
    } else {
      return false;
    }
  }

	return (
		<>
			<div className="w-screen h-screen flex flex-col justify-center">

				{/* Dealer and Player Hand */}
				<div className="flex flex-row items-center justify-center">
					{winner != '' ? <h1 className="text-primary text-6xl absolute -mt-20  z-50 animate-getAlertWinner">{winner} {winner == 'tie' ? '' : 'win'} {winner == 'you' ? ':)' : ':('}</h1> : null}
					<DealerHand deck={dealerDeck} canPlay={canPlay} winner={winner} playerSum={dealerSum} role="dealerHand" />
					<PlayerHand deck={yourDeck}  winner={winner} playerSum={yourSum} role="playerHand" />
				</div>


				{/* Coin */}
				<div className="flex flex-row items-center justify-center gap-44 mt-20">
					<div className="flex flex-col">
						<p className="text-6xl mx-5">Dealer</p>
						<p className="text-6xl mx-5">{dealerCoin}</p>
					</div>
					<div className="flex flex-col">
						<p className="text-6xl mx-5">Player</p>
						<p className="text-6xl mx-5">{yourCoin }</p>
					</div>
				</div>


				{/* Game Controls */}
				<div className="flex flex-row justify-center">
					<div className="mt-20">
						<div className="w-full h-[6px] rounded-full bg-shadow mb-4 relative">
							{stopLoading && yourDeck.length > 2 ?
								(<div className="absolute top-0 bottom-0 bg-primary animate-actionLoader"></div>)
								: ''}
						</div>

						{winner != '' ? (
							<div>
								<button onClick={() => {
									setDealerDeck([]);
									setYourDeck([]);
									setDealerSum(0);
									setYourSum(0);
									setYourCoin(100)
									setDealerCoin(100)
									setCanPlay(true);
									setWinner('');
								}} className="text-2xl w-64 h-14 rounded-md bg-primary text-bg">
									Play again
								</button> <br />
							</div>) : (
								<div >
									<button onClick={hit} className={`text-3xl w-44 h-14 rounded-md ${canPlay && yourSum < 21 ? 'bg-primary text-bg' : 'bg-shadow text-secondary'} transition-colors`}>hit</button>
									<button onClick={stay} className={`text-3xl w-20 h-14 ${canPlay && yourSum <= 21 ? 'bg-b-secondary text-bg' : 'bg-shadow text-secondary'} transition-colors rounded-md ml-4`}>stay</button>
							</div>
						)}
						<Link className="text-2xl text-secondary underline mt-8" to={"/help"}>how to play</Link>
					</div>
				</div>
			</div>
		</>
  )
}

export default Game
