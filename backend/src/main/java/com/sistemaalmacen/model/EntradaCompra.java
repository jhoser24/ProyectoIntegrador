package com.sistemaalmacen.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
@Table(name = "entrada_compra")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EntradaCompra {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "oc_origen", nullable = false)
    private String ocOrigen;

    @Column(name = "proveedor", nullable = false)
    private String proveedor;

    @Column(name = "fecha", nullable = false)
    private LocalDate fecha;

    @Column(name = "total_skus", nullable = false)
    private Integer totalSkus;

    @Column(name = "estado", nullable = false)
    private String estado;

    @OneToMany(mappedBy = "entradaCompra", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<DetalleEntradaCompra> detalles;
} 