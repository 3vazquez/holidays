// Lista completa de feriados federales de EE.UU. (2020-2030)
const holidaysUS = {
    "2020": ["2020-01-01", "2020-01-20", "2020-02-17", "2020-05-25", "2020-07-04", "2020-09-07", "2020-10-12", "2020-11-11", "2020-11-26", "2020-12-25"],
    "2021": ["2021-01-01", "2021-01-18", "2021-02-15", "2021-05-31", "2021-07-04", "2021-09-06", "2021-10-11", "2021-11-11", "2021-11-25", "2021-12-25"],
    "2022": ["2022-01-01", "2022-01-17", "2022-02-21", "2022-05-30", "2022-06-19", "2022-07-04", "2022-09-05", "2022-10-10", "2022-11-11", "2022-11-24", "2022-12-25"],
    "2023": ["2023-01-01", "2023-01-16", "2023-02-20", "2023-05-29", "2023-06-19", "2023-07-04", "2023-09-04", "2023-10-09", "2023-11-11", "2023-11-23", "2023-12-25"],
    "2024": ["2024-01-01", "2024-01-15", "2024-02-19", "2024-05-27", "2024-06-19", "2024-07-04", "2024-09-02", "2024-10-14", "2024-11-11", "2024-11-28", "2024-12-25"],
    "2025": ["2025-01-01", "2025-01-20", "2025-02-17", "2025-05-26", "2025-06-19", "2025-07-04", "2025-09-01", "2025-10-13", "2025-11-11", "2025-11-27", "2025-12-25"],
    "2026": ["2026-01-01", "2026-01-19", "2026-02-16", "2026-05-25", "2026-06-19", "2026-07-04", "2026-09-07", "2026-10-12", "2026-11-11", "2026-11-26", "2026-12-25"],
    "2027": ["2027-01-01", "2027-01-18", "2027-02-15", "2027-05-31", "2027-06-19", "2027-07-04", "2027-09-06", "2027-10-11", "2027-11-11", "2027-11-25", "2027-12-25"],
    "2028": ["2028-01-01", "2028-01-17", "2028-02-21", "2028-05-29", "2028-06-19", "2028-07-04", "2028-09-04", "2028-10-09", "2028-11-11", "2028-11-23", "2028-12-25"],
    "2029": ["2029-01-01", "2029-01-15", "2029-02-19", "2029-05-28", "2029-06-19", "2029-07-04", "2029-09-03", "2029-10-08", "2029-11-11", "2029-11-22", "2029-12-25"],
    "2030": ["2030-01-01", "2030-01-21", "2030-02-18", "2030-05-27", "2030-06-19", "2030-07-04", "2030-09-02", "2030-10-14", "2030-11-11", "2030-11-28", "2030-12-25"]
};

// Mapa de nombres de feriados
const holidayNames = {
    "01-01": "Año Nuevo",
    "01-15": "Día de Martin Luther King Jr.",
    "01-16": "Día de Martin Luther King Jr.",
    "01-17": "Día de Martin Luther King Jr.",
    "01-18": "Día de Martin Luther King Jr.",
    "01-19": "Día de Martin Luther King Jr.",
    "01-20": "Día de Martin Luther King Jr.",
    "01-21": "Día de Martin Luther King Jr.",
    "02-15": "Día de los Presidentes",
    "02-16": "Día de los Presidentes",
    "02-17": "Día de los Presidentes",
    "02-18": "Día de los Presidentes",
    "02-19": "Día de los Presidentes",
    "02-20": "Día de los Presidentes",
    "02-21": "Día de los Presidentes",
    "05-25": "Día de los Caídos",
    "05-26": "Día de los Caídos",
    "05-27": "Día de los Caídos",
    "05-28": "Día de los Caídos",
    "05-29": "Día de los Caídos",
    "05-30": "Día de los Caídos",
    "05-31": "Día de los Caídos",
    "06-19": "Juneteenth",
    "07-04": "Día de la Independencia",
    "09-01": "Día del Trabajo",
    "09-02": "Día del Trabajo",
    "09-03": "Día del Trabajo",
    "09-04": "Día del Trabajo",
    "09-05": "Día del Trabajo",
    "09-06": "Día del Trabajo",
    "09-07": "Día del Trabajo",
    "10-08": "Día de Colón",
    "10-09": "Día de Colón",
    "10-10": "Día de Colón",
    "10-11": "Día de Colón",
    "10-12": "Día de Colón",
    "10-13": "Día de Colón",
    "10-14": "Día de Colón",
    "11-11": "Día de los Veteranos",
    "11-22": "Acción de Gracias",
    "11-23": "Acción de Gracias",
    "11-24": "Acción de Gracias",
    "11-25": "Acción de Gracias",
    "11-26": "Acción de Gracias",
    "11-27": "Acción de Gracias",
    "11-28": "Acción de Gracias",
    "12-25": "Navidad"
};

