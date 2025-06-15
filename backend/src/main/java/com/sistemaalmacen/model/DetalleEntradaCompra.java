package com.sistemaalmacen.model;

import jakarta.persistence.*;
import lombok.*;
import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name = "detalle_entrada_compra")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DetalleEntradaCompra {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "entrada_compra_id", nullable = false)
    @JsonBackReference
    private EntradaCompra entradaCompra;

    @Column(name = "sku", nullable = false)
    private String sku;

    @Column(name = "cantidad", nullable = false)
    private Integer cantidad;

    @Column(name = "lote_serie", nullable = false)
    private String loteSerie;
} 