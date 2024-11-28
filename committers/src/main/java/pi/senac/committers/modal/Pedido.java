package pi.senac.committers.modal;

import java.math.BigDecimal;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
@Entity
@Table(name = "pedido") 
public class Pedido {
        
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        @Column(name = "id")
        private Integer id;

     @NotNull(message = "O preço é obrigatório")
    @DecimalMin(value = "0.00", message = "O preço não pode ser negativo") 
    @DecimalMax(value = "999999.99", message = "O preço não pode ser maior que 999999.99") 
    @Column(name = "valor", precision = 10, scale = 2, nullable = false)
     private BigDecimal valor;
   
     @NotNull(message = "A quantidade é obrigatória")
    @Min(value = 0, message = "A quantidade não pode ser negativa") 
    @Max(value = 1000, message = "A quantidade não pode ser maior que 1000") 
    @Column(name = "quantidade", nullable = false)
    private Integer quantidade;

    @NotBlank(message = "O nome é obrigatório")
    @Column(name = "nomeDoCli", length = 200, nullable = true)
    private String nomeDoCli;
    
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
 
    @Column(name = "status", nullable = false)
    private String status;
}

