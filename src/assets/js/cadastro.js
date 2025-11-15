document.addEventListener('DOMContentLoaded', () => {
    const registerFormContainer = document.getElementById('register-form-container');

    function renderRegisterPage() {
        if (!registerFormContainer) return;

        registerFormContainer.innerHTML = `
            <div class="form-container">
                <h2 class="text-center">Cadastro</h2>
                <p class="text-center" style="margin-bottom: 2rem; color: #6b7280;">
                    Faça parte da nossa comunidade de transformação social
                </p>
                
                <form id="registerForm">
                    <div class="form-group">
                        <label>Escolha a ONG que deseja apoiar:</label>
                        <select name="ongId" required>
                            <option value="">Selecione uma ONG</option>
                            ${Storage.ongs.map(ong => `<option value="${ong.id}">${ong.logo} ${ong.name}</option>`).join('')}
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label>Quero me cadastrar como:</label>
                        <div class="radio-group">
                            <label><input type="radio" name="userType" value="volunteer" required> Voluntário</label>
                            <label><input type="radio" name="userType" value="donor"> Doador/Apoiador</label>
                        </div>
                    </div>
                    
                    <div class="form-group"><label for="name">Nome Completo</label><input type="text" id="name" name="name" required></div>
                    <div class="form-group"><label for="email">E-mail</label><input type="email" id="email" name="email" required></div>
                    <div class="form-group"><label for="phone">Telefone</label><input type="tel" id="phone" name="phone" required></div>
                    <div class="form-group"><label for="message">Mensagem (Opcional)</label><textarea id="message" name="message" rows="4"></textarea></div>
                    
                    <button type="submit" class="btn btn-primary" style="width: 100%;">Finalizar Cadastro</button>
                </form>
            </div>
        `;

        const registerForm = document.getElementById('registerForm');
        if (registerForm) {
            registerForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                const formData = new FormData(registerForm);
                const data = Object.fromEntries(formData);
                
                if (data.userType === 'volunteer') {
                    Storage.volunteers.push({ id: Date.now(), name: data.name, email: data.email, phone: data.phone, ongId: parseInt(data.ongId), date: new Date().toLocaleDateString(), status: 'Ativo' });
                }
                
                await Storage.save();
                alert('Cadastro realizado com sucesso!');
                window.location.href = 'index.html'; // Redireciona para a home
            });
        }
    }

    if (Storage.ongs && Storage.ongs.length > 0) renderRegisterPage();
    else document.addEventListener('storageInitialized', renderRegisterPage);
});
