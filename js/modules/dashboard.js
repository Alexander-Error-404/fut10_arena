/* ==========================================================================
   FUT 10 ARENA - MÓDULO DO DASHBOARD (dashboard.js)
   ========================================================================== */

/**
 * Renderiza o painel principal com os cards de resumo
 */
export function renderizarDashboard() {
  const container = document.getElementById("app-content");

  if (!container) return;

  container.innerHTML = `
    <div class="dashboard-container">
      <h2 style="margin-bottom: 15px; color: #0b1f3a;">📊 Painel Geral</h2>
      
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px;">
        <!-- Card 1 -->
        <div style="background: #fff; padding: 20px; border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.08); border-left: 5px solid #22c55e;">
          <p style="font-size: 0.85rem; color: #6b7280; margin: 0;">Total de Alunos</p>
          <h3 style="font-size: 1.8rem; margin: 5px 0 0; color: #111827;">24</h3>
        </div>

        <!-- Card 2 -->
        <div style="background: #fff; padding: 20px; border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.08); border-left: 5px solid #3b82f6;">
          <p style="font-size: 0.85rem; color: #6b7280; margin: 0;">Presenças Hoje</p>
          <h3 style="font-size: 1.8rem; margin: 5px 0 0; color: #111827;">18</h3>
        </div>

        <!-- Card 3 -->
        <div style="background: #fff; padding: 20px; border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.08); border-left: 5px solid #f59e0b;">
          <p style="font-size: 0.85rem; color: #6b7280; margin: 0;">Treinos Agendados</p>
          <h3 style="font-size: 1.8rem; margin: 5px 0 0; color: #111827;">2</h3>
        </div>
      </div>
    </div>
  `;
}   