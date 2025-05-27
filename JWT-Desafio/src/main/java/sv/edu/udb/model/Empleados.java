package sv.edu.udb.model;

import jakarta.persistence.*;
import lombok.*;
import java.util.Date;

@Entity
@Table(name = "empleados")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Empleados {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idEmpleado")
    private Integer idEmpleado;

    @Column(name = "numeroDui")
    private String numeroDui;

    @Column(name = "nombrePersona")
    private String nombrePersona;

    @Column(name = "usuario")
    private String usuario;

    @Column(name = "numeroTelefono")
    private String numeroTelefono;

    @Column(name = "correoInstitucional")
    private String correoInstitucional;

    @Column(name = "rol")
    private String rol;

    @Temporal(TemporalType.DATE)
    @Column(name = "fechaNacimiento")
    private Date fechaNacimiento;

    @Column(name = "password")
    private String password;
}
