package sv.edu.udb.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import sv.edu.udb.model.Empleados;
import sv.edu.udb.repository.EmpleadosRepository;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class EmpleadosService {

    private final EmpleadosRepository empleadosRepository;

    public List<Empleados> listar() {
        return empleadosRepository.findAll();
    }

    public Optional<Empleados> obtenerPorId(Integer id) {
        return empleadosRepository.findById(id);
    }

    public Empleados guardar(Empleados empleado) {
        return empleadosRepository.save(empleado);
    }

    public Empleados actualizar(Integer id, Empleados empleado) {
        return empleadosRepository.findById(id).map(e -> {
            e.setNumeroDui(empleado.getNumeroDui());
            e.setNombrePersona(empleado.getNombrePersona());
            e.setUsuario(empleado.getUsuario());
            e.setNumeroTelefono(empleado.getNumeroTelefono());
            e.setCorreoInstitucional(empleado.getCorreoInstitucional());
            e.setRol(empleado.getRol());
            e.setFechaNacimiento(empleado.getFechaNacimiento());
            e.setPassword(empleado.getPassword());
            return empleadosRepository.save(e);
        }).orElse(null);
    }

    public void eliminar(Integer id) {
        empleadosRepository.deleteById(id);
    }
}
