package com.sistemaalmacen.controller;

import com.sistemaalmacen.model.MovimientoPicking;
import com.sistemaalmacen.repository.MovimientoPickingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/movimientos-picking")
@CrossOrigin(origins = "*")
public class MovimientoPickingController {
    @Autowired
    private MovimientoPickingRepository movimientoPickingRepository;

    @GetMapping("/operacion/{operacionId}")
    public List<MovimientoPicking> getByOperacion(@PathVariable Long operacionId) {
        return movimientoPickingRepository.findByOperacionPickingIdOrderByFechaHoraAsc(operacionId);
    }
} 