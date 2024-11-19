package pi.senac.committers.modal;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data

@Entity
@Table(name = "endereco")

public class Endereco {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id")
  private Integer id;

  @NotBlank(message = "CEP é obrigatório!")
  @Column(name = "cep", length = 9, nullable = true)
  private String cep;

  @NotBlank(message = "Logradouro é obrigatório!")
  @Column(name = "logradouro", nullable = true)
  private String logradouro;

  @Column(name = "numero", nullable = true)
  private String numero;

  @Column(name = "complemento", nullable = true)
  private String complemento;

  @NotBlank(message = "Bairro é obrigatório!")
  @Column(name = "bairro", nullable = true)
  private String bairro;

  @NotBlank(message = "Cidade é obrigatória!")
  @Column(name = "cidade", nullable = true)
  private String cidade;

  @NotBlank(message = "UF é obrigatória!")
  @Column(name = "uf", length = 2, nullable = true)
  private String uf;

}
