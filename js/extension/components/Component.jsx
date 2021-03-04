import React, { useEffect } from "react";
import Form from "@rjsf/core";

const log = (type) => console.log.bind(console, type);

const Extension = ({ schemas = [{}], display = false, fetchSchemas }) => {
  useEffect(() => {
    fetchSchemas();
  }, [])

  return (
    <div>
      {display && <div id="REPORT_EXTENSION">
        {/* TODOs: 
          - allow to choose schema of the ones available for the layer
          - insert data into form if already existing for the feature (fetching via epic when clicking on feature?)
        */}
        <Form schema={schemas[0]}
          onChange={log("changed")}
          onSubmit={log("submitted")}
          onError={log("errors")} />
      </div>}
    </div>);
};

export default Extension;
