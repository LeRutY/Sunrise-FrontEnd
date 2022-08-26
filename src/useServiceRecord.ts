import { useQuery } from "react-query"

export const useServiceRecord = (xuid: string) => {
    return useQuery(['servicerecord' + xuid], async () => {
        return await (await fetch(`http://82.28.169.101:8000/sunrise/player/${xuid}/servicerecord`)).json()
    })
}