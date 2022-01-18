import { Link } from 'react-router-dom';

function Notfound() {
  return (
    <div>
      <h1>Oops!! Page Not found</h1>
      <Link to={'/'}>Please Go back</Link>
    </div>
  );
}

export default Notfound;
