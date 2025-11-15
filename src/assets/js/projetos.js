document.addEventListener('DOMContentLoaded', () => {
    const projectsGridContainer = document.getElementById('projects-grid-container');

    function renderProjectsPage() {
        if (!projectsGridContainer) return;

        const urlParams = new URLSearchParams(window.location.search);
        const ongId = urlParams.get('ongId');

        const ongsToShow = ongId ? Storage.ongs.filter(o => o.id == ongId) : Storage.ongs;

        let allProjectsHtml = '';
        ongsToShow.forEach(ong => {
            ong.projects.forEach(project => {
                allProjectsHtml += `
                    <div class="ong-card">
                         <div class="ong-header" style="padding: 1rem;">
                            <h3>${project.title}</h3>
                            <small style="opacity: 0.8;">Da: ${ong.name}</small>
                        </div>
                        <div class="ong-content">
                            <p class="ong-description">${project.description}</p>
                            
                            <strong>Meta de Arrecadação</strong>
                            <div class="progress-bar">
                                <div class="progress-fill" style="width: ${project.progress}%">
                                    ${project.progress}%
                                </div>
                            </div>
                            <div style="display: flex; justify-content: space-between; font-size: 0.875rem; color: #6b7280;">
                                <span>R$ ${project.raised.toLocaleString('pt-BR')}</span>
                                <span>Meta: R$ ${project.goal.toLocaleString('pt-BR')}</span>
                            </div>
                             <button class="btn btn-primary donate-btn" data-ong="${ong.id}" data-project="${project.id}" style="width: 100%; margin-top: 1rem;">
                                Doar para este projeto
                            </button>
                        </div>
                    </div>
                `;
            });
        });

        projectsGridContainer.innerHTML = allProjectsHtml;
    }

    if (Storage.ongs && Storage.ongs.length > 0) renderProjectsPage();
    else document.addEventListener('storageInitialized', renderProjectsPage);
});