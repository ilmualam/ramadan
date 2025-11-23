    (function() {
        // Using an IIFE (Immediately Invoked Function Expression) to prevent variable conflicts with Theme JS
        
        // 1. DATA GENERATION (Simulated for 2026)
        const raData = [];
        const startDate = new Date('2026-02-18'); 
        const days = ['Ahad', 'Isnin', 'Selasa', 'Rabu', 'Khamis', 'Jumaat', 'Sabtu'];

        for (let i = 0; i < 30; i++) {
            let date = new Date(startDate);
            date.setDate(startDate.getDate() + i);
            
            let imsakBase = new Date(date); imsakBase.setHours(6, 0, 0); 
            let maghribBase = new Date(date); maghribBase.setHours(19, 28, 0); 

            imsakBase.setMinutes(imsakBase.getMinutes() - (i * 0.5)); 
            maghribBase.setMinutes(maghribBase.getMinutes() + (i * 0.2)); 

            raData.push({
                dateStr: date.toLocaleDateString('ms-MY', { day: '2-digit', month: 'short' }),
                dayName: days[date.getDay()],
                imsak: raFormatTime(imsakBase),
                maghrib: raFormatTime(maghribBase),
                fullDate: date.toDateString()
            });
        }

        function raFormatTime(date) {
            let hours = date.getHours();
            let minutes = date.getMinutes();
            let ampm = hours >= 12 ? 'PM' : 'AM';
            hours = hours % 12;
            hours = hours ? hours : 12; 
            minutes = minutes < 10 ? '0'+minutes : minutes;
            return hours + ':' + minutes + ' ' + ampm;
        }

        // 2. RENDER TABLE
        const tbody = document.getElementById('ra-table-body');
        const today = new Date(); 
        let todaysData = null;
        let todayRowIndex = -1;

        raData.forEach((row, index) => {
            const tr = document.createElement('tr');
            
            // Check today
            // (Logic simplified for demo, assumes simulation aligns with today for testing)
            // For real 2026 usage, this date check will be strict.
            // For TESTING NOW: I will set it so if today matches simulation date it highlights, else no highlight.
            const simDate = new Date(row.fullDate);
            const isToday = simDate.getDate() === today.getDate() && simDate.getMonth() === today.getMonth();
            
            if (isToday) {
                tr.classList.add('ra-is-today');
                tr.id = 'ra-row-today';
                todaysData = row;
            }

            tr.innerHTML = `
                <td>${row.dateStr}</td>
                <td>${row.dayName}</td>
                <td>${row.imsak}</td>
                <td><strong>${row.maghrib}</strong></td>
            `;
            tbody.appendChild(tr);
        });

        // 3. GLOBAL FUNCTIONS (Attached to window specifically with RA_ prefix)
        window.raScrollToToday = function() {
            const activeRow = document.getElementById('ra-row-today');
            if (activeRow) {
                activeRow.scrollIntoView({ behavior: 'smooth', block: 'center' });
            } else {
                alert("Tarikh hari ini tiada dalam jadual simulasi 2026.");
            }
        };

        window.raCopyToWhatsapp = function() {
            // If testing today and no data matches:
            const dataToCopy = todaysData || raData[0]; // Fallback to first day if not today
            const text = `🌙 *Waktu Berbuka KL (${dataToCopy.dateStr})*\n🛑 Imsak: ${dataToCopy.imsak}\n🍲 Berbuka: ${dataToCopy.maghrib}\n\nInfo dari: [NamaWebsiteAnda]`;
            
            navigator.clipboard.writeText(text).then(() => {
                alert("✅ Jadual disalin! Paste di WhatsApp.");
            }).catch(err => {
                alert("Error copy manual.");
            });
        };

        // 4. COUNTDOWN
        function raUpdateTimer() {
            // Simplified Timer Logic
            // If today is not in Ramadan data, show dummy countdown or 'Not Ramadan'
            const now = new Date();
            const target = new Date();
            target.setHours(19, 30, 0); // Fixed dummy target for visuals

            if(now > target) target.setDate(target.getDate() + 1);

            const diff = target - now;
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);

            document.getElementById('ra-timer-display').innerText = 
                `${hours.toString().padStart(2,'0')}:${minutes.toString().padStart(2,'0')}:${seconds.toString().padStart(2,'0')}`;
        }
        
        setInterval(raUpdateTimer, 1000);
        raUpdateTimer();

    })(); // End IIFE
