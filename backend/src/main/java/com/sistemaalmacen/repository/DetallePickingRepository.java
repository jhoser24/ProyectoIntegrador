package com.sistemaalmacen.repository;

import com.sistemaalmacen.model.DetallePicking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DetallePickingRepository extends JpaRepository<DetallePicking, Long> {
    // Métodos personalizados si se requieren
} 