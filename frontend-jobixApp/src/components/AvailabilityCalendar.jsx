import { addDays, isSameDay } from 'date-fns';
import React, { useEffect, useState } from 'react'
import "../styles/AvailabilityCalendar.css"
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { DateRange } from 'react-date-range';

export const AvailabilityCalendar = ({productId , dateRange, setDateRange , onRangeSelect}) => {


    
    const [unavailabledDates, setUnavailabledDates] = useState([]);

    const [error, setError] = useState(null);

    
    useEffect(() => {
    fetch(`http://localhost:8080/api/reservations/product/${productId}/availability`, {credentials:"include"})
     .then(res =>{
        if(!res.ok) throw new Error("No se pudieron cargar las fechas");
        return res.json();
     })
     .then(data => {
        // convertir string a objetos Date sin desfase horario
        const parseDates = data.map(dateStr => {
            const [year, month, day] = dateStr.split("-").map(Number);
            return new Date(year, month - 1, day); // mes empieza en 0
            //lo anterior era por un problema de zona horario, por lo que tocó convertir la cadena manualmente a objeto Date en hora local del navegador, ya que pasaba de UTC A UTC-5, la cual corresponde a colombia y se restaba un día.
          });
          setUnavailabledDates(parseDates);
          setError(null);
     })
     .catch(err =>{
        console.error("Error", err);
        setError("No se pudo obtener la disponibilidad. Intente más tarde.")
     })
    }, [productId]);

    //desabilitamos fechas ocupadas
    const isDateDisabled = (date)=>{
        return unavailabledDates.some(d=> isSameDay(d, date));

    }

    //emitir rango al padre cuando cambia
    const handleRangeChange = (item) =>{
        setDateRange([item.selection]);

        if (onRangeSelect) {
            onRangeSelect({
                startDate: item.selection.startDate,
                endDate: item.selection.endDate
            });
        }
    }

  return (
    <div className='availability-container'>
        <h3>Selecciona un rango de fechas</h3>
       

        {error && <p className='error-msg'>{error}</p>}

        <DateRange 
        editableDateInputs = {true}
        onChange={handleRangeChange}
        moveRangeOnFirstSelection={false}
        ranges={dateRange}
        minDate={new Date()}
        disabledDay={isDateDisabled}
        dayContentRenderer={(date) => {
            const isUnavailable = isDateDisabled(date);
            return (
                <div style={{color: isUnavailable ? "red" : undefined}}>
                    {date.getDate()}
                </div>
            )
        }} 
        />
    </div>
  )
}
