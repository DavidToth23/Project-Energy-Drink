// Izbacujemo JOIN da bismo testirali samo konekciju
const SUPABASE_URL = 'ZAMENI_ME_URL';
const SUPABASE_ANON_KEY = 'ZAMENI_ME_ANON_KEY';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function fetchList() {
    const listContainer = document.getElementById('list-container');
    
    // Dohvati samo kolone iz glavne tabele (npr. 'energy_drinks')
    let { data: drinks, error } = await supabase
        .from('energy_drinks') 
        .select('rank, name, brand_id') // NE koristi brands(name)!
        .order('rank', { ascending: true }); 

    if (error) {
        listContainer.innerHTML = `<p style="color: red;">Konekcioni problem: ${error.message}. Proveri RLS i ključeve!</p>`;
        console.error("Supabase Error:", error);
        return;
    }

    if (!drinks || drinks.length === 0) {
        listContainer.innerHTML = '<p>Lista je prazna, ali je konekcija uspela.</p>';
        return;
    }

    listContainer.innerHTML = '';
    
    // Prikazujemo samo ID umesto imena brenda
    drinks.forEach(item => {
        const listItem = document.createElement('div');
        listItem.className = 'list-item';

        listItem.innerHTML = `
            <h2>${item.rank}. ${item.name}</h2>
            <p><strong>Brand ID:</strong> ${item.brand_id}</p>
            <span class="status"></span> 
        `;

        listContainer.appendChild(listItem);
    });
}

fetchList();
