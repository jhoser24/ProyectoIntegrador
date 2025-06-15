package com.sistemaalmacen.model;

import jakarta.persistence.*;
import lombok.*;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import java.time.LocalDateTime;

@Entity
@Table(name = "operacion_picking")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OperacionPicking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "id_operacion", nullable = false, unique = true)
    private String idOperacion;

    @Column(name = "estado", nullable = false)
    private String estado;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "operario_id")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Operario operario;

    @OneToMany(mappedBy = "operacionPicking", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private java.util.List<DetallePicking> detalles;

    @Column(name = "fecha_creacion")
    private LocalDateTime fechaCreacion;

    @Column(name = "orden_referencia")
    private String ordenReferencia;

    @Column(name = "tiempo_estimado")
    private String tiempoEstimado;
} 