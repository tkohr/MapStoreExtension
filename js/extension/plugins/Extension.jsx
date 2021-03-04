import {connect} from "react-redux";
import { name } from '../../../config';

import ExtensionComponent from "../components/Component";
import Rx from "rxjs";
import { fetchSchemas, loadedSchemas, loadError, displayForm } from "./actions"

import '../assets/style.css';
import axios from '@mapstore/libs/ajax';

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
            console.log(action);
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
                .switchMap((response) => Rx.Observable.of(loadedSchemas(/*response.data*/mockSchemas)))
                .catch(e => Rx.Observable.of(loadError(e.message)));
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
