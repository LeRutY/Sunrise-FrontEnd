import './App.css';
import { onlyUnique } from './onlyUnique';
import { useMatchmakingPlaylists } from './useMatchmakingPlaylists';

function App() {
  const playlistsQuery = useMatchmakingPlaylists();
  console.log(playlistsQuery);
  return (
    <>
      <h1>Matchmaking Playlists</h1>
      {playlistsQuery.isLoading 
        ? <i>Loading...</i> 
        : playlistsQuery.data.mhcf.configurations.map((configuration: any) => {
            const gset = playlistsQuery.data[configuration.identifier].gset;
            
            return <div>
              <h2>{configuration.name}</h2>
              <p>{playlistsQuery.data[configuration.identifier].description}</p>
              <h3>Gametypes</h3>
              <ul>
                {gset.gameEntries.map((entry: any) => entry.gameVariantFileName).filter(onlyUnique).map((gameVariantFileName: any) => {
                  const gametype = playlistsQuery.data[configuration.identifier][gameVariantFileName];
                  return <>
                    <li>{Object.values<any>(gametype.gvar)[0].metadata.name}</li>
                    <p>{Object.values<any>(gametype.gvar)[0].metadata.description}</p>
                  </>
                })}
              </ul>
              <h3>Maps</h3>
              <ul>
                {gset.gameEntries.map((entry: any) => entry.mapVariantFileName).filter(onlyUnique).map((mapVariantFileName: any) => {
                  const gametype = playlistsQuery.data[configuration.identifier][mapVariantFileName];
                  return <>
                    <li>{gametype.mvar.metadata.name}</li>
                    <p>{gametype.mvar.metadata.description}</p>
                  </>
                })}
              </ul>
            </div>
      })}
    </>
  );
}

export default App;
