package com.sistemaalmacen.repository;

import com.sistemaalmacen.model.OperacionPicking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.sistemaalmacen.repository.DetallePickingRepository;
import com.sistemaalmacen.repository.OperarioRepository;

@Repository
public interface OperacionPickingRepository extends JpaRepository<OperacionPicking, Long> {
    long countByEstadoIgnoreCase(String estado);
} 