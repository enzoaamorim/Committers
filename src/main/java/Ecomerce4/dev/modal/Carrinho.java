package Ecomerce4.dev.modal;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

@Data
@Entity
@Table(name = "carrinho")
public class Carrinho {

  

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id")
  private Integer id;
  
  @NotBlank(message = "o nome é obrigatorio")
  @Column(name ="nome", length = 50, nullable = true)
  private String nome;

  @NotNull(message = "valor é obrigatorio")
  @Column(name = "valor", columnDefinition = "TEXT", nullable = true)
  private double valor;

  @NotNull(message = "A quantidade é obrigatória")
    @Column(name = "quantidade", nullable = false)
    private Integer quantidade;

  @Lob
  @Column(name = "imagem", nullable = false)
  private byte[] imagem;  
 
}
