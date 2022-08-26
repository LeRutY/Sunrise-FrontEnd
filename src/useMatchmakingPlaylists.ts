import { useQuery } from "react-query"
import { onlyUnique } from "./onlyUnique";

export const useMatchmakingPlaylists = () => {
    return useQuery(['playlists'], async () => {
        return await (await fetch('http://localhost:8000/sunrise/online/playlists')).json()
    })
}