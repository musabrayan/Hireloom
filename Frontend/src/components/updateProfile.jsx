import React from 'react';

const UpdateProfile = ({ open, setOpen }) => {
  if (!open) return null;
  
  return (
    <div>
      {/* Your update profile content here */}
      <button onClick={() => setOpen(false)}>Close</button>
    </div>
  );
};

export default UpdateProfile;