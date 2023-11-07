import React, { useState } from "react";

const CreateLink = () => {
  const [formState, setFormState] = useState({
    description: "",
    url: "",
  });
  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="flex flex-colum mt-3">
          <input
            className="mb-2"
            value={formState.description}
            onChange={(e) =>
              setFormState({ ...formState, description: e.target.value })
            }
            type="text"
            placeholder="A description for the link"
          />
          <input
            className="mb-2"
            value={formState.url}
            onChange={(e) =>
              setFormState({ ...formState, url: e.target.value })
            }
            type="text"
            placeholder="The URL for the link"
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreateLink;
