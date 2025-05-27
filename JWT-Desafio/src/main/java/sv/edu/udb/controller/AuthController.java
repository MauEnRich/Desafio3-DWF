package sv.edu.udb.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import sv.edu.udb.config.JwtTokenProvider;
import sv.edu.udb.dto.LoginRequest;
import sv.edu.udb.dto.JwtResponse;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider tokenProvider;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        System.out.println("Usuario recibido: " + loginRequest.getUsuario());
        System.out.println("Password recibido: " + loginRequest.getPassword());

        // el resto igual...

        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequest.getUsuario(),
                            loginRequest.getPassword())
            );

            SecurityContextHolder.getContext().setAuthentication(authentication);

            String token = tokenProvider.generateToken((org.springframework.security.core.userdetails.User) authentication.getPrincipal());

            return ResponseEntity.ok(new JwtResponse(token));
        } catch (Exception e) {
            return ResponseEntity.status(401).body("Error de autenticación: " + e.getMessage());
        }
    }

}
