import {loadedSchemas, loadError} from "../actions/actions";
import {layersSelector} from 'mapstore2/web/client/selectors/layers'
import * as MapInfoUtils from 'mapstore2/web/client/utils/MapInfoUtils'
import {extensionComponent} from '../plugins/Extension.jsx'
import {
    updateNode
} from 'mapstore2/web/client/actions/layers'
import Rx from "rxjs";


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

export default {fetchSchemasEpic, displayFormEpic}