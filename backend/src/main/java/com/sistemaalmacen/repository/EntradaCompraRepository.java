package com.sistemaalmacen.repository;

import com.sistemaalmacen.model.EntradaCompra;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EntradaCompraRepository extends JpaRepository<EntradaCompra, Long> {
    long countByEstadoIgnoreCase(String estado);
    List<EntradaCompra> findByEstadoIgnoreCase(String estado);
} 