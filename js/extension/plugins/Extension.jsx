import {connect} from "react-redux";
import { name } from '../../../config';

import ExtensionComponent from "../components/Component";
import Rx from "rxjs";
import { fetchSchemas, loadedSchemas, loadError, displayForm, selectSchema, addReportViewer } from "../actions/actions";
import reportExtension from "../reducers/reducers"
import {fetchSchemasEpic, displayFormEpic} from '../epics/epics'
import { schemasByLayersSelector } from "./selectors";
import { currentFeatureSelector } from '@mapstore/selectors/mapInfo';
import { mockSchemas } from "./mockSchemas";
import '../assets/style.css';
import axios from '@mapstore/libs/ajax';
import {get} from 'lodash';
import {
    updateNode,
    updateSettingsParams
} from 'mapstore2/web/client/actions/layers'
import {layersSelector} from 'mapstore2/web/client/selectors/layers'
import * as MapInfoUtils from 'mapstore2/web/client/utils/MapInfoUtils'


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
    selectSchema,
    addReportViewer
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
