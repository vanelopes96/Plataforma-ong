// Sistema de Armazenamento com persistência
const Storage = {
    async init() {
        try {
            const data = await window.storage.get('platform-data');
            if (data) {
                const parsed = JSON.parse(data.value);
                this.ongs = parsed.ongs || [];
                this.volunteers = parsed.volunteers || [];
                this.donations = parsed.donations || [];
            } else {
                this.loadDefaults();
                await this.save();
            }
        } catch (error) {
            this.loadDefaults();
        }
    },

    loadDefaults() {
        this.ongs = [
            {
                id: 1,
                name: 'ONG Esperança',
                logo: '🌟',
                description: 'Transformando vidas através da educação e desenvolvimento social',
                mission: 'Promover o desenvolvimento social através de educação de qualidade',
                projects: [
                    {
                        id: 1,
                        title: 'Educação para Todos',
                        description: 'Programa de alfabetização e reforço escolar',
                        beneficiaries: 150,
                        volunteers: 25,
                        progress: 75,
                        goal: 50000,
                        raised: 37500
                    },
                    {
                        id: 2,
                        title: 'Capacitação Profissional',
                        description: 'Cursos gratuitos de capacitação',
                        beneficiaries: 80,
                        volunteers: 15,
                        progress: 45,
                        goal: 30000,
                        raised: 13500
                    }
                ]
            },
            {
                id: 2,
                name: 'Alimenta Brasil',
                logo: '🍽️',
                description: 'Combatendo a fome e promovendo segurança alimentar',
                mission: 'Garantir alimentação digna para famílias em vulnerabilidade',
                projects: [
                    {
                        id: 3,
                        title: 'Cestas Solidárias',
                        description: 'Distribuição mensal de cestas básicas',
                        beneficiaries: 500,
                        volunteers: 60,
                        progress: 85,
                        goal: 100000,
                        raised: 85000
                    }
                ]
            },
            {
                id: 3,
                name: 'Saúde em Ação',
                logo: '⚕️',
                description: 'Cuidando da saúde de comunidades carentes',
                mission: 'Promover acesso universal à saúde preventiva',
                projects: [
                    {
                        id: 4,
                        title: 'Consultas Gratuitas',
                        description: 'Atendimento médico em comunidades',
                        beneficiaries: 300,
                        volunteers: 40,
                        progress: 60,
                        goal: 75000,
                        raised: 45000
                    }
                ]
            }
        ];

        this.volunteers = [];
        this.donations = [];
    },

    async save() {
        try {
            const data = JSON.stringify({
                ongs: this.ongs,
                volunteers: this.volunteers,
                donations: this.donations
            });
            await window.storage.set('platform-data', data);
        } catch (error) {
            console.error('Erro ao salvar dados:', error);
        }
    },

    getOng(id) {
        return this.ongs.find(o => o.id === id);
    },

    getTotalStats() {
        const totalProjects = this.ongs.reduce((sum, ong) => sum + ong.projects.length, 0);
        const totalBeneficiaries = this.ongs.reduce((sum, ong) => 
            sum + ong.projects.reduce((s, p) => s + p.beneficiaries, 0), 0);
        const totalVolunteers = this.ongs.reduce((sum, ong) => 
            sum + ong.projects.reduce((s, p) => s + p.volunteers, 0), 0);
        
        return { totalProjects, totalBeneficiaries, totalVolunteers };
    },

    ongs: [],
    volunteers: [],
    donations: []
};

// Sistema de Autenticação
const Auth = {
    currentUser: null,
};

// Componentes de UI reutilizáveis
const UI = {
    footer() {
        return `
            <div class="footer-content">
                <div class="footer-links">
                    <a href="index.html">Início</a>
                    <a href="projetos.html">Projetos</a>
                    <a href="cadastro.html">Seja Voluntário</a>
                    <a href="#">Contato</a>
                </div>
                <p>© 2025 Plataforma ONGs - Conectando solidariedade</p>
                <p style="margin-top: 0.5rem; font-size: 0.875rem; color: #9ca3af;">
                    Uma plataforma para transformar vidas através do trabalho voluntário
                </p>
            </div>
        `;
    }
};

// Inicialização do Sistema
async function init() {
    await Storage.init();
    // Dispara um evento customizado para notificar outros scripts que o Storage está pronto.
    document.dispatchEvent(new CustomEvent('storageInitialized'));

    // Renderiza o footer em todas as páginas que o tiverem
    const footer = document.querySelector('footer');
    if (footer) {
        footer.innerHTML = UI.footer();
    }
}

// Iniciar quando a página carregar
document.addEventListener('DOMContentLoaded', init);