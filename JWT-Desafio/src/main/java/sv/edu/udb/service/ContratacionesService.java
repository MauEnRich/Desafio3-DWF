package sv.edu.udb.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import sv.edu.udb.model.Contrataciones;
import sv.edu.udb.repository.ContratacionesRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ContratacionesService {

    private final ContratacionesRepository contratacionesRepository;

    public List<Contrataciones> listar() {
        return contratacionesRepository.findAll();
    }

    public Contrataciones obtenerPorId(Integer id) {
        return contratacionesRepository.findById(id).orElse(null);
    }

    public Contrataciones guardar(Contrataciones contratacion) {
        return contratacionesRepository.save(contratacion);
    }

    public Contrataciones actualizar(Integer id, Contrataciones contratacion) {
        return contratacionesRepository.findById(id).map(c -> {
            c.setDepartamento(contratacion.getDepartamento());
            c.setEmpleado(contratacion.getEmpleado());
            c.setCargo(contratacion.getCargo());
            c.setTipoContratacion(contratacion.getTipoContratacion());
            c.setFechaContratacion(contratacion.getFechaContratacion());
            c.setSalario(contratacion.getSalario());
            c.setEstado(contratacion.getEstado());
            return contratacionesRepository.save(c);
        }).orElse(null);
    }

    public void eliminar(Integer id) {
        contratacionesRepository.deleteById(id);
    }
}
