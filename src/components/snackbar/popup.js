import React, { useState, useEffect } from 'react';
import { UncontrolledAlert } from "reactstrap";
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';

const Popup = () => {
  const [isCookieAccepted, setIsCookieAccepted] = useState(Cookies.get('cookieAccepted'));

  const handleAcceptCookie = () => {
    Cookies.set('cookieAccepted', 'true', { expires: 365 }); // Set cookie to be valid for 1 year
    setIsCookieAccepted(true);
  };

  useEffect(() => {
    // Display the cookie popup only if the user hasn't accepted the cookie
    if (!isCookieAccepted) {
      // You can customize the appearance or behavior of the cookie popup here
    }
  }, [isCookieAccepted]);

  if (isCookieAccepted) {
    return null; // If the cookie is accepted, don't render the popup
  }

  return (
    <React.Fragment>
      <UncontrolledAlert className="card cookie-popup bg-white shadow rounded py-3 px-4">
        <p className="text-muted mb-0 fs-6">
          This website uses cookies to provide you with a great user experience. By using it,
          you accept our{' '}
          <Link to="" rel="noopener noreferrer" className="text-success h6">
            use of cookies
          </Link>
        </p>
        <button onClick={handleAcceptCookie} className="btn btn-success mt-3">
          Accept Cookies
        </button>
      </UncontrolledAlert>
    </React.Fragment>
  );
};

export default Popup;
