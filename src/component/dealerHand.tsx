const DealerHand = ({deck, canPlay, winner, playerSum, role}) => {
	const cloneDeck = [...deck]
	const hiddenScore = cloneDeck

	return (
		<>
			<div>
				<div id={role} className="flex justify-center mt-14 relative scale-[0.8] flex-wrap w-[300px]">
						<h1 className={`text-3xl text-primary absolute -top-8 -right-10 ${winner == 'you' ? 'line-through' : ''} `}>{!canPlay ? playerSum : hiddenScore.pop()?.value}</h1>
						{deck.map((card, index) => {
							if (canPlay) {
								const hidden = index == 0 ? "bg-[url('/src/assets/cards/cardBack.png')] -rotate-6 -mt-3" : "bg-[url('/src/assets/cards/card.png')]";
								return <div key={index} className={`flex justify-center items-center text-4xl text-[#6D5C5C]  bg-cover w-24 h-36 -ml-6 ${hidden}`}>{index != 0 ? card.figure : ''}</div>
							} else {
								const sendToAbove = index > 2 ? `absolute left-${index > 3 ? 12 : 6} top-28` : '';
								const animateNewCard = index > 1 ? 'animate-getCard' : '';
								return <div key={index} className={`flex justify-center items-center text-4xl text-[#6D5C5C] bg-[url('/src/assets/cards/card.png')] bg-cover w-24 h-36 -ml-6 ${animateNewCard} ${sendToAbove}`}>{card.figure}</div>
							}
						})}
					</div>
			</div>
		</>
	)
}

export default DealerHand