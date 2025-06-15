package com.sistemaalmacen.repository;

import com.sistemaalmacen.model.Operario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OperarioRepository extends JpaRepository<Operario, Long> {
    // Métodos personalizados si se requieren
} 