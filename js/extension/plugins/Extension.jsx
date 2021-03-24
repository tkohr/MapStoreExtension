import {connect} from "react-redux";
import { name } from '../../../config';

import ExtensionComponent from "../components/Component";
import Rx from "rxjs";
import { fetchSchemas, loadedSchemas, loadError, displayForm, selectSchema } from "../actions/actions";
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
    selectSchema
})(ExtensionComponent);

export default {
    name,
    component: extensionComponent,
    reducers: {reportExtension},
    epics: {
        fetchSchemas: (action$, store) => action$.ofType('FETCH_SCHEMAS').switchMap(() => {
            //TODO: make axios work with our API (fetch does) and use API
            return Rx.Observable.defer(() => axios.get("https://georchestra.mydomain.org/mapstore-reports/reports"))
                .switchMap((response) => Rx.Observable.of(loadedSchemas(/*response.data*/mockSchemas)))
                .catch(e => Rx.Observable.of(loadError(e.message)));

            // //get data from API response (in dev)
            // return Rx.Observable.fromPromise(
            //         fetch('http://localhost:8080/report_models')
            //             .then(response => response.json())
            //     )
            //     .switchMap((response) => {
            //         return Rx.Observable.of(loadedSchemas(response))
            //     })
            //     .catch(e => Rx.Observable.of(loadError(e.message)));
  
        }),
        displayForm: (action$, store) => action$.ofType('DISPLAY_FORM').mergeMap(() => {
            MapInfoUtils.setViewer('reportViewer', extensionComponent)
            const layers = layersSelector(store.getState())
            console.log(store);
            console.log(layers);
            return Rx.Observable.of(...layers.filter( layer => layer.type === 'wms').map( layer => 
                updateNode(
                    layer.id, 
                    'layers', 
                    {
                        featureInfo: {
                            format: "PROPERTIES",
                            viewer: {
                                type: 'reportViewer'
                            }
                    }}
                )
            ))
        })
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
            priority: 1
        }
    }
};
