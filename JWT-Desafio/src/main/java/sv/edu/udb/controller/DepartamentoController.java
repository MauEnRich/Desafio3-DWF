package sv.edu.udb.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import sv.edu.udb.model.Departamento;
import sv.edu.udb.service.DepartamentoService;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173") // Permite peticiones desde el frontend local
@RestController
@RequestMapping("/api/departamentos")
@RequiredArgsConstructor
public class DepartamentoController {

    private final DepartamentoService departamentoService;

    // Listar todos los departamentos - accesible por ADMIN y USER
    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    public ResponseEntity<List<Departamento>> listar() {
        return ResponseEntity.ok(departamentoService.listar());
    }

    // Obtener un departamento por ID - accesible por ADMIN y USER
    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    public ResponseEntity<Departamento> obtenerPorId(@PathVariable Integer id) {
        return departamentoService.obtenerPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }


    // Crear un nuevo departamento - solo ADMIN
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Departamento> guardar(@RequestBody Departamento departamento) {
        return ResponseEntity.ok(departamentoService.guardar(departamento));
    }

    // Actualizar un departamento existente - solo ADMIN
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Departamento> actualizar(@PathVariable Integer id, @RequestBody Departamento departamento) {
        Departamento actualizado = departamentoService.actualizar(id, departamento);
        return actualizado != null ? ResponseEntity.ok(actualizado) : ResponseEntity.notFound().build();
    }

    // Eliminar un departamento - solo ADMIN
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> eliminar(@PathVariable Integer id) {
        departamentoService.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}
