// ============================================
// CONFIGURACIÓN Y UTILIDADES
// ============================================

// Días de la semana
const DIAS = {
    DOMINGO: 0,
    LUNES: 1,
    MARTES: 2,
    MIERCOLES: 3,
    JUEVES: 4,
    VIERNES: 5,
    SABADO: 6
};

const NOMBRES_DIAS = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
const NOMBRES_MESES = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

// ============================================
// REGLAS DINÁMICAS PARA FERIADOS
// ============================================

function esFeriadoFederal(year, month, day) {
    const fecha = new Date(year, month, day);
    const fechaStr = `${year}-${String(month+1).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
    
    // 1. Año Nuevo - 1 de enero
    if (month === 0 && day === 1) return { esFeriado: true, nombre: "Año Nuevo" };
    
    // 2. Día de Martin Luther King Jr. - 3er lunes de enero
    if (month === 0 && esNOccurrencia(fecha, DIAS.LUNES, 3)) {
        return { esFeriado: true, nombre: "Día de Martin Luther King Jr." };
    }
    
    // 3. Día de los Presidentes (Washington's Birthday) - 3er lunes de febrero
    if (month === 1 && esNOccurrencia(fecha, DIAS.LUNES, 3)) {
        return { esFeriado: true, nombre: "Día de los Presidentes" };
    }
    
    // 4. Día de los Caídos (Memorial Day) - último lunes de mayo
    if (month === 4 && esUltimaOccurrencia(fecha, DIAS.LUNES)) {
        return { esFeriado: true, nombre: "Día de los Caídos" };
    }
    
    // 5. Juneteenth - 19 de junio
    if (month === 5 && day === 19) return { esFeriado: true, nombre: "Juneteenth" };
    
    // 6. Día de la Independencia - 4 de julio
    if (month === 6 && day === 4) return { esFeriado: true, nombre: "Día de la Independencia" };
    
    // 7. Día del Trabajo (Labor Day) - 1er lunes de septiembre
    if (month === 8 && esNOccurrencia(fecha, DIAS.LUNES, 1)) {
        return { esFeriado: true, nombre: "Día del Trabajo" };
    }
    
    // 8. Día de Colón (Columbus Day) - 2do lunes de octubre
    if (month === 9 && esNOccurrencia(fecha, DIAS.LUNES, 2)) {
        return { esFeriado: true, nombre: "Día de Colón" };
    }
    
    // 9. Día de los Veteranos - 11 de noviembre
    if (month === 10 && day === 11) return { esFeriado: true, nombre: "Día de los Veteranos" };
    
    // 10. Día de Acción de Gracias (Thanksgiving) - 4to jueves de noviembre
    if (month === 10 && esNOccurrencia(fecha, DIAS.JUEVES, 4)) {
        return { esFeriado: true, nombre: "Acción de Gracias" };
    }
    
    // 11. Navidad - 25 de diciembre
    if (month === 11 && day === 25) return { esFeriado: true, nombre: "Navidad" };
    
    // 12. Día después de Navidad (algunos años) - 26 de diciembre (cuando cae en fin de semana)
    // Nota: No es feriado federal oficial, pero muchas empresas lo dan
    
    return { esFeriado: false, nombre: null };
}

// Función auxiliar: ¿Es la N-ésima ocurrencia de un día específico?
function esNOccurrencia(fecha, diaSemana, ocurrencia) {
    const year = fecha.getFullYear();
    const month = fecha.getMonth();
    const firstDay = new Date(year, month, 1);
    const firstDayWeek = firstDay.getDay();
    
    // Calcular el día del mes para la N-ésima ocurrencia
    let targetDay = 1 + (diaSemana - firstDayWeek + 7) % 7;
    targetDay += (ocurrencia - 1) * 7;
    
    return fecha.getDate() === targetDay;
}

// Función auxiliar: ¿Es la última ocurrencia de un día específico en el mes?
function esUltimaOccurrencia(fecha, diaSemana) {
    const year = fecha.getFullYear();
    const month = fecha.getMonth();
    const lastDay = new Date(year, month + 1, 0);
    const lastDayWeek = lastDay.getDay();
    
    // Calcular la última ocurrencia del día específico
    let targetDay = lastDay.getDate();
    if (lastDayWeek !== diaSemana) {
        targetDay -= (lastDayWeek - diaSemana + 7) % 7;
    }
    
    return fecha.getDate() === targetDay;
}

// ============================================
// FUNCIONES PRINCIPALES
// ============================================

function esFinDeSemana(fechaStr) {
    const date = new Date(fechaStr);
    const day = date.getDay();
    return day === DIAS.DOMINGO || day === DIAS.SABADO;
}

function esDiaLaborable(fechaStr) {
    const [year, month, day] = fechaStr.split('-').map(Number);
    const esFeriadoInfo = esFeriadoFederal(year, month - 1, day);
    return !esFinDeSemana(fechaStr) && !esFeriadoInfo.esFeriado;
}

function getDiaNombre(fechaStr) {
    const date = new Date(fechaStr);
    return NOMBRES_DIAS[date.getDay()];
}

function getNombreFeriado(fechaStr) {
    const [year, month, day] = fechaStr.split('-').map(Number);
    const resultado = esFeriadoFederal(year, month - 1, day);
    return resultado.nombre || null;
}

function calcularDiaLaborable(fechaStr) {
    const [year, month, day] = fechaStr.split('-').map(Number);
    const isWeekend = esFinDeSemana(fechaStr);
    const feriadoInfo = esFeriadoFederal(year, month - 1, day);
    const isHoliday = feriadoInfo.esFeriado;
    const isWorkingDay = !isWeekend && !isHoliday;
    
    let reason = "Día laborable";
    if (isWeekend) reason = "Fin de semana";
    else if (isHoliday) reason = feriadoInfo.nombre;
    
    return {
        date: fechaStr,
        is_working_day: isWorkingDay,
        day_name: getDiaNombre(fechaStr),
        reason: reason,
        is_weekend: isWeekend,
        is_holiday: isHoliday,
        holiday_name: feriadoInfo.nombre
    };
}

// ============================================
// NUEVA FUNCIÓN: Días hábiles por mes
// ============================================

function getWorkingDaysByMonth(year, month) {
    const startDate = new Date(year, month, 1);
    const endDate = new Date(year, month + 1, 0);
    const totalDays = endDate.getDate();
    
    let workingDays = 0;
    let holidays = [];
    let weekends = 0;
    const dailyBreakdown = [];
    
    for (let day = 1; day <= totalDays; day++) {
        const fechaStr = `${year}-${String(month+1).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
        const isWeekend = esFinDeSemana(fechaStr);
        const feriadoInfo = esFeriadoFederal(year, month, day);
        
        dailyBreakdown.push({
            date: fechaStr,
            day_name: getDiaNombre(fechaStr),
            is_working_day: !isWeekend && !feriadoInfo.esFeriado,
            is_weekend: isWeekend,
            is_holiday: feriadoInfo.esFeriado,
            holiday_name: feriadoInfo.nombre
        });
        
        if (!isWeekend && !feriadoInfo.esFeriado) {
            workingDays++;
        } else if (isWeekend) {
            weekends++;
        } else if (feriadoInfo.esFeriado) {
            holidays.push({
                date: fechaStr,
                name: feriadoInfo.nombre,
                day_name: getDiaNombre(fechaStr)
            });
        }
    }
    
    return {
        year: year,
        month: month + 1,
        month_name: NOMBRES_MESES[month],
        total_days: totalDays,
        working_days: workingDays,
        non_working_days: totalDays - workingDays,
        weekends_count: weekends,
        holidays_count: holidays.length,
        holidays_list: holidays,
        daily_breakdown: dailyBreakdown,
        percentage_working: ((workingDays / totalDays) * 100).toFixed(1)
    };
}

