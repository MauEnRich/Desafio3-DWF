package sv.edu.udb.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import sv.edu.udb.model.Empleados;
import sv.edu.udb.repository.EmpleadosRepository;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EmpleadoDetailsService implements UserDetailsService {

    private final EmpleadosRepository empleadoRepository; // coincide con el repo

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Empleados empleado = empleadoRepository.findByUsuario(username)
                .orElseThrow(() -> new UsernameNotFoundException("Empleado no encontrado: " + username));

        return new User(
                empleado.getUsuario(),
                empleado.getPassword(),
                List.of(new SimpleGrantedAuthority("ROLE_" + empleado.getRol()))
        );
    }
}
