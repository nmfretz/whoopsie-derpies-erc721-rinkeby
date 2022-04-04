const RinkebyWarning = () => {
  return (
    <div className="notification is-danger has-text-centered mb-0">
      WARNING: You are connected to a network that <strong>is not</strong> Rinkeby. Change your network in MetaMask to
      avoid doing something derpie!
    </div>
  );
};

export default RinkebyWarning;
