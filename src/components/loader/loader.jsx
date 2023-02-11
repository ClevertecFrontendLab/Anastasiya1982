import loader from '../../assets/loader.svg'
import './loader.scss';

export const Loader=()=>{
    console.log('loading')
    
    return (
      <div className='loader-container' data-test-id='loader'>
        <div className='loader'>
          <img src={loader} alt='loader' />
        </div>
      </div>
    );
}