import {connect} from "react-redux";
import { name } from '../../../config';

import ExtensionComponent from "../components/Component";
import { fetchSchemas, loadedSchemas, loadError, displayForm, selectSchema } from "../actions/actions";
import reportExtension from "../reducers/reducers"
import {fetchSchemasEpic, displayFormEpic} from '../epics/epics'
import { schemasByLayersSelector } from "./selectors";
import { currentFeatureSelector } from '@mapstore/selectors/mapInfo';
import '../assets/style.css';


export const extensionComponent = connect(state => ({
    schemas: state.reportExtension && state.reportExtension.schemas,
    display: state.reportExtension && state.reportExtension.display,
    schemasByLayers: schemasByLayersSelector(state),
    selectedSchema: state.reportExtension && state.reportExtension.selectedSchema,
    currentFeatures: currentFeatureSelector(state)
}), {
    fetchSchemas,
    loadedSchemas,
    loadError,
    displayForm,
    selectSchema
})(ExtensionComponent);

export default {
    name,
    component: extensionComponent,
    reducers: {reportExtension},
    epics: {
        fetchSchemasEpic,
        displayFormEpic
    },
    containers: {
        Toolbar: {
            name: "reportExtension",
            position: 10,
            text: "Rapport",
            doNotHide: true,
            action: () => {
                return {
                    type: 'DISPLAY_FORM'
                };
            },
            selector: (state) => ({
                bsStyle: state.reportExtension && state.reportExtension.display ? "success" : "primary",
                active: !!(state.reportExtension && state.reportExtension.display)
            }),
            priority: 1
        }
    }
};
