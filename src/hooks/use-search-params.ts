import { parseAsString, useQueryState } from "nuqs"

//Using useState
//const[x, setX] = useState("")
//Nuqs is useState but for Search Query strings i.e.
//const [urlX, setUrlX] = useQueryState("")

export function useSearchParams(key: string) {
    return useQueryState(
        key,
        parseAsString
            // By default, every search param will start out as a empty string
            .withDefault("")
            // If search param value returns a falsy it will be cleared
            .withOptions({ clearOnDefault: true })
    )
}