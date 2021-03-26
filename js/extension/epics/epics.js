import {loadedSchemas, loadError} from "../actions/actions";
import {layersSelector} from 'mapstore2/web/client/selectors/layers'
import * as MapInfoUtils from 'mapstore2/web/client/utils/MapInfoUtils'
import {extensionComponent} from '../plugins/Extension.jsx'
import { updateNode } from 'mapstore2/web/client/actions/layers'
import { updateFeatureInfoClickPoint } from "@mapstore/actions/mapInfo"
import Rx from "rxjs";

import { mockSchemas } from "../plugins/mockSchemas";
import '../assets/style.css';
import axios from '@mapstore/libs/ajax';


export const fetchSchemasEpic = (action$, store) => action$.ofType('FETCH_SCHEMAS').switchMap(() => {
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

    });

export const   displayFormEpic = (action$, store) => action$.ofType('DISPLAY_FORM').mergeMap(() => {
        
        
        // no featureInfo = identify mode
        const display = store.getState().reportExtension.display;
        const featureInfo = (display) ? {
            format: "PROPERTIES",
            viewer: {
                type: 'reportViewer'
            }
        } : undefined;

        const layers = layersSelector(store.getState())
        const viewerObservable = Rx.Observable.of(
            ...layers.filter( layer => layer.type === 'wms').map( layer => 
                updateNode(
                    layer.id, 
                    'layers', 
                    { featureInfo: featureInfo }
                )
            )
        );

        // if featureInfo or report is already displayed, force viewer refresh by simulating click 
        const clickPoint = store.getState().mapInfo.clickPoint;
        if (clickPoint) {
            return Rx.Observable.merge(
                viewerObservable,
                Rx.Observable.of(updateFeatureInfoClickPoint(clickPoint))
            );
        }
        else {
            return viewerObservable;
        }
    })

export default {fetchSchemasEpic, displayFormEpic}