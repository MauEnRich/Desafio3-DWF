package sv.edu.udb.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import sv.edu.udb.model.Contrataciones;
import sv.edu.udb.service.ContratacionesService;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/contrataciones")
@RequiredArgsConstructor
public class ContratacionesController {

    private final ContratacionesService contratacionesService;

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    public List<Contrataciones> listar() {
        return contratacionesService.listar();
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    public ResponseEntity<Contrataciones> obtenerPorId(@PathVariable Integer id) {
        Contrataciones contratacion = contratacionesService.obtenerPorId(id);
        if (contratacion == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(contratacion);
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Contrataciones> crear(@RequestBody Contrataciones contratacion) {
        Contrataciones creada = contratacionesService.guardar(contratacion);
        return ResponseEntity.ok(creada);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Contrataciones> actualizar(@PathVariable Integer id, @RequestBody Contrataciones contratacion) {
        Contrataciones actualizada = contratacionesService.actualizar(id, contratacion);
        if (actualizada == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(actualizada);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> eliminar(@PathVariable Integer id) {
        contratacionesService.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}
