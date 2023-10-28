import { ResolumeAPI } from "./resolume";
import { components } from "./schema";

type Composition = components["schemas"]["Composition"];
type Layer = components["schemas"]["Layer"]
type Clip = components["schemas"]["Clip"]


async function interactWithResolume() {

    const hostValue = "127.0.0.1";
    const portValue = 8080;
    const pathValue = "/path/to/local/files";

    const resolume: ResolumeAPI = new ResolumeAPI(hostValue, portValue, pathValue);

    let composition: Composition;
    var layer: Layer;

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

    const layerIndex = 2;
    const columnIndex = 1;

    await resolume.connectClipByIndex(layerIndex, columnIndex).then(res => console.log(res.status)).catch(e => console.log(e))

    await resolume.getSelectedLayer().then(res => layer = res).catch(err => console.log(err))

    layer.clips.forEach((clip: Clip) => {
        if (clip.name.value != '') console.log(clip.name.value);
        
    })

}

interactWithResolume().then(() => {
    console.log("Done!");
})