// ============================================
// NUEVA FUNCIÓN: Lista de feriados por año
// ============================================

function getHolidaysByYear(year) {
    const holidays = [];
    
    // Evaluar cada posible feriado para el año
    const posiblesFeriados = [
        { type: "fixed", month: 0, day: 1, name: "Año Nuevo" },
        { type: "dynamic", month: 0, rule: "tercer lunes", name: "Día de Martin Luther King Jr." },
        { type: "dynamic", month: 1, rule: "tercer lunes", name: "Día de los Presidentes" },
        { type: "dynamic", month: 4, rule: "último lunes", name: "Día de los Caídos" },
        { type: "fixed", month: 5, day: 19, name: "Juneteenth" },
        { type: "fixed", month: 6, day: 4, name: "Día de la Independencia" },
        { type: "dynamic", month: 8, rule: "primer lunes", name: "Día del Trabajo" },
        { type: "dynamic", month: 9, rule: "segundo lunes", name: "Día de Colón" },
        { type: "fixed", month: 10, day: 11, name: "Día de los Veteranos" },
        { type: "dynamic", month: 10, rule: "cuarto jueves", name: "Acción de Gracias" },
        { type: "fixed", month: 11, day: 25, name: "Navidad" }
    ];
    
    for (const feriado of posiblesFeriados) {
        let fecha;
        
        if (feriado.type === "fixed") {
            fecha = new Date(year, feriado.month, feriado.day);
            const fechaStr = `${year}-${String(feriado.month+1).padStart(2,'0')}-${String(feriado.day).padStart(2,'0')}`;
            holidays.push({
                date: fechaStr,
                name: feriado.name,
                day_name: getDiaNombre(fechaStr),
                type: "fixed",
                observed: calcularObservancia(fechaStr)
            });
        } else {
            // Calcular fecha dinámica
            const firstDay = new Date(year, feriado.month, 1);
            const lastDay = new Date(year, feriado.month + 1, 0);
            
            if (feriado.rule === "primer lunes") {
                const primerLunes = 1 + ((DIAS.LUNES - firstDay.getDay() + 7) % 7);
                fecha = new Date(year, feriado.month, primerLunes);
            } else if (feriado.rule === "segundo lunes") {
                const primerLunes = 1 + ((DIAS.LUNES - firstDay.getDay() + 7) % 7);
                fecha = new Date(year, feriado.month, primerLunes + 7);
            } else if (feriado.rule === "tercer lunes") {
                const primerLunes = 1 + ((DIAS.LUNES - firstDay.getDay() + 7) % 7);
                fecha = new Date(year, feriado.month, primerLunes + 14);
            } else if (feriado.rule === "cuarto jueves") {
                const primerJueves = 1 + ((DIAS.JUEVES - firstDay.getDay() + 7) % 7);
                fecha = new Date(year, feriado.month, primerJueves + 21);
            } else if (feriado.rule === "último lunes") {
                const ultimoLunes = lastDay.getDate() - ((lastDay.getDay() - DIAS.LUNES + 7) % 7);
                fecha = new Date(year, feriado.month, ultimoLunes);
            }
            
            const fechaStr = `${year}-${String(fecha.getMonth()+1).padStart(2,'0')}-${String(fecha.getDate()).padStart(2,'0')}`;
            holidays.push({
                date: fechaStr,
                name: feriado.name,
                day_name: getDiaNombre(fechaStr),
                type: "dynamic",
                rule: feriado.rule,
                observed: calcularObservancia(fechaStr)
            });
        }
    }
    
    // Ordenar por fecha
    holidays.sort((a, b) => new Date(a.date) - new Date(b.date));
    
    // Agregar resumen por mes
    const summaryByMonth = {};
    holidays.forEach(h => {
        const month = h.date.split('-')[1];
        const monthName = NOMBRES_MESES[parseInt(month) - 1];
        if (!summaryByMonth[month]) {
            summaryByMonth[month] = {
                month: parseInt(month),
                month_name: monthName,
                holidays: []
            };
        }
        summaryByMonth[month].holidays.push(h);
    });
    
    return {
        year: year,
        total_holidays: holidays.length,
        holidays: holidays,
        summary_by_month: Object.values(summaryByMonth)
    };
}

