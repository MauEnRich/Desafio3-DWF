package sv.edu.udb.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import sv.edu.udb.model.Cargos;
import sv.edu.udb.service.CargosService;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/cargos")
@RequiredArgsConstructor
public class CargosController {

    private final CargosService cargosService;

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    public List<Cargos> listar() {
        return cargosService.listar();
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    public ResponseEntity<Cargos> obtener(@PathVariable Integer id) {
        Cargos cargo = cargosService.obtenerPorId(id);
        return cargo != null ? ResponseEntity.ok(cargo) : ResponseEntity.notFound().build();
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Cargos> crear(@RequestBody Cargos cargo) {
        return ResponseEntity.ok(cargosService.guardar(cargo));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Cargos> actualizar(@PathVariable Integer id, @RequestBody Cargos cargo) {
        Cargos actualizado = cargosService.actualizar(id, cargo);
        return actualizado != null ? ResponseEntity.ok(actualizado) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> eliminar(@PathVariable Integer id) {
        cargosService.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}
