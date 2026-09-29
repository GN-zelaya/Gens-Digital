import { useState } from 'react'
import './App.css'

function App() {
  const [activeView, setActiveView] = useState('stock')

  const views = {
    stock: {
      eyebrow: 'Inventario',
      title: 'Stock',
      description: 'Consulta y controla el inventario disponible en un solo lugar.',
      metrics: [
        ['Productos registrados', '248'],
        ['Unidades disponibles', '1.284'],
        ['Alertas de reposicion', '12'],
      ],
    },
    metricas: {
      eyebrow: 'Rendimiento',
      title: 'Metricas',
      description: 'Revisa los indicadores principales para entender el pulso del negocio.',
      metrics: [
        ['Ventas del mes', '$24.680'],
        ['Conversion', '38,4%'],
        ['Ticket promedio', '$186'],
      ],
    },
  }

  const currentView = views[activeView]

  return (
    <div className="dashboard-shell">
      <aside className="sidebar">
        <div className="brand">
          <span className="brand-mark">G</span>
          <div>
            <strong>Gens Digital</strong>
            <span>Panel de ventas</span>
          </div>
        </div>

        <div className="sidebar-heading">
          <span>Accesos</span>
          <span className="sidebar-line" />
        </div>

        <nav className="feature-list" aria-label="Funcionalidades principales">
          <button
            type="button"
            className={`feature-card ${activeView === 'stock' ? 'is-active' : ''}`}
            onClick={() => setActiveView('stock')}
          >
            <span className="feature-icon stock-icon" aria-hidden="true">▦</span>
            <span className="feature-copy">
              <strong>Stock</strong>
              <small>Inventario y productos</small>
            </span>
            <span className="feature-arrow" aria-hidden="true">→</span>
          </button>
          <button
            type="button"
            className={`feature-card ${activeView === 'metricas' ? 'is-active' : ''}`}
            onClick={() => setActiveView('metricas')}
          >
            <span className="feature-icon metrics-icon" aria-hidden="true">⌁</span>
            <span className="feature-copy">
              <strong>Metricas</strong>
              <small>Resultados y rendimiento</small>
            </span>
            <span className="feature-arrow" aria-hidden="true">→</span>
          </button>
        </nav>

        <div className="sidebar-footer">
          <span className="status-dot" aria-hidden="true" />
          <span>Sistema operativo</span>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div>
            <span className="breadcrumb">Workspace / {currentView.title}</span>
            <p className="date-label">Martes, 29 de septiembre de 2026</p>
          </div>
          <div className="profile" aria-label="Perfil de usuario">
            <span className="profile-avatar">ND</span>
            <span className="profile-name">Nahua Digital</span>
          </div>
        </header>

        <section className="content-area" aria-live="polite">
          <div className="content-intro">
            <span className="section-kicker">{currentView.eyebrow}</span>
            <h1>{currentView.title}</h1>
            <p>{currentView.description}</p>
          </div>

          <div className="metric-grid">
            {currentView.metrics.map(([label, value]) => (
              <article className="metric-card" key={label}>
                <span>{label}</span>
                <strong>{value}</strong>
              </article>
            ))}
          </div>

          <div className="empty-panel">
            <span className="empty-panel-mark" aria-hidden="true">+</span>
            <div>
              <h2>Tu espacio de trabajo</h2>
              <p>Aqui apareceran los detalles de {currentView.title.toLowerCase()} cuando conectemos los datos reales.</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
