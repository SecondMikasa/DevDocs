import { parseAsString, useQueryState } from "nuqs"

//Using useState
//const[x, setX] = useState("")
//Nuqs is useState but for Search Query strings i.e.
//const [urlX, setUrlX] = useQueryState("")

export function useSearchParams(key: string) {
    return useQueryState(
        // key can be hardcoded to be search, as using it only once in this project
        key,
        parseAsString
            // By default, every search param will start out as a empty string
            .withDefault("")
            // If search param value returns a falsy it will be cleared
            .withOptions({ clearOnDefault: true })
    )
}