// Función auxiliar: Calcular día de observancia (si cae fin de semana)
function calcularObservancia(fechaStr) {
    const date = new Date(fechaStr);
    const day = date.getDay();
    
    if (day === DIAS.SABADO) {
        const fechaObservada = new Date(date);
        fechaObservada.setDate(date.getDate() - 1);
        return {
            observed: true,
            observed_date: fechaObservada.toISOString().split('T')[0],
            reason: "Se observa el viernes anterior"
        };
    } else if (day === DIAS.DOMINGO) {
        const fechaObservada = new Date(date);
        fechaObservada.setDate(date.getDate() + 1);
        return {
            observed: true,
            observed_date: fechaObservada.toISOString().split('T')[0],
            reason: "Se observa el lunes siguiente"
        };
    }
    
    return {
        observed: false,
        observed_date: null,
        reason: null
    };
}

// ============================================
// FUNCIONES EXISTENTES ACTUALIZADAS
// ============================================

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
    let nextDateStr = nextDate.toISOString().split('T')[0];
    
    while (!esDiaLaborable(nextDateStr)) {
        daysAdded++;
        nextDate.setDate(nextDate.getDate() + 1);
        nextDateStr = nextDate.toISOString().split('T')[0];
    }
    
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
        } else if (!esDiaLaborable(currentStr)) {
            const nombreFeriado = getNombreFeriado(currentStr);
            if (nombreFeriado) {
                holidaysInRange.push({
                    date: currentStr,
                    name: nombreFeriado,
                    day_name: getDiaNombre(currentStr)
                });
            }
        } else {
            workingDays++;
        }
        
        currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return {
        start_date: startDateStr,
        end_date: endDateStr,
        working_days_between: workingDays,
        total_days: Math.floor((end - start) / (1000 * 60 * 60 * 24)) + 1,
        holidays_in_range: holidaysInRange,
        weekend_days: weekendDays,
        non_working_days: holidaysInRange.length + weekendDays
    };
}

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
            } else {
                const nombreFeriado = getNombreFeriado(currentStr);
                if (nombreFeriado) {
                    skippedDates.holidays.push({
                        date: currentStr,
                        name: nombreFeriado,
                        day_name: getDiaNombre(currentStr)
                    });
                }
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

// ============================================
// VALIDACIONES Y API HANDLER
// ============================================

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
            
        case 'add_days':
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
            
        case 'monthly':
            const year = urlParams.get('year');
            const month = urlParams.get('month');
            
            if (!year || !month) {
                return { error: "Faltan parámetros 'year' y/o 'month'", usage: "?action=monthly&year=YYYY&month=MM" };
            }
            
            const yearNum = parseInt(year);
            const monthNum = parseInt(month) - 1;
            
            if (isNaN(yearNum) || yearNum < 2020 || yearNum > 2100) {
                return { error: "Año inválido. Rango: 2020-2100" };
            }
            
            if (isNaN(monthNum) || monthNum < 0 || monthNum > 11) {
                return { error: "Mes inválido. Rango: 1-12" };
            }
            
            return getWorkingDaysByMonth(yearNum, monthNum);
            
        case 'holidays':
            const holidayYear = urlParams.get('year');
            if (!holidayYear) {
                return { error: "Falta parámetro 'year'", usage: "?action=holidays&year=YYYY" };
            }
            
            const yearHoliday = parseInt(holidayYear);
            if (isNaN(yearHoliday) || yearHoliday < 2020 || yearHoliday > 2100) {
                return { error: "Año inválido. Rango: 2020-2100" };
            }
            
            return getHolidaysByYear(yearHoliday);
            
        case 'check':
        default:
            const checkDate = urlParams.get('date');
            if (!checkDate) {
                return {
                    error: "Falta parámetro 'date'",
                    available_actions: ["check", "next", "diff", "add_days", "monthly", "holidays"],
                    usage: {
                        check: "?date=YYYY-MM-DD",
                        next: "?action=next&date=YYYY-MM-DD",
                        diff: "?action=diff&start=YYYY-MM-DD&end=YYYY-MM-DD",
                        add_days: "?action=add_days&date=YYYY-MM-DD&days=N",
                        monthly: "?action=monthly&year=YYYY&month=MM",
                        holidays: "?action=holidays&year=YYYY"
                    }
                };
            }
            const validCheck = validarFecha(checkDate);
            if (!validCheck.valid) return validCheck;
            return calcularDiaLaborable(checkDate);
    }
}

