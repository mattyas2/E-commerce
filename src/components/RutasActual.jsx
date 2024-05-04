import { Fragment, useEffect, useState } from "react";
import { VscChevronRight } from "react-icons/vsc";
import { Link, useLocation } from "react-router-dom";

export const Breadcrumbs = () => {
    const location = useLocation();
    const [pathHistory, setPathHistory] = useState([location.pathname]);
  
    useEffect(() => {
      if (location.pathname === '/') {
        setPathHistory([location.pathname]);
      } else {
        setPathHistory((prevHistory) => {
          const lastPath = prevHistory[prevHistory.length - 1];
          if (lastPath !== location.pathname) {
            return [...prevHistory, location.pathname];
          }
          return prevHistory;
        });
      }
    }, [location]);
  
    const getPathSegments = (path) => {
      const pathSegments = path.split('/').filter((segment) => segment !== '');
      return pathSegments;
    };
  
    const pathElements = pathHistory.map((path, index) => {
      const pathSegments = getPathSegments(path);
      return (
        <Fragment key={index}>
          {pathSegments.map((segment, idx) => (
            <Fragment key={idx}>
              <li>
                <Link
                  to={`/${pathSegments.slice(0, idx + 1).join('/')}`}
                  className="text-slate-600 hover:text-cyan-300 "
                >
                  {segment}
                </Link>
              </li>
              {idx < pathSegments.length - 1 && <li><span className="mx-2 text-slate-600">/</span></li>}
            </Fragment>
          ))}
        </Fragment>
      );
    });
  
    return (
      <nav className="w-full rounded-md bg-teal-50 px-5 py-3 ">
        <ol className="list-reset flex">
          <li className="flex items-center">
            <Link
              to="/"
              className="text-slate-600  hover:text-cyan-300 "
            >
              Home
            </Link>
            <span className="mx-3"> <VscChevronRight size={14}/> </span>
          </li>
       {pathElements}
        </ol>
      </nav>
    );
  };