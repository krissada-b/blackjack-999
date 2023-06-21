import projectLogo from '../assets/projectLogo.png';
import playIcon from '../assets/playIcon.png';
import cards from '../assets/cards/card.png'
import { Link } from 'react-router-dom';

export function Home() {
  return (
    <div className="w-screen h-screen flex items-center justify-center flex-col">
      <div className='w-auto'>
				<div className='flex flex-col items-center'>
					<img src={cards} className='w-52 h-60	' alt="" />
					<p className='text-6xl my-5'>Blackjack 999</p>
          <Link className='ml-8 bg-blue-500 text-white p-3 rounded-md w-auto flex items-center animate-bounce text-2xl' to={'/game'}>Play now <img className='w-4 h-6 ml-2' src={playIcon} alt="" /></Link>
        </div>
      </div>
    </div>
  )
}