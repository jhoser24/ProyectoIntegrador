package com.sistemaalmacen.controller;

import com.sistemaalmacen.model.Operario;
import com.sistemaalmacen.repository.OperarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/operarios")
@CrossOrigin(origins = "*")
public class OperarioController {
    @Autowired
    private OperarioRepository operarioRepository;

    @GetMapping
    public List<Operario> getAll() {
        return operarioRepository.findAll();
    }

    @GetMapping("/{codigo}")
    public ResponseEntity<Operario> getByCodigo(@PathVariable String codigo) {
        return operarioRepository.findAll().stream()
                .filter(o -> o.getCodigo().equalsIgnoreCase(codigo))
                .findFirst()
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
} 