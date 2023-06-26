
// import { Fragment } from "react";
// import {  Route } from "react-router-dom";
// import { Navigate } from "react-router-dom";

import { Navigate } from "react-router-dom";

// const ProtectedRoute = ({  element: Component, ...rest }) => {
 
//   let token =localStorage.getItem("token")

//   return (
//     <Fragment>
     
//         <Route
//           {...rest}
//           render={(props) => {
//             if (token) {
//               return <Navigate to="/signin" />;
//             }

          

//             return <Component {...props} />;
//           }}
//         />
      
//     </Fragment>
//   );
// };

// export default ProtectedRoute;
export const ProtectedRoute = ({ children }) => {
  let token =localStorage.getItem("token")
  if (!token) {
    // user is not authenticated
    return <Navigate to="/signin" />;
  }
  return children;
};
export default ProtectedRoute;
