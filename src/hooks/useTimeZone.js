import { useState } from "react";
import moment_tz from 'moment-timezone'
import moment from 'moment';

export function useTimeZone(){
    const [tZone, setTZone] = useState(()=>{
        let timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
        const timeZoneAbbreviation = moment_tz.tz(timezone).format('z');
        return(
          {
            tz: timezone.split("/"),
            tz_abrr: timeZoneAbbreviation,
            day_of_week: moment().day(),
            week_num: moment().week(),
            day_of_year: moment().dayOfYear(),
          }
        )
      })
    return tZone;
}