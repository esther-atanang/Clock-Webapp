import { useEffect } from "react"

export function useQuotes({setQuotes}){
    useEffect(() => {
        console.log("running")
        const API_URL = "https://quotes-api-self.vercel.app/quote"
        const controller = new AbortController()
        const fetchQuote = async () => {
          try {
            let response = await fetch(API_URL, { signal: controller.signal })
            if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`)
            let data = await response.json()
            setQuotes(data)
          } catch (err) {
            console.log(err)
          }
        }
        fetchQuote()
        return () => {
          controller.abort("cleaning up the hook")
        }
      }, [])
}