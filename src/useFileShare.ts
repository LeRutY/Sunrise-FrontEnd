import { useQuery } from "react-query"

export const useFileShare = (xuid: string) => {
    return useQuery(['fileshare' + xuid], async () => {
        return await (await fetch(`http://82.28.169.101:8000/sunrise/player/${xuid}/fileshare`)).json()
    })
}