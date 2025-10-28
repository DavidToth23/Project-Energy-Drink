// Ostavljamo placeholder ključeve jer su oni već ispravno uneti na Netlify-u
const SUPABASE_URL = 'ZAMENI_ME_URL';
const SUPABASE_ANON_KEY = 'ZAMENI_ME_ANON_KEY';

const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Funkcija za preuzimanje i prikaz liste
async function fetchList() {
    const listContainer = document.getElementById('list-container');
    
    // 1. Preuzmi podatke iz 'Energy Drinks' tabele.
    // Koristimo .select() za preuzimanje kolona, PLUS ugnježđeni SELECT za JOIN:
    // 'brands(name)' traži da se spoji sa tabelom 'brands' i da se preuzme samo kolona 'name'.
    let { data: drinks, error } = await supabase
        .from('Energy Drinks')
        .select(`
            rank,
            name,
            brands(name) 
        `)
        .order('rank', { ascending: true }); // Sortiraj po ranku, da bude redosled kao na slici

    if (error) {
        listContainer.innerHTML = `<p style="color: red;">Greška pri preuzimanju podataka: ${error.message}. Proveri ime tabele ('Energy Drinks') i RLS.</p>`;
        console.error(error);
        return;
    }

    if (!drinks || drinks.length === 0) {
        listContainer.innerHTML = '<p>Lista je prazna!</p>';
        return;
    }

    // 2. Obriši poruku "Učitavam" i prikaži stavke liste
    listContainer.innerHTML = '';
    
    drinks.forEach(item => {
        // Pristup nazivu brenda: Supabase vraća JOIN-ovane podatke kao objekat, 
        // npr. item.brands = { name: 'Monster' }
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

// Pokreni funkciju kada se stranica učita
fetchList();
