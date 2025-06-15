package com.sistemaalmacen.controller;

import com.sistemaalmacen.model.OperacionPicking;
import com.sistemaalmacen.model.Operario;
import com.sistemaalmacen.model.DetallePicking;
import com.sistemaalmacen.model.MovimientoPicking;
import com.sistemaalmacen.repository.OperacionPickingRepository;
import com.sistemaalmacen.repository.OperarioRepository;
import com.sistemaalmacen.repository.DetallePickingRepository;
import com.sistemaalmacen.repository.MovimientoPickingRepository;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import java.util.List;
import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/picking")
@CrossOrigin(origins = "*", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.OPTIONS})
public class OperacionPickingController {
    @Autowired
    private OperacionPickingRepository pickingRepository;
    @Autowired
    private OperarioRepository operarioRepository;
    @Autowired
    private DetallePickingRepository detallePickingRepository;
    @Autowired
    private MovimientoPickingRepository movimientoPickingRepository;

    @GetMapping
    public List<OperacionPicking> getAll() {
        return pickingRepository.findAll();
    }

    @PostMapping
    public OperacionPicking create(@RequestBody OperacionPicking op) {
        if (op.getOperario() != null && op.getOperario().getId() != null) {
            Operario operario = operarioRepository.findById(op.getOperario().getId()).orElse(null);
            op.setOperario(operario);
        }
        if (op.getDetalles() != null) {
            for (DetallePicking det : op.getDetalles()) {
                det.setOperacionPicking(op);
            }
        }
        op.setFechaCreacion(LocalDateTime.now());
        // Calcular tiempo estimado: 2 minutos por producto
        int tiempo = (op.getDetalles() != null) ? op.getDetalles().size() * 2 : 0;
        op.setTiempoEstimado(tiempo > 0 ? tiempo + " min" : "-");
        // ordenReferencia ya se recibe del frontend
        OperacionPicking saved = pickingRepository.save(op);
        // Registrar movimiento inicial
        MovimientoPicking mov = MovimientoPicking.builder()
            .operacionPicking(saved)
            .tipo("Creación")
            .descripcion("Operación Creada")
            .fechaHora(LocalDateTime.now())
            .build();
        movimientoPickingRepository.save(mov);
        return saved;
    }

    @PutMapping("/{id}")
    public OperacionPicking update(@PathVariable Long id, @RequestBody OperacionPicking op) {
        return pickingRepository.findById(id).map(existing -> {
            String estadoAnterior = existing.getEstado();
            existing.setIdOperacion(op.getIdOperacion());
            existing.setOperario(op.getOperario());
            existing.setEstado(op.getEstado());
            // Actualizar detalles: eliminar antiguos y agregar nuevos
            if (existing.getDetalles() != null) existing.getDetalles().clear();
            if (op.getDetalles() != null) {
                for (DetallePicking det : op.getDetalles()) {
                    det.setOperacionPicking(existing);
                    existing.getDetalles().add(det);
                }
            }
            OperacionPicking saved = pickingRepository.save(existing);
            // Registrar movimiento si el estado cambió
            if (op.getEstado() != null && !op.getEstado().equalsIgnoreCase(estadoAnterior)) {
                MovimientoPicking mov = MovimientoPicking.builder()
                    .operacionPicking(saved)
                    .tipo("Cambio de Estado")
                    .descripcion("Estado cambiado a: " + op.getEstado())
                    .fechaHora(java.time.LocalDateTime.now())
                    .build();
                movimientoPickingRepository.save(mov);
            }
            return saved;
        }).orElseThrow();
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        // Eliminar movimientos asociados primero
        List<MovimientoPicking> movimientos = movimientoPickingRepository.findByOperacionPickingIdOrderByFechaHoraAsc(id);
        movimientoPickingRepository.deleteAll(movimientos);
        // Luego eliminar la operación
        pickingRepository.deleteById(id);
    }

    @GetMapping("/kpis")
    public ResponseEntity<PickingKpiDTO> getKpis() {
        PickingKpiDTO dto = new PickingKpiDTO();
        dto.setOperacionesPendientes(pickingRepository.countByEstadoIgnoreCase("Pendiente"));
        dto.setOperacionesConDiscrepancias(pickingRepository.countByEstadoIgnoreCase("Con Discrepancias"));
        dto.setPrecisionPicking(99.2); // Simulado
        dto.setTiempoPromedio(5.0); // Simulado
        return ResponseEntity.ok(dto);
    }

    static class PickingKpiDTO {
        private long operacionesPendientes;
        private double precisionPicking;
        private double tiempoPromedio;
        private long operacionesConDiscrepancias;
        public long getOperacionesPendientes() { return operacionesPendientes; }
        public void setOperacionesPendientes(long v) { this.operacionesPendientes = v; }
        public double getPrecisionPicking() { return precisionPicking; }
        public void setPrecisionPicking(double v) { this.precisionPicking = v; }
        public double getTiempoPromedio() { return tiempoPromedio; }
        public void setTiempoPromedio(double v) { this.tiempoPromedio = v; }
        public long getOperacionesConDiscrepancias() { return operacionesConDiscrepancias; }
        public void setOperacionesConDiscrepancias(long v) { this.operacionesConDiscrepancias = v; }
    }
} 