import {connect} from "react-redux";
import { name } from '../../../config';

import ExtensionComponent from "../components/Component";
import Rx from "rxjs";
import { changeZoomLevel } from "@mapstore/actions/map";

import '../assets/style.css';
import axios from '@mapstore/libs/ajax';

export default {
    name,
    component: connect(state => ({
        value: state.sampleExtension && state.sampleExtension.value
    }), {
        onIncrease: () => {
            return {
                type: 'INCREASE_COUNTER'
            };
        }, changeZoomLevel,
        fetchData: () => {
            return {
                type: 'FETCH_DATA'
            }
        }
    })(ExtensionComponent),
    reducers: {
        sampleExtension: (state = { value: 1 }, action) => {
            if (action.type === 'INCREASE_COUNTER') {
                return { value: state.value + 1 };
            }
            return state;
        }
    },
    epics: {
        logCounterValue: (action$, store) => action$.ofType('INCREASE_COUNTER').switchMap(() => {
            /* eslint-disable */
            console.log('CURRENT VALUE: ' + store.getState().sampleExtension.value);
            /* eslint-enable */
            return Rx.Observable.empty();
        }),
        fetchData: (action$, store) => action$.ofType('FETCH_DATA').switchMap(() => {
            console.log(store.getState());
            return Rx.Observable.defer(() => axios.get("https://georchestra.mydomain.org/mapstore-reports/reports"))
                .map((response) => {
                    console.log(response)
                })
        })
    },
    containers: {
        Toolbar: {
            name: "sampleExtension",
            position: 10,
            text: "INC",
            doNotHide: true,
            action: () => {
                return {
                    type: 'INCREASE_COUNTER'
                };
            },
            priority: 1
        }
    }
};
