document.addEventListener('DOMContentLoaded', function() {
            // Array de objetos com todos os eventos, extraídos da sua tabela
            const eventos = [
                { dia: '28', horario: '10:00 - 12:00', titulo: 'Designing Digital Circuits with Pitanga Student', categoria: 'Short Course', palestrante: 'Alcides Costa', local: 'CCET - LAB C2', infoPalestrante: 'Ph.D. in Computer Science and co-founder of InPlace' },
                { dia: '28', horario: '13:30 - 13:45', titulo: 'Opening Session', categoria: 'Opening', palestrante: null, local: 'Rectorate Auditorium', infoPalestrante: null },
                { dia: '28', horario: '13:45 - 14:40', titulo: 'Introduction to Chip Design Automation', categoria: 'Introductory Lecture', palestrante: 'Jose Luis Guntzel', local: 'Rectorate Auditorium', infoPalestrante: 'UFSC and IEEE Senior member' },
                { dia: '28', horario: '14:50 - 16:00', titulo: 'Visualization Tools', categoria: 'Advanced Lecture', palestrante: 'Ricardo Reis', local: 'Rectorate Auditorium', infoPalestrante: 'UFRGS and IEEE Life Senior member' },
                { dia: '28', horario: '16:10 - 16:25', titulo: 'Coffe Break', categoria: 'Networking', palestrante: null, local: 'Rectorate Hall', infoPalestrante: null },
                { dia: '28', horario: '16:25 - 17:00', titulo: 'Poster Session', categoria: 'Networking', palestrante: null, local: 'Rectorate Hall', infoPalestrante: null },
                { dia: '28', horario: '17:10 - 18:30', titulo: 'InPlace: The Journey of a Brazilian EDA Startup', categoria: 'Industrial Talk', palestrante: 'Alcides Costa', local: 'Rectorate Auditorium', infoPalestrante: 'Ph.D. in Computer Science and co-founder of InPlace' },
                { dia: '29', horario: '08:00 - 09:45', titulo: 'How Does a Processor Work? Building a RISC-V Step by Step in Verilog', categoria: 'Short Course', palestrante: 'Antônio Reis, Vinicius Xavier, Yami Rodrigues', local: 'CCET - LAB C2', infoPalestrante: 'UFS Students' },
                { dia: '29', horario: '10:00 - 12:00', titulo: 'Development and Simulation Environment for RISC-V Projects', categoria: 'Short Course', palestrante: 'Bruno Prado', local: 'CCET - LAB C2', infoPalestrante: 'UFS and Ph.D. in Computer Science' },
                { dia: '29', horario: '13:30 - 14:25', titulo: 'Machine Learning Applied to Integrated Circuit Design', categoria: 'Introductory Lecture', palestrante: 'Cristina Meinhardt', local: 'Rectorate Auditorium', infoPalestrante: 'UFSC and IEEE Senior member' },
                { dia: '29', horario: '14:35 - 15:45', titulo: 'Trends in Computing and Microelectronics', categoria: 'Advanced Lecture', palestrante: 'Ricardo Reis', local: 'Rectorate Auditorium', infoPalestrante: 'UFRGS and IEEE Life Senior member' },
                { dia: '29', horario: '15:46 - 16:05', titulo: 'Coffe Break', categoria: 'Networking', palestrante: null, local: 'Rectorate Hall', infoPalestrante: null },
                { dia: '29', horario: '16:06 - 17:00', titulo: 'Presenting IEEE-CEDA and IEEE-CASS', categoria: 'Roundtable Discussion', palestrante: null, local: 'Rectorate Auditorium', infoPalestrante: null },
                { dia: '29', horario: '17:10 - 18:30', titulo: 'Opportunities in the Semiconductor and EDA Industry in Brazil', categoria: 'Industrial Talk', palestrante: 'Luiza Pena', local: 'Rectorate Auditorium', infoPalestrante: 'Application Engineering Manager at Cadence' }
            ];

            const eventosGrid = document.getElementById('eventos-grid');
            const buscaInput = document.getElementById('busca-atividade');
            const filtroBtns = document.querySelectorAll('.filtro-btn');

            // Função que cria e exibe os cards na tela
            function renderizarEventos(eventosParaRenderizar) {
                eventosGrid.innerHTML = ''; // Limpa a grade antes de adicionar novos cards
                if (eventosParaRenderizar.length === 0) {
                    eventosGrid.innerHTML = '<p style="text-align: center; color: var(--cinza-texto);">Nenhuma atividade encontrada com os filtros selecionados.</p>';
                    return;
                }
                eventosParaRenderizar.forEach(evento => {
                    const card = document.createElement('div');
                    card.className = 'evento-card';
                    card.setAttribute('data-dia', evento.dia);

                    // Cria o HTML para o bloco de horário
                    const horarioHTML = `
                        <div class="evento-horario">
                            ${evento.horario.split(' - ').map(h => `<span>${h.trim()}</span>`).join('<span>~</span>')}
                        </div>
                    `;
                    
                    // Cria o HTML para o palestrante (só se houver um)
                    const palestranteHTML = evento.palestrante ? `
                        <div class="evento-palestrante">
                            <i class="fas fa-user"></i>
                            <div>
                                <strong>${evento.palestrante}</strong>
                                <small>${evento.infoPalestrante}</small>
                            </div>
                        </div>
                    ` : '';

                    // Cria o HTML para o bloco de informações
                    const infoHTML = `
                        <div class="evento-info">
                            <span class="evento-categoria">${evento.categoria}</span>
                            <h3>${evento.titulo}</h3>
                            <div class="evento-local">
                                <i class="fas fa-map-marker-alt"></i>
                                <span>${evento.local}</span>
                            </div>
                            ${palestranteHTML}
                        </div>
                    `;

                    card.innerHTML = horarioHTML + infoHTML;
                    eventosGrid.appendChild(card);
                });
            }

            // Função principal que filtra os eventos com base na busca e nos botões de data
            function filtrarEventos() {
                const termoBusca = buscaInput.value.toLowerCase();
                const filtroAtivo = document.querySelector('.filtro-btn.active').dataset.filter;

                const eventosFiltrados = eventos.filter(evento => {
                    // Verifica se o termo de busca corresponde a algum campo do evento
                    const correspondeBusca = termoBusca === '' ||
                                           evento.titulo.toLowerCase().includes(termoBusca) ||
                                           (evento.palestrante && evento.palestrante.toLowerCase().includes(termoBusca)) ||
                                           evento.categoria.toLowerCase().includes(termoBusca);

                    // Verifica se o evento corresponde ao filtro de data selecionado
                    const correspondeFiltroData = (filtroAtivo === 'all') || (evento.dia === filtroAtivo);

                    return correspondeBusca && correspondeFiltroData;
                });

                renderizarEventos(eventosFiltrados);
            }

            // Adiciona o evento de clique para cada botão de filtro
            filtroBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    // Remove a classe 'active' do botão antigo e adiciona no novo
                    document.querySelector('.filtro-btn.active').classList.remove('active');
                    btn.classList.add('active');
                    filtrarEventos(); // Re-renderiza os cards com o novo filtro
                });
            });

            // Adiciona o evento de 'input' para a barra de busca (filtra enquanto digita)
            buscaInput.addEventListener('input', filtrarEventos);

            // Renderização inicial de todos os eventos quando a página carrega
            filtrarEventos();
        });