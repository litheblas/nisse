import { isRouteErrorResponse, useRouteError } from 'react-router-dom';

// Mostly copied from https://reactrouter.com/en/main/utils/is-route-error-response
export const RouteErrorPage = () => {
  const error = useRouteError();
  console.log(error);

  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <h2>{error.status} {error.statusText}</h2>
      </div>
    );
  } else {
    return (
      <div>
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
      </div>
    );
  }
}