// Funciones para la demo
function consultarMonthly() {
    const year = document.getElementById('anioMonthly').value;
    const month = document.getElementById('mesMonthly').value;
    
    const resultado = getWorkingDaysByMonth(parseInt(year), parseInt(month) - 1);
    
    let holidaysHtml = '';
    if (resultado.holidays_list.length > 0) {
        holidaysHtml = '<p><strong>🎉 Feriados del mes:</strong></p><ul>';
        resultado.holidays_list.forEach(h => {
            holidaysHtml += `<li>${h.date} (${h.day_name}) - ${h.name}</li>`;
        });
        holidaysHtml += '</ul>';
    } else {
        holidaysHtml = '<p><strong>🎉 Feriados del mes:</strong> Ninguno</p>';
    }
    
    document.getElementById('resultadoMonthly').innerHTML = `
        <div class="result-card">
            <p><strong>📆 Mes:</strong> ${resultado.month_name} ${resultado.year}</p>
            <p><strong>📊 Total días:</strong> ${resultado.total_days}</p>
            <p><strong>💼 Días hábiles:</strong> ${resultado.working_days}</p>
            <p><strong>🚫 Días no laborables:</strong> ${resultado.non_working_days}</p>
            <p><strong>🔄 Fines de semana:</strong> ${resultado.weekends_count}</p>
            <p><strong>🎉 Feriados:</strong> ${resultado.holidays_count}</p>
            <p><strong>📈 Porcentaje hábil:</strong> ${resultado.percentage_working}%</p>
            ${holidaysHtml}
        </div>
    `;
}

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

