package sv.edu.udb.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import sv.edu.udb.model.Cargos;
import sv.edu.udb.repository.CargosRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CargosService {

    private final CargosRepository cargosRepository;

    public List<Cargos> listar() {
        return cargosRepository.findAll();
    }

    public Cargos obtenerPorId(Integer id) {
        return cargosRepository.findById(id).orElse(null);
    }

    public Cargos guardar(Cargos cargo) {
        return cargosRepository.save(cargo);
    }

    public Cargos actualizar(Integer id, Cargos cargo) {
        return cargosRepository.findById(id).map(c -> {
            c.setCargo(cargo.getCargo());
            c.setDescripcionCargo(cargo.getDescripcionCargo());
            c.setJefatura(cargo.getJefatura());
            return cargosRepository.save(c);
        }).orElse(null);
    }

    public void eliminar(Integer id) {
        cargosRepository.deleteById(id);
    }
}
