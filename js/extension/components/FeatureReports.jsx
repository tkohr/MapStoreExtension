import React from "react";
import Select from 'react-select';
import Form from "@rjsf/core";

const log = (type) => console.log.bind(console, type);

class FeatureReports extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedSchema: undefined,
        };
    }

    selectSchema(schema) {
        this.setState({selectedSchema: schema})   
    }

    render() {
        const { selectedSchema } = this.state;

        return (<div>
            <div>{this.props.feature.id}</div>
            <div id="MODEL_SELECT">
                <p>Modèles de rapport</p>
                <Select options={
                    this.props.schemasByLayers.map(schemaByLayer => {
                        const option = {
                            value: schemaByLayer,
                            label: schemaByLayer.title
                        }
                        return option;
                    }
                    )}
                    onChange={(e) => {
                        this.selectSchema(e.value)
                    }}
                />
            </div>
            {selectedSchema && <Form schema={selectedSchema}
            onChange={log("changed")}
            onSubmit={log("submitted")}
            onError={log("errors")} />
            }
        </div>)
    }
}

export default FeatureReports;
