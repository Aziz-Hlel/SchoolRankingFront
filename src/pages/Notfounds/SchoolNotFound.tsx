import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom';

const SchoolNotFound = () => {
    const location = useLocation();

    // useEffect(() => {
    //     console.error(
    //         "404 Error: User attempted to access non-existent route:",
    //         location.pathname
    //     );
    // }, [location.pathname]);

    return (
        <div className=" h-full flex items-center justify-center bg-gray-100">
            <div className="text-center">
                <h1 className="text-4xl font-bold mb-4">404</h1>
                <p className="text-xl text-gray-600 mb-4">This school does not exist</p>
                {/* <Link to="/dashboard" className="text-blue-500 hover:text-blue-700 underline">
                    Return to Home
                </Link> */}
            </div>
        </div>
    );
}

export default SchoolNotFound