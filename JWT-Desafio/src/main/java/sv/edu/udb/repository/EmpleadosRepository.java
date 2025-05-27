package sv.edu.udb.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import sv.edu.udb.model.Empleados;

import java.util.Optional;

@Repository
public interface EmpleadosRepository extends JpaRepository<Empleados, Integer> {

    Optional<Empleados> findByUsuario(String usuario);
}
