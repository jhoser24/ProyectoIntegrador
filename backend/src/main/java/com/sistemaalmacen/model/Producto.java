package com.sistemaalmacen.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "productos")
public class Producto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String nombre;

    @Column(length = 255)
    private String descripcion;

    @ManyToOne
    @JoinColumn(name = "categoria_id")
    private CategoriaProducto categoria;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TipoSeguimiento tipoSeguimiento = TipoSeguimiento.NINGUNO;

    public enum TipoSeguimiento {
        NINGUNO,
        LOTE,
        SERIE
    }
} 