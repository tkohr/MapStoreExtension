import React, { useEffect } from "react";
import Select from 'react-select';
import Form from "@rjsf/core";

const log = (type) => console.log.bind(console, type);

const Extension = ({ display, schemasByLayers, selectedSchema, currentFeatures, fetchSchemas, selectSchema }) => {
  useEffect(() => {
    fetchSchemas();
  }, [])

  /* TODOs: 
    - select schemas by features
    - insert "formData" into form if already existing for the feature (fetching via epic when clicking on feature?)
  */
  return (
    <div>
      {display &&
        <div id="REPORT_EXTENSION">
          {currentFeatures &&
            currentFeatures.map(feature => {
              return <div>
                <div>{feature.id}</div>
                <div id="MODEL_SELECT">
                  <p>Modèles de rapport</p>
                  <Select options={
                    schemasByLayers.map(schemaByLayer => {
                      const option = {
                        value: {
                          schema: schemaByLayer,
                          feature_id: feature.id
                        },
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
              </div>
            })
          }
        </div>}
    </div>);
};

export default Extension;
