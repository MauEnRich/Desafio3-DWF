package sv.edu.udb.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import sv.edu.udb.model.Departamento;

public interface DepartamentoRepository extends JpaRepository<Departamento, Integer> {
}
