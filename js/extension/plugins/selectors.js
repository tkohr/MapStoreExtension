import { responsesSelector } from '@mapstore/selectors/mapInfo';
import { createSelector } from "reselect";

const schemaSelector = state => state.reportExtension && state.reportExtension.schemas || [];

const responsesWithFeaturesSelector = createSelector(
  responsesSelector,
  responses => responses.filter((response) => {
      if (response && response.layer && response.response !== "no features were found\n") {
          return response;
      }
  })
)

export const schemasByLayersSelector = createSelector(
  schemaSelector,
  responsesWithFeaturesSelector,
  (schemas, responses) => schemas.filter(schema => {
    let occurs = false;
    responses.forEach((response) => {
      if (schema.layer_id === response.layer.id) {
        occurs = true;
      }
    });
    return occurs;
  })
)