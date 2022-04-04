const DerpieAttribute = ({ derpieDetails, traitNum }) => {
  return (
    <div className="custom-attribute">
      <span className="custom-attribute__trait">{derpieDetails.uriJSON.attributes[traitNum].trait_type}</span>
      <span className="custom-attribute__value">{derpieDetails.uriJSON.attributes[traitNum].value}</span>
    </div>
  );
};

export default DerpieAttribute;
