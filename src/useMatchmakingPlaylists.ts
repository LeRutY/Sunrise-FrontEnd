import { useQuery } from "react-query"
import { onlyUnique } from "./onlyUnique";

export const useMatchmakingPlaylists = () => {
    return useQuery(['playlists'], async () => {
        const hopperTable = await (await fetch('http://localhost:8000/storage/title/tracked/12070/default_hoppers/matchmaking_hopper_011.json')).json()

        const hopperDescriptions = await (await fetch('http://localhost:8000/storage/title/tracked/12070/default_hoppers/en/matchmaking_hopper_descriptions_003.json')).json();
        // console.log({hopperDescriptions});

        await Promise.all(hopperTable.mhcf.configurations.map(async (configuration: any) => {
            hopperTable[configuration.identifier] = await (await fetch(`http://localhost:8000/storage/title/tracked/12070/default_hoppers/00${configuration.identifier}/game_set_006.json`)).json();
            
            const gameVariantFileNames = hopperTable[configuration.identifier].gset.gameEntries.map((gameEntry: any) => gameEntry.gameVariantFileName).filter(onlyUnique);
            const mapVariantFileNames = hopperTable[configuration.identifier].gset.gameEntries.map((gameEntry: any) => gameEntry.mapVariantFileName).filter(onlyUnique);


            const gametypesPromise = Promise.all(gameVariantFileNames.map(async (gameVariantFileName: any) => {
                hopperTable[configuration.identifier][gameVariantFileName] = await (await fetch(`http://localhost:8000/storage/title/tracked/12070/default_hoppers/00${configuration.identifier}/${gameVariantFileName}_010.json`)).json();
            }));

            const mapsPromise = Promise.all(mapVariantFileNames.map(async (mapVariantFileName: any) => {
                hopperTable[configuration.identifier][mapVariantFileName] = await (await fetch(`http://localhost:8000/storage/title/tracked/12070/default_hoppers/00${configuration.identifier}/map_variants/${mapVariantFileName}_012.json`)).json();
            }));

            await Promise.all([gametypesPromise, mapsPromise]);
        }));

        hopperDescriptions.mhdf.descriptions.forEach((description: any) => {
            if (hopperTable[description.identifier])
                hopperTable[description.identifier].description = description.description;
        })

        return hopperTable;
    })
}