import { useQuery } from "react-query"

export const useScreenshots = (xuid: string) => {
    return useQuery(['screenshots' + xuid], async () => {
        return await (await fetch(`http://localhost:8000/sunrise/player/${xuid}/screenshots`)).json()
    })
}