import { useQuery } from "react-query"

export const useServiceRecord = (xuid: string) => {
    return useQuery(['servicerecord' + xuid], async () => {
        return await (await fetch(`http://localhost:8000/sunrise/player/${xuid}/servicerecord`)).json()
    })
}