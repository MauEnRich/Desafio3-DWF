package sv.edu.udb.model;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.util.Date;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Contrataciones {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idContratacion;

    @ManyToOne
    @JoinColumn(name = "idDepartamento")
    private Departamento departamento;

    @ManyToOne
    @JoinColumn(name = "idEmpleado")
    private Empleados empleado;

    @ManyToOne
    @JoinColumn(name = "idCargo")
    private Cargos cargo;

    @ManyToOne
    @JoinColumn(name = "idTipoContratacion")
    private TipoContratacion tipoContratacion;

    @Temporal(TemporalType.DATE)
    private Date fechaContratacion;

    private BigDecimal salario;

    private Boolean estado;
}
