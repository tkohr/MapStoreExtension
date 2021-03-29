import React from "react";
import Select from 'react-select';
import Form from "@rjsf/core";
import PropTypes from 'prop-types';

import InfoButton from "@mapstore/components/buttons/InfoButton";

const log = (type) => console.log.bind(console, type);

class FeatureReports extends React.Component {
    static propTypes = {
        feature: PropTypes.object,
        schemasByLayers: PropTypes.object
    };

    constructor(props) {
        super(props);

        this.state = {
            selectedSchema: undefined
        };
    }

    render() {
        const { selectedSchema } = this.state;

        return (<div>
            <div>{this.props.feature.id}</div>
            <InfoButton glyphicon="info-sign" text="" title="Feature description" body={this.featureToString(this.props.feature)}/>
            <div id="MODEL_SELECT">
                <p>Modèles de rapport</p>
                <Select options={
                    this.props.schemasByLayers.map(schemaByLayer => {
                        const option = {
                            value: schemaByLayer,
                            label: schemaByLayer.title
                        };
                        return option;
                    }
                    )}
                onChange={(e) => {
                    this.selectSchema(e.value);
                }}
                />
            </div>
            {selectedSchema && <Form schema={selectedSchema}
                onChange={log("changed")}
                onSubmit={log("submitted")}
                onError={log("errors")} />
            }
        </div>);
    }

    featureToString(feature) {
        return JSON.stringify({feature}, null, "4");
    }

    selectSchema(schema) {
        this.setState({selectedSchema: schema});
    }
}

export default FeatureReports;