function esFeriado(fechaStr) {
    const year = fechaStr.split('-')[0];
    if (holidaysUS[year]) {
        return holidaysUS[year].includes(fechaStr);
    }
    return false;
}

function getNombreFeriado(fechaStr) {
    const [year, month, day] = fechaStr.split('-');
    const key = `${month}-${day}`;
    return holidayNames[key] || "Feriado federal";
}

function esFinDeSemana(fechaStr) {
    const date = new Date(fechaStr);
    const day = date.getDay();
    return day === 0 || day === 6;
}

function getDiaNombre(fechaStr) {
    const dias = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
    const date = new Date(fechaStr);
    return dias[date.getDay()];
}

function esDiaLaborable(fechaStr) {
    return !esFinDeSemana(fechaStr) && !esFeriado(fechaStr);
}

function calcularDiaLaborable(fechaStr) {
    const isWeekend = esFinDeSemana(fechaStr);
    const isHoliday = esFeriado(fechaStr);
    const isWorkingDay = !isWeekend && !isHoliday;
    
    let reason = "Día laborable";
    if (isWeekend) reason = "Fin de semana";
    else if (isHoliday) reason = getNombreFeriado(fechaStr);
    
    return {
        date: fechaStr,
        is_working_day: isWorkingDay,
        day_name: getDiaNombre(fechaStr),
        reason: reason,
        is_weekend: isWeekend,
        is_holiday: isHoliday
    };
}

function getNextWorkingDay(fechaStr) {
    const result = calcularDiaLaborable(fechaStr);
    
    if (result.is_working_day) {
        return {
            original_date: fechaStr,
            next_working_day: fechaStr,
            days_to_add: 0,
            reason: "La fecha ya es día laborable",
            original_status: result
        };
    }
    
    let daysAdded = 1;
    let nextDate = new Date(fechaStr);
    nextDate.setDate(nextDate.getDate() + 1);
    
    while (!esDiaLaborable(nextDate.toISOString().split('T')[0])) {
        daysAdded++;
        nextDate.setDate(nextDate.getDate() + 1);
    }
    
    const nextDateStr = nextDate.toISOString().split('T')[0];
    
    return {
        original_date: fechaStr,
        next_working_day: nextDateStr,
        days_to_add: daysAdded,
        reason: `Original era ${result.is_weekend ? 'fin de semana' : 'feriado (' + result.reason + ')'}`,
        original_status: {
            is_weekend: result.is_weekend,
            is_holiday: result.is_holiday,
            reason: result.reason
        }
    };
}

