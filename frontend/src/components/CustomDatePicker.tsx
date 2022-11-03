import { useEffect, useRef, useState } from 'react'
import { Calendar } from 'react-date-range'
import format from 'date-fns/format'

import 'react-date-range-ts/dist/styles.css'
import 'react-date-range-ts/dist/theme/default.css'

export const CustomDatePicker = () => {

  const [calendar, setCalendar] = useState(format(new Date(), 'MM/dd/yyyy'))

  const [open, setOpen] = useState(false)

  const handleSelect = (date : Date) => {
    setCalendar(format(date, 'MM/dd/yyyy'))
  }

  return (
    <div className="calendarWrap">

      <input
        value={ calendar }
        readOnly
        className="inputBox"
        onClick={ () => setOpen(open => !open) }
      />

      <div>
        {open && 
          <Calendar
            date={ new Date() }
            onChange = { handleSelect }
            className="calendarElement"
          />
        }
      </div>

    </div>
  )
}