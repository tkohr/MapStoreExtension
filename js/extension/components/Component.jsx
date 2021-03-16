import React, { useEffect } from "react";
import Select from 'react-select';
import Form from "@rjsf/core";

const log = (type) => console.log.bind(console, type);

const Extension = ({ display, schemasByLayers, selectedSchema, fetchSchemas, selectSchema }) => {
  useEffect(() => {
    fetchSchemas();
  }, [])

  /* TODOs: 
    - allow to choose schema of the ones available for the layer(s) => done
    - decide which feature is selected (not in store) or select it when editing report (templates complicate acces to feature id)
    - insert "formData" into form if already existing for the feature (fetching via epic when clicking on feature?)
  */
  return (
    <div>
      {display && <div id="REPORT_EXTENSION">
        <div id="MODEL_SELECT">
          <p>Modèles de rapport</p>
          <Select options={
            schemasByLayers.map(schemaByLayer => 
              {
                const option = {
                  value: schemaByLayer,
                  label: schemaByLayer.title
                }
                return option;
              }
            )}
            onChange={selectSchema} />
        </div>
        {selectedSchema && <Form schema={selectedSchema}
          onChange={log("changed")}
          onSubmit={log("submitted")}
          onError={log("errors")} />
        }
      </div>}
    </div>);
};

export default Extension;
