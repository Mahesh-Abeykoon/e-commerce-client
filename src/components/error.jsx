import PropTypes from 'prop-types';
const Error = ({ error }) => {
    return (
      <div>
        <h1>Error</h1>
        <p>{error.message}</p>
      </div>
    );
  };

  Error.propTypes = {
    error: PropTypes.string.isRequired,
  };
  
  export default Error;