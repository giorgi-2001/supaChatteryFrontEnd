import { Link } from 'react-router-dom'

const Page404 = () => {
    return ( 
        <div className="error-page">
            <div>
                <h1>Oops, page was not found</h1>
                <h2>Error message: 404</h2>
                <Link to="/">back to the Home page</Link>
            </div>
        </div>
     );
}
 
export default Page404  ;