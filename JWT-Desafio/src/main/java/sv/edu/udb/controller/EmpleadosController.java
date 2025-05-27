package sv.edu.udb.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import sv.edu.udb.model.Empleados;
import sv.edu.udb.service.EmpleadosService;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/empleados")
@RequiredArgsConstructor
public class EmpleadosController {

    private final EmpleadosService empleadosService;

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    public List<Empleados> listar() {
        return empleadosService.listar();
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    public ResponseEntity<Empleados> obtener(@PathVariable Integer id) {
        return empleadosService.obtenerPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Empleados> crear(@RequestBody Empleados empleado) {
        return ResponseEntity.ok(empleadosService.guardar(empleado));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Empleados> actualizar(@PathVariable Integer id, @RequestBody Empleados empleado) {
        Empleados actualizado = empleadosService.actualizar(id, empleado);
        return actualizado != null ? ResponseEntity.ok(actualizado) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> eliminar(@PathVariable Integer id) {
        empleadosService.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}