function consultarHolidays() {
    const year = document.getElementById('anioHolidays').value;
    const resultado = getHolidaysByYear(parseInt(year));
    
    let holidaysHtml = '<table class="holidays-table"><thead><tr><th>Fecha</th><th>Día</th><th>Feriado</th><th>Tipo</th><th>Observancia</th></tr></thead><tbody>';
    
    resultado.holidays.forEach(h => {
        const observanciaHtml = h.observed.observed ? 
            `<span class="observed">${h.observed.observed_date} (${h.observed.reason})</span>` : 
            '<span class="no-observed">No aplica</span>';
        
        holidaysHtml += `
            <tr>
                <td>${h.date}</td>
                <td>${h.day_name}</td>
                <td><strong>${h.name}</strong></td>
                <td>${h.type === 'fixed' ? '📅 Fijo' : '📆 Variable'}</td>
                <td>${observanciaHtml}</td>
            </tr>
        `;
    });
    
    holidaysHtml += '</tbody></table>';
    
    // Resumen por mes
    let summaryHtml = '<div class="summary-months"><h4>📊 Resumen por mes:</h4><div class="summary-grid">';
    resultado.summary_by_month.forEach(month => {
        summaryHtml += `
            <div class="summary-card">
                <strong>${month.month_name}</strong>
                <span>${month.holidays.length} feriado(s)</span>
                <ul>
                    ${month.holidays.map(h => `<li>${h.name} (${h.date.split('-')[2]})</li>`).join('')}
                </ul>
            </div>
        `;
    });
    summaryHtml += '</div></div>';
    
    document.getElementById('resultadoHolidays').innerHTML = `
        <div class="result-card holidays-result">
            <h3>📅 Feriados Federales de EE.UU. - ${resultado.year}</h3>
            <p><strong>Total:</strong> ${resultado.total_holidays} feriados oficiales</p>
            ${holidaysHtml}
            ${summaryHtml}
        </div>
    `;
}