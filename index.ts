import { ResolumeAPI } from "./resolume";
import { components } from "./schema";

type Composition = components["schemas"]["Composition"];

async function interactWithResolume() {

    const hostValue = "127.0.0.1";
    const portValue = 8080;
    const pathValue = "/path/to/local/files";

    const resolume: ResolumeAPI = new ResolumeAPI(hostValue, portValue, pathValue);

    let composition: Composition;
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

    // await resolume.selectClipByIndex(
    //     layerIndex,
    //     columnIndex
    // ).then((response) => {
    //     console.log(response.status)
    // })

    // await resolume.connectSelectedClip()
    // .then((response) => console.log(response.status))
    // .catch((error) => {
    //     console.log(` ${error}`);
    // })

    


}

interactWithResolume().then(() => {
    console.log("Done!");
})
