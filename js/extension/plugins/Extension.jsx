import {connect} from "react-redux";
import { name } from '../../../config';

import ExtensionComponent from "../components/Component";
import Rx from "rxjs";
import { fetchSchemas, loadedSchemas, loadError, displayForm } from "./actions"

import '../assets/style.css';
import axios from '@mapstore/libs/ajax';
import {
    updateNode,
    updateSettingsParams
} from 'mapstore2/web/client/actions/layers'
import {layersSelector} from 'mapstore2/web/client/selectors/layers'
import ReportIdentifyViewer from '@js/extension/components/ReportIdentifyViewer'
import * as MapInfoUtils from 'mapstore2/web/client/utils/MapInfoUtils'

const mockSchemas = [{
    title: "Todo",
    type: "object",
    required: ["title"],
    properties: {
      title: {type: "string", title: "Title", default: "A new task"},
      done: {type: "boolean", title: "Done?", default: false}
    }
}]

export default {
    name,
    component: connect(state => ({
        schemas: state.reportExtension && state.reportExtension.schemas,
        display: state.reportExtension && state.reportExtension.display
    }), {
        fetchSchemas,
        loadedSchemas,
        loadError,
        displayForm
    })(ExtensionComponent),
    reducers: {
        reportExtension: (state = { schemas: [{}], display: false, error: '' }, action) => {
            switch (action.type) {
                case 'LOADED_SCHEMAS':
                    return {...
                        state,
                        schemas: action.payload
                    };
                case 'LOAD_ERROR':
                    return {...
                        state,
                        error: action.error
                    };
                case 'DISPLAY_FORM':
                    return {...
                        state,
                        display: !state.display
                    };
                default:
                    return state;
            }
        }
    },
    epics: {
        fetchSchemas: (action$, store) => action$.ofType('FETCH_SCHEMAS').switchMap(() => {
            //TODO: make axios work with our API (fetch does) and use API
            return Rx.Observable.defer(() => axios.get("https://georchestra.mydomain.org/mapstore-reports/reports"))
                .switchMap((response) => {
                    console.log('axios', response)
                    return Rx.Observable.of(loadedSchemas(/*response.data*/mockSchemas))
                })
                .catch(e => Rx.Observable.of(loadError(e.message)));
        }),
        displayForm: (action$, store) => action$.ofType('DISPLAY_FORM').mergeMap(() => {
            MapInfoUtils.setViewer('reportViewer', ReportIdentifyViewer)
            const layers = layersSelector(store.getState())
            console.log(store);
            console.log(layers);
            return Rx.Observable.of(...layers.filter( layer => layer.type === 'wms').map( layer => updateNode(layer.id, 'layers', {featureInfo: {
                    format: "PROPERTIES",
                    viewer: {
                        type: 'reportViewer'
                    }
                }})))
        })
    },
    containers: {
        Toolbar: {
            name: "reportExtension",
            position: 10,
            text: "Report",
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
