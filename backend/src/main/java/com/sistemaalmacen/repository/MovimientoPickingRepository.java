package com.sistemaalmacen.repository;

import com.sistemaalmacen.model.MovimientoPicking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface MovimientoPickingRepository extends JpaRepository<MovimientoPicking, Long> {
    List<MovimientoPicking> findByOperacionPickingIdOrderByFechaHoraAsc(Long operacionPickingId);
} 