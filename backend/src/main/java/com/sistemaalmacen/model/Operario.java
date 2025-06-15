package com.sistemaalmacen.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "operarios")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Operario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "codigo", nullable = false, unique = true)
    private String codigo;

    @Column(name = "nombre", nullable = false)
    private String nombre;

    @Column(name = "estado", nullable = false)
    private String estado;
} 