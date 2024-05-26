import { ResolumeAPI } from "./resolume";
import { components } from "./schema";

type Control = {
    knobs: []

}

type Composition = components["schemas"]["Composition"];
type Layer = components["schemas"]["Layer"]
type Clip = components["schemas"]["Clip"]
type ParameterCollection = components["schemas"]["ParameterCollection"]
type ParamBoolean = components["schemas"]["BooleanParameter"];

function test (e: any) {
    console.log("Works!!!", e.target.value);
}


const mapDashboard = (obj:ParameterCollection):Control => {


    return null
}

async function interactWithResolume() {

    const hostValue = "127.0.0.1";
    const portValue = 8080;
    const pathValue = "";

    const resolume: ResolumeAPI = new ResolumeAPI(hostValue, portValue, pathValue);

    let composition: Composition;
    var selectedLayer: Layer;
    var selectedClip: Clip;
    var layerDashboard: Control;
    var clipDashboard: Control;

    try {
        composition = await resolume.getComp();

    } catch (error) {
        console.log("Error connecting to Resolume:", error);
        return;
    }
    console.log("Composition is bypassed: ", composition.bypassed.value);

    // Update the whole comp  
    await resolume.updateComp(composition).catch((err) => console.log(err))

    // Add a column
    await resolume.addColumn().catch((error) => {
        console.log(`Couldn't add column: ${error}`);
    });

    await resolume.getSelectedLayer()
        .then(res => {
            selectedLayer = res
            layerDashboard = mapDashboard(selectedLayer.dashboard)
        })
        .catch(err => console.log(err))

    await resolume.getSelectedClip()
        .then(res => {
            selectedClip = res
            clipDashboard = mapDashboard(selectedClip.dashboard)
        })
        .catch(err => console.log(err))   
    
    
    
}

interactWithResolume().then(() => {
    console.log("Done!");
})
