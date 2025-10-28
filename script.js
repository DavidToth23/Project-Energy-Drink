// Ostavljamo placeholder ključeve
const SUPABASE_URL = 'ZAMENI_ME_URL';
const SUPABASE_ANON_KEY = 'ZAMENI_ME_ANON_KEY';

const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function fetchList() {
    const listContainer = document.getElementById('list-container');
    
    // KORISTI NOVO IME TABELE: energy_drinks (BEZ NAVODNIKA I RAZMAKA)
    let { data: drinks, error } = await supabase
        .from('energy_drinks') 
        .select(`
            rank,
            name,
            brands(name) // Pretpostavlja da se tabela brendova sada zove 'brands'
        `)
        .order('rank', { ascending: true }); 

    if (error) {
        listContainer.innerHTML = `<p style="color: red;">Greška: ${error.message}. Problem je možda i dalje u relaciji.</p>`;
        console.error("Supabase Error:", error);
        return;
    }

    if (!drinks || drinks.length === 0) {
        listContainer.innerHTML = '<p>Lista je prazna ili se nije uspešno povezala.</p>';
        return;
    }

    listContainer.innerHTML = '';
    
    drinks.forEach(item => {
        // Pristup brandu
        const brandName = item.brands ? item.brands.name : 'Nepoznat brend'; 

        const listItem = document.createElement('div');
        listItem.className = 'list-item';

        listItem.innerHTML = `
            <h2>${item.rank}. ${item.name}</h2>
            <p><strong>Brand:</strong> ${brandName}</p>
            <span class="status"></span> 
        `;

        listContainer.appendChild(listItem);
    });
}

fetchList();
