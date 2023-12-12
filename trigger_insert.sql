DELIMITER //

CREATE TRIGGER after_insert_producto
AFTER INSERT ON productos
FOR EACH ROW
BEGIN
    DECLARE mensaje VARCHAR(100);
    SELECT CONCAT('Se creó el producto: ', nombre) INTO mensaje FROM productos WHERE id_producto = NEW.id_producto;
    INSERT INTO log_eventos (evento, descripcion, fecha) VALUES ('INSERT', mensaje, NOW());
END;
//

DELIMITER ;

CREATE TABLE log_eventos (
    id_evento INT AUTO_INCREMENT PRIMARY KEY,
    evento VARCHAR(50),
    descripcion VARCHAR(255),
    fecha TIMESTAMP
);


INSERT INTO productos (nombre, precio_actual, stock, id_proveedor, id_categoria)
VALUES ('producto con trigger', '100', 100, '191919', 1);
