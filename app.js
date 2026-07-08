// Credenciales oficiales de Innova S.A.
const SUPABASE_URL = "https://onxielhlilspywjpfgwl.supabase.co";
const SUPABASE_KEY = "sb_publishable_7nkMmoJlgzwV55x9PdvrVg_Mi-W_o3P";

const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const pass = document.getElementById('password').value;

    // Consulta a la tabla usuarios
    const { data, error } = await supabase.from('usuarios').select('*').eq('email', email).eq('password_text', pass);

    if (data && data.length > 0) {
        document.getElementById('login-view').style.display = 'none';
        document.getElementById('dashboard-view').style.display = 'flex';
        cargarClientes();
    } else {
        alert("Credenciales incorrectas o error de conexión.");
    }
});

async function cargarClientes() {
    const { data, error } = await supabase.from('clientes').select('*');
    if (error) return console.error(error);
    
    let html = '';
    data.forEach(c => {
        html += `<tr><td>${c.id_cliente}</td><td>${c.nombre}</td><td>${c.rif_cedula}</td><td>${c.telefono}</td></tr>`;
    });
    document.getElementById('tabla-body').innerHTML = html || '<tr><td colspan="4">No hay clientes.</td></tr>';
}

function cerrarSesion() {
    document.getElementById('dashboard-view').style.display = 'none';
    document.getElementById('login-view').style.display = 'flex';
    document.getElementById('login-form').reset();
}