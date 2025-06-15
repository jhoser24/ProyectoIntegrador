package com.sistemaalmacen.repository;

import com.sistemaalmacen.model.Producto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductoRepository extends JpaRepository<Producto, Long> {
    // Métodos personalizados pueden ser agregados aquí
} 