function getWorkingDaysDifference(startDateStr, endDateStr) {
    let start = new Date(startDateStr);
    let end = new Date(endDateStr);
    
    if (start > end) {
        return {
            error: "La fecha inicial debe ser anterior a la fecha final",
            start_date: startDateStr,
            end_date: endDateStr
        };
    }
    
    let workingDays = 0;
    let holidaysInRange = [];
    let weekendDays = 0;
    let currentDate = new Date(start);
    
    while (currentDate <= end) {
        const currentStr = currentDate.toISOString().split('T')[0];
        
        if (esFinDeSemana(currentStr)) {
            weekendDays++;
        } else if (esFeriado(currentStr)) {
            holidaysInRange.push(currentStr);
        } else {
            workingDays++;
        }
        
        currentDate.setDate(currentDate.getDate() + 1);
    }
    
    // Agregar nombres a los feriados
    const holidaysWithNames = holidaysInRange.map(date => ({
        date: date,
        name: getNombreFeriado(date)
    }));
    
    return {
        start_date: startDateStr,
        end_date: endDateStr,
        working_days_between: workingDays,
        total_days: Math.floor((end - start) / (1000 * 60 * 60 * 24)) + 1,
        holidays_in_range: holidaysWithNames,
        weekend_days: weekendDays,
        non_working_days: holidaysInRange.length + weekendDays
    };
}

function validarFecha(fechaStr) {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(fechaStr)) {
        return { valid: false, error: "Formato inválido. Usa YYYY-MM-DD" };
    }
    const date = new Date(fechaStr);
    if (isNaN(date.getTime())) {
        return { valid: false, error: "Fecha inválida" };
    }
    return { valid: true };
}

// NUEVA FUNCIÓN: Sumar/Restar días laborables
function addWorkingDays(startDateStr, daysToAdd) {
    const result = validarFecha(startDateStr);
    if (!result.valid) return result;
    
    if (daysToAdd === 0) {
        return {
            original_date: startDateStr,
            days_to_add: 0,
            result_date: startDateStr,
            is_working_day: esDiaLaborable(startDateStr),
            details: "No se agregaron días"
        };
    }
    
    let currentDate = new Date(startDateStr);
    let workingDaysAdded = 0;
    const direction = daysToAdd > 0 ? 1 : -1;
    const absoluteDays = Math.abs(daysToAdd);
    let daysChecked = 0;
    
    // Para llevar registro de feriados y fines de semana saltados
    const skippedDates = {
        weekends: [],
        holidays: []
    };
    
    while (workingDaysAdded < absoluteDays) {
        currentDate.setDate(currentDate.getDate() + direction);
        const currentStr = currentDate.toISOString().split('T')[0];
        daysChecked++;
        
        if (esDiaLaborable(currentStr)) {
            workingDaysAdded++;
        } else {
            if (esFinDeSemana(currentStr)) {
                skippedDates.weekends.push(currentStr);
            } else if (esFeriado(currentStr)) {
                skippedDates.holidays.push({
                    date: currentStr,
                    name: getNombreFeriado(currentStr)
                });
            }
        }
    }
    
    const resultDateStr = currentDate.toISOString().split('T')[0];
    const operation = daysToAdd > 0 ? "sumar" : "restar";
    
    return {
        original_date: startDateStr,
        days_to_add: daysToAdd,
        operation: operation,
        result_date: resultDateStr,
        working_days_calculated: absoluteDays,
        total_days_advanced: daysChecked,
        is_working_day: esDiaLaborable(resultDateStr),
        skipped_weekends: skippedDates.weekends.length,
        skipped_holidays: skippedDates.holidays.length,
        details: {
            weekends_skipped: skippedDates.weekends,
            holidays_skipped: skippedDates.holidays
        },
        example_usage: `Desde ${startDateStr}, ${operation} ${Math.abs(daysToAdd)} días laborables = ${resultDateStr}`
    };
}

