const SUPABASE_URL = 'ZAMENI_ME_URL'; 
const SUPABASE_ANON_KEY = 'ZAMENI_ME_ANON_KEY'; 

const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Funkcija za preuzimanje i prikaz liste
async function fetchList() {
    const listContainer = document.getElementById('list-container');

    // 1. Preuzmi podatke iz 'my_lists' tabele
    let { data: lists, error } = await supabase
        .from('Energy Drinks')
        .select('*'); // Selektuj sve kolone

    if (error) {
        listContainer.innerHTML = `<p style="color: red;">Greška pri preuzimanju podataka: ${error.message}. Proveri da li su ključevi ispravni na hosting servisu.</p>`;
        console.error(error);
        return;
    }

    if (!lists || lists.length === 0) {
        listContainer.innerHTML = '<p>Lista je prazna!</p>';
        return;
    }

    // 2. Obriši poruku "Učitavam" i prikaži stavke liste
    listContainer.innerHTML = '';

    lists.forEach(item => {
        const listItem = document.createElement('div');
        listItem.className = 'list-item';

        listItem.innerHTML = `
            <h2>${item.title}</h2>
            <p>${item.description}</p>
            <span class="status">Status: ${item.status}</span>
        `;

        listContainer.appendChild(listItem);
    });
}

// Pokreni funkciju kada se stranica učita
fetchList();
