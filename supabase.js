
  // 1. Configurações do Supabase
const SUPABASE_URL = 'https://jtdjmjyhxeiwhbffohzw.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp0ZGptanloeGVpd2hiZmZvaHp3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA5NzM2MzYsImV4cCI6MjEwNjU0OTYzNn0.oAnbTAKM1WlFOCOVk_5X6u5Z9ueSAfZrGH_Wrwc9qWc';

const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// 2. Função de LOGIN
async function realizarLogin(event) {
    if (event) event.preventDefault();
  const cpfDigitado = document.getElementById('cpf').value;
  const senhaDigitada = document.getElementById('senha').value;



  if (!cpfDigitado || !senhaDigitada) {
    alert('Por favor, preencha o CPF e a Senha!');
    return;
  }

  const { data, error } = await _supabase
    .from('usuarios_rs')
    .select('*')
    .eq('cpf', cpfDigitado)
    .eq('senha', senhaDigitada);

  if (error) {
    console.error('Erro na consulta de login:', error);
    alert('Erro ao consultar o banco de dados.');
    return;
  }

  if (data.length > 0) {
    alert('Login realizado com sucesso!');
    window.location.href = './loginsucesso.html';
  } else {
    alert('Se cadastre primeiro');
  }
}

// 3. Função de CADASTRO
async function cadastrarUsuario() {
  const cpfDigitado = document.getElementById('cpf').value;
  const senhaDigitada = document.getElementById('senha').value;

  if (!cpfDigitado || !senhaDigitada) {
    alert('Por favor, preencha o CPF e a Senha para cadastrar!');
    return;
  }

  // Envia para o banco
  const { data, error } = await _supabase
    .from('usuarios_rs')
    .insert([
      { cpf: cpfDigitado, senha: senhaDigitada }
    ]);

  if (error) {
    console.error('Erro ao cadastrar:', error);
    alert('Erro ao cadastrar: ' + error.message);
  } else {
    alert('Usuário cadastrado com sucesso!');
    // Limpa os campos
    document.getElementById('cpf').value = '';
    document.getElementById('senha').value = '';
  }
}

// 4. Garante que os botões só são associados depois do HTML carregar totalmente
document.addEventListener('DOMContentLoaded', () => {
  const btnLogin = document.getElementById('btn-login');
  const btnCadastro = document.getElementById('btn-cadastro');

  if (btnLogin) {
    btnLogin.addEventListener('click', realizarLogin);
  }

  if (btnCadastro) {
    btnCadastro.addEventListener('click', cadastrarUsuario);
  }
});