// FUNCIÓN ACTUALIZADA: API Handler con nueva acción
function handleAPIRequest() {
    const urlParams = new URLSearchParams(window.location.search);
    const action = urlParams.get('action') || 'check';
    
    switch(action) {
        case 'next':
            const date = urlParams.get('date');
            if (!date) {
                return { error: "Falta parámetro 'date' para action=next", usage: "?action=next&date=YYYY-MM-DD" };
            }
            const validation = validarFecha(date);
            if (!validation.valid) return validation;
            return getNextWorkingDay(date);
            
        case 'diff':
            const start = urlParams.get('start');
            const end = urlParams.get('end');
            if (!start || !end) {
                return { error: "Faltan parámetros 'start' y/o 'end'", usage: "?action=diff&start=YYYY-MM-DD&end=YYYY-MM-DD" };
            }
            const validStart = validarFecha(start);
            if (!validStart.valid) return validStart;
            const validEnd = validarFecha(end);
            if (!validEnd.valid) return validEnd;
            return getWorkingDaysDifference(start, end);
            
        case 'add_days':  // NUEVA FUNCIONALIDAD
            const addDate = urlParams.get('date');
            const daysParam = urlParams.get('days');
            
            if (!addDate || !daysParam) {
                return { 
                    error: "Faltan parámetros 'date' y/o 'days'", 
                    usage: "?action=add_days&date=YYYY-MM-DD&days=N",
                    examples: {
                        sumar_5: "?action=add_days&date=2025-07-01&days=5",
                        restar_3: "?action=add_days&date=2025-07-01&days=-3"
                    }
                };
            }
            
            const validAddDate = validarFecha(addDate);
            if (!validAddDate.valid) return validAddDate;
            
            const days = parseInt(daysParam);
            if (isNaN(days)) {
                return { error: "El parámetro 'days' debe ser un número entero", received: daysParam };
            }
            
            return addWorkingDays(addDate, days);
            
        case 'check':
        default:
            const checkDate = urlParams.get('date');
            if (!checkDate) {
                return {
                    error: "Falta parámetro 'date'",
                    available_actions: ["check", "next", "diff", "add_days"],
                    usage: {
                        check: "?date=YYYY-MM-DD",
                        next: "?action=next&date=YYYY-MM-DD",
                        diff: "?action=diff&start=YYYY-MM-DD&end=YYYY-MM-DD",
                        add_days: "?action=add_days&date=YYYY-MM-DD&days=N"
                    }
                };
            }
            const validCheck = validarFecha(checkDate);
            if (!validCheck.valid) return validCheck;
            return calcularDiaLaborable(checkDate);
    }
}

// NUEVA FUNCIÓN PARA LA DEMO: Sumar días laborables
function consultarAddDays() {
    const fecha = document.getElementById('fechaAddDays').value;
    const dias = document.getElementById('diasAddDays').value;
    
    if (!fecha) {
        document.getElementById('resultadoAddDays').innerHTML = '<p style="color:red">❌ Selecciona una fecha</p>';
        return;
    }
    
    if (!dias || isNaN(dias)) {
        document.getElementById('resultadoAddDays').innerHTML = '<p style="color:red">❌ Ingresa un número válido de días</p>';
        return;
    }
    
    const resultado = addWorkingDays(fecha, parseInt(dias));
    
    if (resultado.error) {
        document.getElementById('resultadoAddDays').innerHTML = `<div class="result-card error">❌ ${resultado.error}</div>`;
        return;
    }
    
    let holidaysHtml = '';
    if (resultado.details.holidays_skipped.length > 0) {
        holidaysHtml = '<p><strong>🎉 Feriados omitidos:</strong></p><ul>';
        resultado.details.holidays_skipped.forEach(h => {
            holidaysHtml += `<li>${h.date} - ${h.name}</li>`;
        });
        holidaysHtml += '</ul>';
    }
    
    let weekendsHtml = '';
    if (resultado.details.weekends_skipped.length > 0) {
        weekendsHtml = `<p><strong>📆 Fines de semana omitidos:</strong> ${resultado.details.weekends_skipped.length} días</p>`;
    }
    
    document.getElementById('resultadoAddDays').innerHTML = `
        <div class="result-card">
            <p><strong>📅 Fecha original:</strong> ${resultado.original_date}</p>
            <p><strong>🔢 Días a ${resultado.operation}:</strong> ${Math.abs(resultado.days_to_add)} día(s) laborable(s)</p>
            <p><strong>➡️ Fecha resultante:</strong> ${resultado.result_date}</p>
            <p><strong>✅ ¿Es día laborable?:</strong> ${resultado.is_working_day ? 'Sí' : 'No'}</p>
            <p><strong>📊 Total días calendario avanzados:</strong> ${resultado.total_days_advanced}</p>
            <p><strong>🔄 Fines de semana omitidos:</strong> ${resultado.skipped_weekends}</p>
            <p><strong>🎉 Feriados omitidos:</strong> ${resultado.skipped_holidays}</p>
            ${weekendsHtml}
            ${holidaysHtml}
            <p><small>💡 ${resultado.example_usage}</small></p>
        </div>
    `;
}

