document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('cadastroForm');
  if(form){
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const nome = form.nome.value.trim();
      const email = form.email.value.trim();
      const cpf = form.cpf.value.trim();
      const telefone = form.telefone.value.trim();
      const cep = form.cep.value.trim();
      let errors = [];
      if(nome.length<3) errors.push('Nome inválido');
      if(!email.includes('@')) errors.push('Email inválido');
      if(!/^\\d{3}\\.\\d{3}\\.\\d{3}-\\d{2}$/.test(cpf)) errors.push('CPF inválido');
      if(!/^\\(\\d{2}\\) \\d{5}-\\d{4}$/.test(telefone)) errors.push('Telefone inválido');
      if(!/^\\d{5}-\\d{3}$/.test(cep)) errors.push('CEP inválido');
      if(errors.length>0){ alert('Erros:\\n'+errors.join('\\n')); return; }
      alert('Cadastro enviado com sucesso!'); form.reset();
    });
  }
});
