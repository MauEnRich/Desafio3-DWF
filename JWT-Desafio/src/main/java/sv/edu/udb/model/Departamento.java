package sv.edu.udb.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Departamento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idDepartamento;

    private String nombreDepartamento;

    private String descripcionDepartamento;
}