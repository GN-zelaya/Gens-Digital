const scanCodePattern = /[\u0000-\u001F\u007F]/;

export function createProductsController(pool) {
  return {
    async findByScanCode(request, response, next) {
      const scanCode = typeof request.query.code === 'string'
        ? request.query.code.trim()
        : '';

      if (!scanCode || scanCode.length > 128 || scanCodePattern.test(scanCode)) {
        response.status(400).json({
          error: 'invalid_scan_code',
          message: 'El codigo escaneado no tiene un formato valido.'
        });
        return;
      }

      try {
        const [rows] = await pool.query(
          `SELECT id, sku, scan_code AS scanCode, name, description,
                  sale_price AS salePrice, cost_price AS costPrice,
                  stock, minimum_stock AS minimumStock
             FROM products
            WHERE scan_code = ? AND active = TRUE
            LIMIT 1`,
          [scanCode]
        );

        if (rows.length === 0) {
          response.status(404).json({
            error: 'product_not_found',
            message: 'No existe un producto activo con ese codigo.'
          });
          return;
        }

        response.json({ data: rows[0] });
      } catch (error) {
        next(error);
      }
    }
  };
}