// Funciones para la demo
function consultarCheck() {
    const fecha = document.getElementById('fechaCheck').value;
    if (!fecha) {
        document.getElementById('resultadoCheck').innerHTML = '<p style="color:red">❌ Selecciona una fecha</p>';
        return;
    }
    const resultado = calcularDiaLaborable(fecha);
    document.getElementById('resultadoCheck').innerHTML = `
        <div class="result-card ${resultado.is_working_day ? 'working' : 'non-working'}">
            <p><strong>📅 Fecha:</strong> ${resultado.date}</p>
            <p><strong>💼 Día laborable:</strong> ${resultado.is_working_day ? '✅ Sí' : '❌ No'}</p>
            <p><strong>📆 Día:</strong> ${resultado.day_name}</p>
            <p><strong>📝 Razón:</strong> ${resultado.reason}</p>
        </div>
    `;
}

function consultarNext() {
    const fecha = document.getElementById('fechaNext').value;
    if (!fecha) {
        document.getElementById('resultadoNext').innerHTML = '<p style="color:red">❌ Selecciona una fecha</p>';
        return;
    }
    const resultado = getNextWorkingDay(fecha);
    document.getElementById('resultadoNext').innerHTML = `
        <div class="result-card">
            <p><strong>📅 Fecha original:</strong> ${resultado.original_date}</p>
            <p><strong>➡️ Próximo día laborable:</strong> ${resultado.next_working_day}</p>
            <p><strong>⏰ Días a agregar:</strong> ${resultado.days_to_add}</p>
            <p><strong>📝 Razón:</strong> ${resultado.reason}</p>
        </div>
    `;
}

function consultarDiff() {
    const start = document.getElementById('fechaStart').value;
    const end = document.getElementById('fechaEnd').value;
    if (!start || !end) {
        document.getElementById('resultadoDiff').innerHTML = '<p style="color:red">❌ Selecciona ambas fechas</p>';
        return;
    }
    const resultado = getWorkingDaysDifference(start, end);
    
    if (resultado.error) {
        document.getElementById('resultadoDiff').innerHTML = `<div class="result-card error">❌ ${resultado.error}</div>`;
        return;
    }
    
    let holidaysHtml = '';
    if (resultado.holidays_in_range.length > 0) {
        holidaysHtml = '<p><strong>🎉 Feriados en el rango:</strong></p><ul>';
        resultado.holidays_in_range.forEach(h => {
            holidaysHtml += `<li>${h.date} - ${h.name}</li>`;
        });
        holidaysHtml += '</ul>';
    } else {
        holidaysHtml = '<p><strong>🎉 Feriados en el rango:</strong> Ninguno</p>';
    }
    
    document.getElementById('resultadoDiff').innerHTML = `
        <div class="result-card">
            <p><strong>📅 Rango:</strong> ${resultado.start_date} → ${resultado.end_date}</p>
            <p><strong>💼 Días hábiles:</strong> ${resultado.working_days_between}</p>
            <p><strong>📊 Total de días:</strong> ${resultado.total_days}</p>
            <p><strong>🔄 Fines de semana:</strong> ${resultado.weekend_days}</p>
            <p><strong>🚫 Días no laborables:</strong> ${resultado.non_working_days}</p>
            ${holidaysHtml}
        </div>
    `;
}

// Modo API pura (cuando se accede sin interfaz)
(function() {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('date') || urlParams.has('action')) {
        const response = handleAPIRequest();
        document.body.innerHTML = '<pre>' + JSON.stringify(response, null, 2) + '</pre>';
        document.body.style.fontFamily = 'monospace';
        document.body.style.padding = '20px';
        document.body.style.backgroundColor = '#f4f4f4';
    }
})();