document.addEventListener('DOMContentLoaded', () => {
    const heroStatsContainer = document.getElementById('hero-stats-container');
    const ongsGridContainer = document.getElementById('ongs-grid-container');

    function renderHomePage() {
        if (!heroStatsContainer || !ongsGridContainer) return;

        // Renderizar Estatísticas do Herói
        const stats = Storage.getTotalStats();
        heroStatsContainer.innerHTML = `
            <div class="hero-stat">
                <div class="number">${Storage.ongs.length}</div>
                <div class="label">ONGs Cadastradas</div>
            </div>
            <div class="hero-stat">
                <div class="number">${stats.totalProjects}</div>
                <div class="label">Projetos Ativos</div>
            </div>
            <div class="hero-stat">
                <div class="number">${stats.totalBeneficiaries}</div>
                <div class="label">Vidas Impactadas</div>
            </div>
        `;

        // Renderizar Grid de ONGs
        ongsGridContainer.innerHTML = Storage.ongs.map(ong => {
            const totalBeneficiaries = ong.projects.reduce((sum, p) => sum + p.beneficiaries, 0);
            const totalVolunteers = ong.projects.reduce((sum, p) => sum + p.volunteers, 0);
            
            return `
                <div class="ong-card" onclick="window.location.href='projetos.html?ongId=${ong.id}'">
                    <div class="ong-header">
                        <div class="ong-logo">${ong.logo}</div>
                        <h3>${ong.name}</h3>
                    </div>
                    <div class="ong-content">
                        <p class="ong-description">${ong.description}</p>
                        <div class="ong-stats">
                            <div class="ong-stat"><div class="number">${ong.projects.length}</div><div class="label">Projetos</div></div>
                            <div class="ong-stat"><div class="number">${totalBeneficiaries}</div><div class="label">Beneficiados</div></div>
                            <div class="ong-stat"><div class="number">${totalVolunteers}</div><div class="label">Voluntários</div></div>
                        </div>
                        <div class="ong-actions">
                            <a href="projetos.html?ongId=${ong.id}" class="btn btn-primary btn-sm">
                                Ver Projetos
                            </a>
                            <a href="cadastro.html" class="btn btn-secondary btn-sm">
                                Apoiar
                            </a>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }

    // Garante que o Storage foi inicializado antes de renderizar
    if (Storage.ongs && Storage.ongs.length > 0) renderHomePage();
    else document.addEventListener('storageInitialized', renderHomePage);
});