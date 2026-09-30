# Registro de cambios

**Fecha:** 30 de septiembre de 2026  
**Responsable:** Nahuel  
**Proyecto:** SaaS de gestion de ventas

## Cambios realizados

- Se agregaron al tablero las tarjetas de Proveedores, Clientes y Caja.
- Se incorporaron vistas con metricas iniciales para cada modulo.
- Se creo un controlador para pistolas lectoras de codigos QR configuradas como teclado.
- El lector QR detecta los caracteres enviados rapidamente y el `Enter` final.
- Se agrego la consulta de productos por codigo QR desde la vista Stock.
- Se creo el endpoint `GET /api/products/by-code?code=<codigo>`.
- Se separaron controlador y rutas de productos en el backend.
- Se incorporaron al esquema de base de datos las tablas de proveedores, productos y movimientos de inventario.
- Se agregaron estados de interfaz para producto encontrado, codigo inexistente y API no disponible.
- Se documentaron la configuracion de la API y el flujo de lectura QR.

## Validaciones realizadas

- Compilacion del frontend con `npm run build`.
- Lint del frontend con `npm run lint`.
- Validacion de sintaxis de los modulos del backend con `node --check`.
- Simulacion de lectura QR con codigo terminado en `Enter`.
- Revision sin errores en los archivos modificados.

## Pendientes para produccion

- Aplicar el esquema SQL en MySQL.
- Configurar autenticacion y permisos por rol.
- Agregar auditoria de movimientos de inventario y caja.
- Conectar las metricas con datos reales.
- Probar el flujo con una pistola lectora fisica.
