// Lista de feriados federales de EE.UU. (entre 2020-2030)
const holidaysUS = {
    "2025": [
        "2025-01-01", // Año Nuevo
        "2025-01-20", // MLK Day
        "2025-02-17", // Presidents' Day
        "2025-05-26", // Memorial Day
        "2025-06-19", // Juneteenth
        "2025-07-04", // Independence Day
        "2025-09-01", // Labor Day
        "2025-10-13", // Columbus Day
        "2025-11-11", // Veterans Day
        "2025-11-27", // Thanksgiving
        "2025-12-25"  // Christmas
    ],
    "2026": [
        "2026-01-01", "2026-01-19", "2026-02-16", "2026-05-25",
        "2026-06-19", "2026-07-04", "2026-09-07", "2026-10-12",
        "2026-11-11", "2026-11-26", "2026-12-25"
    ]
};

function esFeriado(fechaStr) {
    const year = fechaStr.split('-')[0];
    if (holidaysUS[year]) {
        return holidaysUS[year].includes(fechaStr);
    }
    return false;
}

function esFinDeSemana(fechaStr) {
    const date = new Date(fechaStr);
    const day = date.getDay();
    return day === 0 || day === 6; // 0 = domingo, 6 = sábado
}

function getDiaNombre(fechaStr) {
    const dias = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
    const date = new Date(fechaStr);
    return dias[date.getDay()];
}

function calcularDiaLaborable(fechaStr) {
    const isWeekend = esFinDeSemana(fechaStr);
    const isHoliday = esFeriado(fechaStr);
    
    let reason = "";
    let isWorkingDay = true;
    
    if (isWeekend) {
        isWorkingDay = false;
        reason = "Fin de semana";
    } else if (isHoliday) {
        isWorkingDay = false;
        const holidayNames = {
            "2025-01-01": "Año Nuevo",
            "2025-01-20": "Día de Martin Luther King Jr.",
            "2025-02-17": "Día de los Presidentes",
            "2025-05-26": "Día de los Caídos",
            "2025-06-19": "Juneteenth",
            "2025-07-04": "Día de la Independencia",
            "2025-09-01": "Día del Trabajo",
            "2025-10-13": "Día de Colón",
            "2025-11-11": "Día de los Veteranos",
            "2025-11-27": "Acción de Gracias",
            "2025-12-25": "Navidad"
        };
        reason = holidayNames[fechaStr] || "Feriado federal";
    } else {
        reason = "Día laborable";
    }
    
    return {
        date: fechaStr,
        is_working_day: isWorkingDay,
        day_name: getDiaNombre(fechaStr),
        reason: reason,
        holiday: isHoliday || false,
        weekend: isWeekend || false
    };
}

// Función principal que actúa como API
function handleAPIRequest() {
    const urlParams = new URLSearchParams(window.location.search);
    const dateParam = urlParams.get('date');
    
    if (!dateParam) {
        return {
            error: "Falta parámetro 'date'",
            usage: "Usa ?date=YYYY-MM-DD",
            example: "?date=2025-07-04"
        };
    }
    
    // Validar formato de fecha
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(dateParam)) {
        return {
            error: "Formato inválido. Usa YYYY-MM-DD",
            received: dateParam
        };
    }
    
    const date = new Date(dateParam);
    if (isNaN(date.getTime())) {
        return {
            error: "Fecha inválida",
            received: dateParam
        };
    }
    
    return calcularDiaLaborable(dateParam);
}

// Mostrar resultado en la demo
function consultarAPI() {
    const fecha = document.getElementById('fechaInput').value;
    if (!fecha) {
        document.getElementById('resultado').innerHTML = '<p style="color:red">❌ Selecciona una fecha</p>';
        return;
    }
    
    const resultado = calcularDiaLaborable(fecha);
    document.getElementById('resultado').innerHTML = `
        <div class="result-card">
            <p><strong>📅 Fecha:</strong> ${resultado.date}</p>
            <p><strong>💼 Día laborable:</strong> ${resultado.is_working_day ? '✅ Sí' : '❌ No'}</p>
            <p><strong>📆 Día:</strong> ${resultado.day_name}</p>
            <p><strong>📝 Razón:</strong> ${resultado.reason}</p>
            ${resultado.holiday ? '<p>🎉 Es feriado federal</p>' : ''}
        </div>
    `;
}

// Para que funcione como API pública (retorna JSON automático)
(function() {
    const params = new URLSearchParams(window.location.search);
    if (params.has('date') && !document.getElementById('fechaInput')) {
        // Modo API pura (sin interfaz)
        const response = handleAPIRequest();
        document.body.innerHTML = '<pre>' + JSON.stringify(response, null, 2) + '</pre>';
        document.body.style.fontFamily = 'monospace';
        document.body.style.padding = '20px';
    }
})();