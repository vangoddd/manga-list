import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className='row justify-content-center'>
      <div className='col-6'>
        <header>
          <Link className='text-white text-decoration-none' to='/'>
            <h1>
              <i className='far fa-eye-slash fa-xs'></i> manga
            </h1>
          </Link>
          <span>Developed by vangod</span>
        </header>
      </div>
    </div>
  );
};

export default Header;
