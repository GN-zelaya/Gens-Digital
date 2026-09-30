import { useEffect, useState } from 'react'
import './App.css'
import { QrScannerController } from './controllers/qrScannerController'
import { findProductByScanCode } from './services/productsApi'

function App() {
  const [activeView, setActiveView] = useState('stock')
  const [lastScannedCode, setLastScannedCode] = useState('')
  const [scanMessage, setScanMessage] = useState('Esperando una lectura...')
  const [scannedProduct, setScannedProduct] = useState(null)

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
    proveedores: {
      eyebrow: 'Abastecimiento',
      title: 'Proveedores',
      description: 'Organiza tus proveedores y consulta el estado de tus compras.',
      metrics: [
        ['Proveedores activos', '32'],
        ['Ordenes pendientes', '8'],
        ['Compras del mes', '$8.420'],
      ],
    },
    clientes: {
      eyebrow: 'Relacion comercial',
      title: 'Clientes',
      description: 'Gestiona tus contactos y conoce la actividad de tu cartera.',
      metrics: [
        ['Clientes registrados', '186'],
        ['Clientes nuevos', '24'],
        ['Clientes activos', '142'],
      ],
    },
    caja: {
      eyebrow: 'Finanzas',
      title: 'Caja',
      description: 'Controla los ingresos, egresos y saldo disponible del negocio.',
      metrics: [
        ['Saldo disponible', '$12.840'],
        ['Ingresos del mes', '$28.460'],
        ['Egresos del mes', '$15.620'],
      ],
    },
  }

  const currentView = views[activeView]

  useEffect(() => {
    if (activeView !== 'stock') {
      return undefined
    }

    const scanner = new QrScannerController({
      onScan: async (code) => {
        setLastScannedCode(code)
        setScannedProduct(null)
        setScanMessage('Buscando producto...')

        try {
          const product = await findProductByScanCode(code)
          setScannedProduct(product)
          setScanMessage('Producto encontrado.')
        } catch (error) {
          setScanMessage(error.code === 'product_not_found'
            ? 'No existe un producto activo con ese codigo.'
            : 'No se pudo conectar con el servicio de productos.')
        }
      },
    })

    scanner.start()
    return () => scanner.stop()
  }, [activeView])

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
          <button
            type="button"
            className={`feature-card ${activeView === 'proveedores' ? 'is-active' : ''}`}
            onClick={() => setActiveView('proveedores')}
          >
            <span className="feature-icon suppliers-icon" aria-hidden="true">♧</span>
            <span className="feature-copy">
              <strong>Proveedores</strong>
              <small>Compras y abastecimiento</small>
            </span>
            <span className="feature-arrow" aria-hidden="true">→</span>
          </button>
          <button
            type="button"
            className={`feature-card ${activeView === 'clientes' ? 'is-active' : ''}`}
            onClick={() => setActiveView('clientes')}
          >
            <span className="feature-icon clients-icon" aria-hidden="true">◎</span>
            <span className="feature-copy">
              <strong>Clientes</strong>
              <small>Contactos y cartera</small>
            </span>
            <span className="feature-arrow" aria-hidden="true">→</span>
          </button>
          <button
            type="button"
            className={`feature-card ${activeView === 'caja' ? 'is-active' : ''}`}
            onClick={() => setActiveView('caja')}
          >
            <span className="feature-icon cash-icon" aria-hidden="true">$</span>
            <span className="feature-copy">
              <strong>Caja</strong>
              <small>Ingresos y egresos</small>
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

          {activeView === 'stock' && (
            <section className="scanner-panel" aria-live="polite">
              <div className="scanner-heading">
                <span className="scanner-mark" aria-hidden="true">⌁</span>
                <div>
                  <span className="section-kicker">Lector QR</span>
                  <h2>Escaneo de productos</h2>
                </div>
                <span className="scanner-status">Activo</span>
              </div>
              <p>{scanMessage}</p>
              <strong className={lastScannedCode ? 'scanner-code' : 'scanner-code is-empty'}>
                {lastScannedCode || 'Aguardando codigo...'}
              </strong>
              {scannedProduct && (
                <div className="scanned-product">
                  <strong>{scannedProduct.name}</strong>
                  <span>SKU {scannedProduct.sku} · Stock {scannedProduct.stock}</span>
                </div>
              )}
            </section>
          )}

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
