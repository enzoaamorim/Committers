package pi.senac.committers.modal;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
@Entity
@Table(name = "usuario")
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @NotBlank(message = "O nome é obrigatório!")
    @Column(name = "nome", length = 50, nullable = false) // Nullable should be false for NotBlank fields
    private String nome;

    @Email(message = "Insira um email válido!")
    @NotBlank(message = "O email é obrigatório")
    @Column(name = "email", length = 50, nullable = false) // Nullable should be false for NotBlank fields
    private String email;

    @NotBlank(message = "A senha é obrigatória")
    @Column(name = "senha", columnDefinition = "TEXT", nullable = false) // Nullable should be false for NotBlank fields
    private String senha;

    @NotBlank(message = "O CPF é obrigatório")
    @Column(name = "cpf", length = 14, nullable = false, unique = true)
    private String cpf;

    @Column(name = "nivel", nullable = false)
    private Integer nivel;

    @Column(name = "status", nullable = false)
    private Boolean status;
}
