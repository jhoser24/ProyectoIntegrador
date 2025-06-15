package com.sistemaalmacen.repository;

import com.sistemaalmacen.model.DetalleEntradaCompra;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DetalleEntradaCompraRepository extends JpaRepository<DetalleEntradaCompra, Long> {
} 