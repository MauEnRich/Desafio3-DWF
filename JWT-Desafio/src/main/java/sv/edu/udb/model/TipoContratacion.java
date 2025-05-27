package sv.edu.udb.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class TipoContratacion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idTipoContratacion;

    private String tipoContratacion;
}
