// Credenciales de Innova S.A.
const SUPABASE_URL = "https://onxielhlilspywjpfgwl.supabase.co";
const SUPABASE_KEY = "sb_publishable_7nkMmoJlgzwV55x9PdvrVg_Mi-W_o3P";
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
function mostrarRegistro() {
    document.getElementById('login-section').style.display = 'none';
    document.getElementById('register-section').style.display = 'block';
}

function mostrarLogin() {
    document.getElementById('register-section').style.display = 'none';
    document.getElementById('login-section').style.display = 'block';
}

// Crear Usuario (Apunta a la columna password_text)
document.getElementById('register-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const nombre = document.getElementById('reg-nombre').value;
    const email = document.getElementById('reg-email').value;
    const pass = document.getElementById('reg-pass').value;

    const { data, error } = await supabase.from('usuarios').insert([
        { nombre: nombre, email: email, password_text: pass }
    ]);
    
    if (error) {
        alert("Error al registrar: " + error.message);
    } else {
        alert("Usuario creado exitosamente. Ya puedes iniciar sesión.");
        document.getElementById('register-form').reset();
        mostrarLogin();
    }
});

// Iniciar Sesión (Apunta a la columna password_text)
document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const pass = document.getElementById('login-pass').value;

    const { data, error } = await supabase.from('usuarios')
        .select('*')
        .eq('email', email)
        .eq('password_text', pass);

    if (error) {
        alert("Error de conexión: " + error.message);
    } else if (data && data.length > 0) {
        document.getElementById('auth-container').style.display = 'none';
        document.getElementById('dashboard').style.display = 'block';
        cargarClientes();
    } else {
        alert("Credenciales incorrectas.");
    }
});

// Cargar y mostrar clientes en la tabla
async function cargarClientes() {
    const { data, error } = await supabase.from('clientes').select('*');
    
    if (error) {
        console.error("Error cargando clientes:", error);
        document.getElementById('tabla-body').innerHTML = `<tr><td colspan="4">Error leyendo base de datos. Asegúrate de desactivar el RLS en Supabase.</td></tr>`;
        return;
    }
    
    let html = '';
    data.forEach(c => {
        html += `<tr>
                    <td>${c.id}</td>
                    <td>${c.empresa}</td>
                    <td>${c.rif}</td>
                    <td>${c.telefono}</td>
                 </tr>`;
    });
    document.getElementById('tabla-body').innerHTML = html;
}
// Cerrar Sesión
function cerrarSesion() {
    document.getElementById('dashboard').style.display = 'none';
    document.getElementById('auth-container').style.display = 'block';
    document.getElementById('login-form').reset();
}
