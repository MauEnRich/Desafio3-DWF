package sv.edu.udb.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Cargos {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idCargo;

    private String cargo;

    private String descripcionCargo;

    private Boolean jefatura;
}
