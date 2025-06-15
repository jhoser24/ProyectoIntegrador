package com.sistemaalmacen.controller;

import com.sistemaalmacen.model.DetallePicking;
import com.sistemaalmacen.repository.DetallePickingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/detalle-picking")
@CrossOrigin(origins = "*")
public class DetallePickingController {
    @Autowired
    private DetallePickingRepository detallePickingRepository;

    @GetMapping
    public List<DetallePicking> getAll() {
        return detallePickingRepository.findAll();
    }
} 