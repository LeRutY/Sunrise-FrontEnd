import './App.css';
import { onlyUnique } from './onlyUnique';
import { useMatchmakingPlaylists } from './useMatchmakingPlaylists';

function sanitizeDescription(description: string) {
  return (description ?? '')
    .replace('<color argb=#FF8692d4>', '')
    .replace('</color>', '')
    .replace('|r|n','\r\n')
    .replace('|r|n','\r\n')
    .replace('|r|n','\r\n');
}

function Playlists() {
  const playlistsQuery = useMatchmakingPlaylists();
  return (
    <>
      <h1>Matchmaking Playlists</h1>
      {playlistsQuery.isLoading 
        ? <i>Loading...</i> 
        : playlistsQuery.data.map((category: any) => {            
            return <div>
              <h2>{category.name}</h2>
              <pre>{sanitizeDescription(category.description)}</pre>
              {category.hoppers.map((hopper: any) => {
                const gameVariants = hopper.gameEntries.map((gameEntry: any) => gameEntry.gameVariant.metadata.name).filter(onlyUnique);
                const mapVariants = hopper.gameEntries.map((gameEntry: any) => gameEntry.mapVariant.metadata.name).filter(onlyUnique);


                return (<>
                    <h3>{hopper.name}</h3>
                    <pre>{sanitizeDescription(hopper.description)}</pre>
                    <h4>Gametypes</h4>
                    <ul>
                      {gameVariants.map((gameVariantName: any) => {
                        const gameVariant = hopper.gameEntries.filter((gameEntry: any) => gameEntry.gameVariant.metadata.name === gameVariantName)[0].gameVariant;
                        return (
                          <>
                            <li>{gameVariant.metadata.name}</li>
                            <pre>{gameVariant.metadata.description}</pre>
                          </>
                        )
                      })}
                    </ul>
                    <h4>Maps</h4>
                    <ul>
                      {mapVariants.map((mapVariantName: any) => {
                        const mapVariant = hopper.gameEntries.filter((gameEntry: any) => gameEntry.mapVariant.metadata.name === mapVariantName)[0].mapVariant;
                        return (
                          <>
                            <li>{mapVariant.metadata.name}</li>
                            <pre>{mapVariant.metadata.description}</pre>
                          </>
                        )
                      })}
                    </ul>
                  </>
                )
              })}
            </div>
      })}
    </>
  );
}

export default Playlists;
