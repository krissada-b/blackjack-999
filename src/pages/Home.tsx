import projectLogo from '../assets/projectLogo.png';
import playBtn from '../assets/playBtn.png'
import cards from '../assets/cards/card.png'
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="w-screen h-screen flex items-center justify-center flex-col">
      <div className='w-auto'>
				<div className='flex flex-col items-center'>
					<p className='text-6xl my-5'>Blackjack 999</p>

					<Link className='animate-bounce' to={'/game'}>
						<img style={{width:"100px"}} src={playBtn} alt="" /></Link>
        </div>
      </div>
    </div>
  )
}
export default Home