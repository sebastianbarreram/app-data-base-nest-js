/* Build Table Structure */
CREATE TABLE tbl_detalle_factura (
  dtl_id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
  factura_id INTEGER UNSIGNED NOT NULL,
  dtl_producto VARCHAR(300) NOT NULL,
  dtl_cantidad INTEGER DEFAULT 0 NOT NULL,
  dtl_precio BIGINT NOT NULL,
  dtl_total BIGINT DEFAULT 0 NOT NULL
) ENGINE = InnoDB;
/* Build Table Structure */
CREATE TABLE tbl_factura (
  fac_id INTEGER UNSIGNED AUTO_INCREMENT PRIMARY KEY NOT NULL,
  fac_cliente_nombre VARCHAR(500) NOT NULL,
  fac_cliente_correo VARCHAR(500) NULL
) ENGINE = InnoDB;
/* Add Foreign Key: fk_tbl_detalle_factura_tbl_factura */
ALTER TABLE tbl_detalle_factura
ADD CONSTRAINT fk_tbl_detalle_factura_tbl_factura FOREIGN KEY (factura_id) REFERENCES tbl_factura (fac_id) ON UPDATE RESTRICT ON DELETE RESTRICT;