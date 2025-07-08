function sanitizeInput(t){
  const div=document.createElement('div');
  div.innerText=t;
  return div.innerHTML.replace(/['";]/g,'');
}

document.getElementById('loginForm').addEventListener('submit',async e=>{
  e.preventDefault();

  const access   = sanitizeInput(document.getElementById('access').value.trim());
  const password = sanitizeInput(document.getElementById('password').value.trim());

  const fd = new FormData();
  fd.append('access', access);
  fd.append('password', password);

  try{
    const res  = await fetch('secure-backend/login.php', { method:'POST', body:fd });
    const data = await res.json();

    if (data.success){
      localStorage.setItem('auth_token_ls', data.token);   // ← só LS
      location.href = '/index.html';                       // ← redireciona
    }else{
      document.getElementById('error-msg').textContent = data.error || 'Falha no login';
    }
  }catch(err){
    document.getElementById('error-msg').textContent = 'Erro na requisição.';
  }
});
