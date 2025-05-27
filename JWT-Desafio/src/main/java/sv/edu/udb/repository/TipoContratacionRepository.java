package sv.edu.udb.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import sv.edu.udb.model.TipoContratacion;

public interface TipoContratacionRepository extends JpaRepository<TipoContratacion, Integer> {
}
