import React from "react";
import ShelterDetailsModal from "../../shelter/ShelterDetailsModal";

const ManagedShelter = ({ shelter }) => {
  return (
    <div>
      <div>ManagedShelter</div>
      <ShelterDetailsModal
        shelter={shelter}
        updateContactInfoMode
        // onShelterWasUpdated={() => fetchShelters()}
      />
    </div>
  );
};

export default ManagedShelter;
