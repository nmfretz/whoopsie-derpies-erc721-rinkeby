import DerpieCard from "../derpieCard/DerpieCard";

const UserDerpies = ({ userDerpieDetails }) => {
  return (
    <>
      <div className="is-flex is-justify-content-center is-flex-wrap-wrap custom-gallery-gap">
        {userDerpieDetails.map((derpie, index) => (
          <DerpieCard key={index} derpieDetails={derpie} />
        ))}
      </div>
    </>
  );
};

export default UserDerpies;
