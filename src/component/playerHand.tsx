const PlayerHand = ({deck, winner, playerSum, role}) => {
	const cloneDeck = [...deck]
	const hiddenScore = cloneDeck

	return (
		<>
			<div>
				<div id={role} className="flex justify-center mt-14 relative scale-[0.7] flex-wrap w-[350px]">
						<h1 className={`text-3xl text-primary absolute -top-8 -right-10 ${winner == 'dealer' ? 'line-through' : ''}`}>{playerSum}</h1>
						{deck.map((card, index) => {
							const sendToAbove = index > 2 ? `absolute sendToAbove -bottom-32` : '';
							return <div key={index} className={`flex justify-center items-center text-6xl text-[#6D5C5C] bg-[url('/src/assets/cards/card.png')] bg-cover w-32 h-48 -ml-6 animate-getCard -rotate-2 ${sendToAbove}`}>{card.figure}</div>
						})}
					</div>
			</div>
		</>
	)
}

export default PlayerHand