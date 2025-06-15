package com.sistemaalmacen.model;

import jakarta.persistence.*;
import lombok.*;
import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name = "detalle_picking")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DetallePicking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "operacion_picking_id", nullable = false)
    @JsonBackReference
    private OperacionPicking operacionPicking;

    @Column(name = "sku", nullable = false)
    private String sku;

    @Column(name = "cantidad", nullable = false)
    private Integer cantidad;

    @Column(name = "ubicacion_origen", nullable = false)
    private String ubicacionOrigen;

    @Column(name = "ubicacion_destino", nullable = false)
    private String ubicacionDestino;
} 