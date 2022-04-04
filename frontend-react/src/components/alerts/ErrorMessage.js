const ErrorMessage = ({ errorMessage, setErrorMessage }) => {
  // console.log(errorMessage);
  return (
    <div className="notification is-danger container mt-5 mb-0 has-text-centered">
      <button className="delete" onClick={() => setErrorMessage(null)}></button>
      {`${errorMessage.code} - ${errorMessage.message}
    `}
    </div>
  );
};

export default ErrorMessage;
