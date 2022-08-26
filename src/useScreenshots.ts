import { useQuery } from "react-query"

export const useScreenshots = (xuid: string) => {
    return useQuery(['screenshots' + xuid], async () => {
        return await (await fetch(`http://82.28.169.101:8000/sunrise/player/${xuid}/screenshots`)).json()
    })
}