import { ResolumeAPI } from "./resolume";
import { components } from "./schema";

type Control = {
    knobs: []

}

type Composition = components["schemas"]["Composition"];
type Layer = components["schemas"]["Layer"]
type Clip = components["schemas"]["Clip"]
type ParameterCollection = components["schemas"]["ParameterCollection"]

const mapDashboard = (obj:ParameterCollection):Control => {
    // console.log("DASHBOARD",obj);

    // for (let key in obj) {
    //     console.log(obj[key]);
    //     if (obj[key].view.alternative_name != null)
        
    // }
    
    
    for (let i=0; i<8; i++) {

        let alt_name:string = obj[`Link ${i}`].view.alternative_name
        let value = obj[`Link ${i}`].value

        obj[alt_name] = obj[`Link ${i}`]
        console.log(obj[`Link ${i}`]);
        
    }

    return null
}

async function interactWithResolume() {

    const hostValue = "127.0.0.1";
    const portValue = 8080;
    const pathValue = "/path/to/local/files";

    const resolume: ResolumeAPI = new ResolumeAPI(hostValue, portValue, pathValue);

    let composition: Composition;
    var selectedLayer: Layer;
    var selectedClip: Clip;
    var layerDashboard: Control;
    var clipDashboard: Control;

    try {
        composition = await resolume.getComposition();
    } catch (error) {
        console.log("Error connecting to Resolume:", error);
        return;
    }
    console.log("Composition is", composition);

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
