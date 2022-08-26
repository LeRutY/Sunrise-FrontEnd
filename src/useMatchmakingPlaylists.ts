import { useQuery } from "react-query"
import { onlyUnique } from "./onlyUnique";

export const useMatchmakingPlaylists = () => {
    return useQuery(['playlists'], async () => {
        return await (await fetch('http://82.28.169.101:8000/sunrise/online/playlists')).json()
    })
}