package Ecomerce4.dev.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import Ecomerce4.dev.modal.Endereco;
import Ecomerce4.dev.service.EnderecoService;

@RestController
  @CrossOrigin("*")
  @RequestMapping("/endereco")
public class EnderecoController {
    private EnderecoService enderecoService;
  
      public EnderecoController(EnderecoService enderecoService) {
          this.enderecoService = enderecoService;
      }
  
      @GetMapping
      public ResponseEntity<List<Endereco>> listarEndereco() {
          List<Endereco> enderecosClientes = enderecoService.listarEndereco();
          return ResponseEntity.ok().body(enderecosClientes);
      }
  
      @PostMapping
      public ResponseEntity<Endereco> criarEnderecoCliente(@RequestBody Endereco endereco) {
          Endereco novoEndereco = enderecoService.criarEndereco(endereco);
          return ResponseEntity.status(HttpStatus.CREATED).body(novoEndereco);
      }
  
      @PutMapping("/{id}")
   public ResponseEntity<Endereco> editarEndereco(@PathVariable Integer id, @RequestBody Endereco enderecoAtualizado) {
    Endereco enderecoAtualizadoResultado = enderecoService.editarEndereco(id, enderecoAtualizado);
    if (enderecoAtualizadoResultado != null) {
        return ResponseEntity.ok().body(enderecoAtualizadoResultado);
    } else {
        return ResponseEntity.notFound().build();
    }
}
  
      @DeleteMapping("/{id}")
      public ResponseEntity<Void> deletarEndereco(@PathVariable Integer id) {
          enderecoService.deletarEndereco(id);
          return ResponseEntity.noContent().build();
      }
}
