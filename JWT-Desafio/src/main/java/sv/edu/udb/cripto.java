package sv.edu.udb;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class cripto {

    public static void main(String[] args) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        String rawPassword = "1234";
        String encodedPassword = encoder.encode(rawPassword);
        System.out.println("Hashed password: " + encodedPassword);
    }

}
