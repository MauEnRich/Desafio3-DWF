package sv.edu.udb.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import sv.edu.udb.model.Departamento;
import sv.edu.udb.repository.DepartamentoRepository;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class DepartamentoService {

    private final DepartamentoRepository departamentoRepository;

    public List<Departamento> listar() {
        return departamentoRepository.findAll();
    }

    public Optional<Departamento> obtenerPorId(Integer id) {
        return departamentoRepository.findById(id);
    }

    public Departamento guardar(Departamento departamento) {
        return departamentoRepository.save(departamento);
    }

    public Departamento actualizar(Integer id, Departamento departamento) {
        return departamentoRepository.findById(id).map(d -> {
            d.setNombreDepartamento(departamento.getNombreDepartamento());
            d.setDescripcionDepartamento(departamento.getDescripcionDepartamento());
            return departamentoRepository.save(d);
        }).orElseThrow(() -> new RuntimeException("Departamento no encontrado con ID: " + id));
    }

    public void eliminar(Integer id) {
        if (!departamentoRepository.existsById(id)) {
            throw new RuntimeException("No se puede eliminar. Departamento no encontrado con ID: " + id);
        }
        departamentoRepository.deleteById(id);
    }
}
