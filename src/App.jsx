import './index.css'
import { useState } from 'react'
import { reload, dayIcon, arrow_down, arrow_up, nightIcon } from "./utility"
import { useQuotes } from './hooks/useQuotes';
import { useTimeZone } from './hooks/useTimeZone'
import {useSetTime} from './hooks/useSetTime';

function App() {
  //Move all of this into a custom hook.
  const [tab, setTab] = useState(false)
  const currTime = useSetTime()
  const tZone = useTimeZone()
  const [quotes, setQuotes] = useState({ quote: "The science of operations, as derived from mathematics more especially, is a science of itself, and has its own abstract truth and value.", author: "Ada Lovelace" })

  //Gets the quotes
  useQuotes({setQuotes});
  
  //fetches a new quote
  let handleGetNewQuote = async () => {
    const API_URL = "https://quotes-api-self.vercel.app/quote"
    const controller = new AbortController()
    try {
      let response = await fetch(API_URL, { signal: controller.signal })
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`)
      }
      let data = await response.json()
      setQuotes(data)
    } catch (err) {
      if (err.name == "AbortError") {
        console.log("Fetch Aborted")
      } else {
        console.log("Failed to fetch quotes", err)
      }
    } finally {
      //This will always clean up the controller
      controller.abort("cleaning")
    }
  }

  //Gets the time of the day, values can be m, a, e (morning, afternoon and evening)

  let timeOfDay = (parseInt(currTime.hours) < 12 && parseInt(currTime.hours) >= 0 ? "m" : 
                  parseInt(currTime.hours) <= 16 && parseInt(currTime.hours) >= 12 ? "a" : "e")

  return (
    <>
      <main className={`h-screen grid  before:absolute before:top-0 before:bottom-0 before:left-0 before:right-0 before:bg-black before:z-30 before:opacity-30 *:z-50 ${timeOfDay === "m" ? "bg-morning" : timeOfDay == "a" ? "bg-day" : "bg-night"} bg-no-repeat font-inter bg-center bg-cover overflow-hidden items-center`}>
        {/**THE FIRST SECTION */}
        <section className={tab ? 'move-time-up' : 'move-time-down hfull'}>
          {/**QUOTES SECTION */}
          <article className={tab ? "hide-quote" : "show-quote"} >
            <div className='grid grid-cols-quote gap-x-4 items-start'>
              <div className='flex flex-col gap-y-3 leading-6'>
                <q className='font-normal text-[0.85rem] ns:text-[1rem] md:text-[1.2rem] md:max-w-[550px] text-wrap break-words md:leading-8'>{quotes.quote}</q>
                <p className='font-extrabold text-xl'>{quotes.author}</p>
              </div>

              {/**GENERATE NEW QUOTES BUTTON */}
              <div>
                <button type="button" onClick={handleGetNewQuote} className='bg-black opacity-55 p-2 rounded-full'> <img className='w-[20px] sm:w-7 md:w-[40px]' src={reload} alt='generate a new quote Icon' /> </button>
              </div>
            </div>
          </article>

          {/**TIME SECTION*/}
          <article className={`flex flex-col gap-y-11  xl:flex-row  lg:justify-between xl:items-center sl ${tab ? "pt-0 x" : "slideOut"}`}>
            {/**CLOCK */}
            <div className='flex flex-col gap-y-2 md:gap-y-0'>

              <h2 className='text-xl text-nowrap font-light uppercase gap-x-4 tracking-widest flex'><img src={timeOfDay === "m" ? dayIcon : nightIcon} alt='' />Good {timeOfDay == "m" ? "morning" : timeOfDay == "a" ? "day" : "evening"},<span className='hidden md:inline'>it's currently</span></h2>

              <h1 className='inline font-bold leading-[1.4] '> <span className='text-[6rem] md:text-[9.5rem] xl:text-[12rem]'>{currTime.hours}:{currTime.minutes}</span> <span className='text-sm  uppercase font-light'>{tZone.tz_abrr ? tZone.tz_abrr : ""}</span></h1>

              <p className='font-medium text-xl uppercase'>in {tZone.tz ? tZone.tz[0] : "Africa"}, {tZone.tz ? tZone.tz[1] : "Lagos"}</p>
            </div>
            {/**BUTTON SECTION */}
            <div className='md:self-start lg:self-end'><button className='bg-white pointer-events-auto flex pt-1.5 pb-1.5 pl-5 pr-1.5 gap-x-4 text-btnColor uppercase h-full tracking-widest rounded-full items-center' type='button' onClick={() => setTab(value => !value)}> <p className='text-center font-bold'>{tab ? "less" : "more"}</p> <span className='bg-mainColor rounded-[100%] flex items-center justify-center w-[40px] h-[40px]'><img src={tab ? arrow_up: arrow_down} alt="see the hidden section icon" /></span></button></div>
          </article>
        </section>


        {/**TAB SECTION */}
        <section className={tab ? `bg-${timeOfDay === "m" ? "white" : "black"} backdrop-blur-sm bg-opacity-60 text-${timeOfDay === "m" ? "mainColor" : "white"} p-8 pb-0 pt-16 h-full slideIn` : "tab-down"}>
          <article className='flex flex-col lg:gap-y-8 md:grid md:gap-12 md:grid-cols-2 md:place-items-start'>
            {/**FIRST TAB*/}
            <div className='flex flex-col *:mb-8 md:pl-12  md:gap-y-4  lg:gap-y-11 md:*:mb-2'>
              <div className='flex  md:flex-col  justify-between md:gap-y-6'>
                <p className='uppercase tracking-widest text-xs font-normal text-nowrap'>current timezone</p>
                <p className='text-xl capitalize font-bold md:text-3xl lg:text-4xl '>{tZone.tz ? tZone.tz[0] : ""}/{tZone.tz ? tZone.tz[1] : ""}</p>
              </div>
              <div className='flex  md:flex-col  justify-between gap-y-6'>
                <p className='uppercase tracking-widest text-xs font-normal text-nowrap'>day of the year</p>
                <p className='text-xl capitalize font-bold md:text-3xl lg:text-4xl '>{tZone.day_of_year}</p>
              </div>
            </div>
            {/**SECOND TAB */}
            <div className=' flex flex-col md:gap-y-4 *:mb-8 lg:gap-y-11 lg:border-l lg:border-mainColor lg:pl-20 md:*:mb-2'>
              <div className='flex justify-between  md:flex-col gap-y-6' >
                <p className='uppercase tracking-widest text-xs font-normal text-nowrap'>day of a week</p>
                <p className='text-xl capitalize font-bold md:text-3xl lg:text-4xl '>{tZone.day_of_week}</p>
              </div>
              <div className='flex justify-between md:flex-col md:gap-y-6'>
                <p className='uppercase tracking-widest text-xs font-normal text-nowrap'>week number</p>
                <p className='text-xl capitalize font-bold md:text-3xl lg:text-4xl'>{tZone.week_num}</p>
              </div>
            </div>

          </article>
        </section>
      </main>
    </>
  )
}

export default App
