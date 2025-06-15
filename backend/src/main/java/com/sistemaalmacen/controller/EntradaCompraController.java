package com.sistemaalmacen.controller;

import com.sistemaalmacen.model.EntradaCompra;
import com.sistemaalmacen.model.DetalleEntradaCompra;
import com.sistemaalmacen.repository.EntradaCompraRepository;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import java.time.Duration;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.Map;
import com.sistemaalmacen.model.Producto;
import com.sistemaalmacen.repository.ProductoRepository;

@RestController
@RequestMapping("/api/entradas-compra")
@CrossOrigin(origins = "*", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.OPTIONS})
public class EntradaCompraController {
    private final EntradaCompraRepository entradaCompraRepository;
    @Autowired
    private ProductoRepository productoRepository;

    public EntradaCompraController(EntradaCompraRepository entradaCompraRepository) {
        this.entradaCompraRepository = entradaCompraRepository;
    }

    @GetMapping
    public List<EntradaCompra> getAllEntradasCompra() {
        return entradaCompraRepository.findAll();
    }

    @PostMapping
    public EntradaCompra crearEntradaCompra(@RequestBody EntradaCompra entradaCompra) {
        if (entradaCompra.getDetalles() != null) {
            for (DetalleEntradaCompra detalle : entradaCompra.getDetalles()) {
                detalle.setEntradaCompra(entradaCompra);
            }
        }
        return entradaCompraRepository.save(entradaCompra);
    }

    @PutMapping("/{id}")
    public EntradaCompra actualizarEntradaCompra(@PathVariable Long id, @RequestBody EntradaCompra entradaActualizada) {
        return entradaCompraRepository.findById(id).map(entrada -> {
            entrada.setOcOrigen(entradaActualizada.getOcOrigen());
            entrada.setProveedor(entradaActualizada.getProveedor());
            entrada.setFecha(entradaActualizada.getFecha());
            entrada.setTotalSkus(entradaActualizada.getTotalSkus());
            entrada.setEstado(entradaActualizada.getEstado());

            // Actualizar detalles (eliminar antiguos y agregar nuevos)
            entrada.getDetalles().clear();
            if (entradaActualizada.getDetalles() != null) {
                for (DetalleEntradaCompra detalle : entradaActualizada.getDetalles()) {
                    detalle.setEntradaCompra(entrada);
                    entrada.getDetalles().add(detalle);
                }
            }

            return entradaCompraRepository.save(entrada);
        }).orElseThrow();
    }

    @DeleteMapping("/{id}")
    public void eliminarEntradaCompra(@PathVariable Long id) {
        entradaCompraRepository.deleteById(id);
    }

    @GetMapping("/kpis")
    public ResponseEntity<EntradasCompraKpiDTO> getKpis() {
        EntradasCompraKpiDTO dto = new EntradasCompraKpiDTO();
        // Entradas pendientes
        long pendientes = entradaCompraRepository.countByEstadoIgnoreCase("Pendiente");
        dto.setEntradasPendientes(pendientes);
        // Entradas con discrepancias
        long discrepancias = entradaCompraRepository.countByEstadoIgnoreCase("Con Discrepancias");
        dto.setEntradasConDiscrepancias(discrepancias);
        // Tiempo promedio de validación (simulado: 8 min)
        dto.setTiempoPromedioValidacion(8.0);
        // Precisión de recepción (simulado: 98.5%)
        dto.setPrecisionRecepcion(98.5);
        return ResponseEntity.ok(dto);
    }

    @GetMapping("/validadas")
    public List<EntradaCompra> getEntradasValidadas() {
        return entradaCompraRepository.findByEstadoIgnoreCase("Validado");
    }

    @GetMapping("/skus/{ocOrigen}")
    public List<SkuDescripcionDTO> getSkusByOcOrigen(@PathVariable String ocOrigen) {
        return entradaCompraRepository.findAll().stream()
            .filter(e -> e.getOcOrigen().equalsIgnoreCase(ocOrigen))
            .flatMap(e -> e.getDetalles().stream())
            .map(d -> {
                Producto prod = productoRepository.findAll().stream()
                    .filter(p -> p.getNombre().equalsIgnoreCase(d.getSku()))
                    .findFirst().orElse(null);
                return new SkuDescripcionDTO(d.getSku(), prod != null ? prod.getDescripcion() : "");
            })
            .distinct()
            .toList();
    }

    public static class SkuDescripcionDTO {
        private String sku;
        private String descripcion;
        public SkuDescripcionDTO(String sku, String descripcion) {
            this.sku = sku;
            this.descripcion = descripcion;
        }
        public String getSku() { return sku; }
        public String getDescripcion() { return descripcion; }
    }
}

// DTO para KPIs
class EntradasCompraKpiDTO {
    private long entradasPendientes;
    private double tiempoPromedioValidacion;
    private double precisionRecepcion;
    private long entradasConDiscrepancias;
    // getters y setters
    public long getEntradasPendientes() { return entradasPendientes; }
    public void setEntradasPendientes(long entradasPendientes) { this.entradasPendientes = entradasPendientes; }
    public double getTiempoPromedioValidacion() { return tiempoPromedioValidacion; }
    public void setTiempoPromedioValidacion(double tiempoPromedioValidacion) { this.tiempoPromedioValidacion = tiempoPromedioValidacion; }
    public double getPrecisionRecepcion() { return precisionRecepcion; }
    public void setPrecisionRecepcion(double precisionRecepcion) { this.precisionRecepcion = precisionRecepcion; }
    public long getEntradasConDiscrepancias() { return entradasConDiscrepancias; }
    public void setEntradasConDiscrepancias(long entradasConDiscrepancias) { this.entradasConDiscrepancias = entradasConDiscrepancias; }
} 