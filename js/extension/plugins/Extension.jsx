import {connect} from "react-redux";
import { name } from '../../../config';

import ExtensionComponent from "../components/Component";
import Rx from "rxjs";
import { fetchSchemas, loadedSchemas, loadError, displayForm, selectSchema } from "./actions";
import { schemasByLayersSelector } from "./selectors";
import { mockSchemas } from "./mockSchemas";
import '../assets/style.css';
import axios from '@mapstore/libs/ajax';
import {get} from 'lodash';

export default {
    name,
    component: connect(state => ({
        schemas: state.reportExtension && state.reportExtension.schemas,
        display: state.reportExtension && state.reportExtension.display,
        schemasByLayers: schemasByLayersSelector(state),
        selectedSchema: state.reportExtension && state.reportExtension.selectedSchema,
    }), {
        fetchSchemas,
        loadedSchemas,
        loadError,
        displayForm,
        selectSchema
    })(ExtensionComponent),
    reducers: {
        reportExtension: (state = { schemas: [{}], selectedSchema: undefined, display: false, error: '' }, action) => {
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
                case 'SELECT_SCHEMA':
                    return {...
                        state,
                        selectedSchema: action.payload.value
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
