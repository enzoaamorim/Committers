package pi.senac.committers.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import pi.senac.committers.modal.EnderecoFAT;
import pi.senac.committers.service.EnderecoFATService;

@RestController
@CrossOrigin("*")
@RequestMapping("/enderecofat")
public class EnderecoFATController {
    private EnderecoFATService enderecoFATService;

    public EnderecoFATController(EnderecoFATService enderecoFATService) {
          this.enderecoFATService = enderecoFATService;
      }

    @GetMapping
    public ResponseEntity<List<EnderecoFAT>> listarEndereco() {
        List<EnderecoFAT> enderecosClientes = enderecoFATService.listarEndereco();
        return ResponseEntity.ok().body(enderecosClientes);
    }

    @PostMapping
    public ResponseEntity<EnderecoFAT> criarEnderecoCliente(@RequestBody EnderecoFAT endereco) {
        EnderecoFAT novoEndereco = enderecoFATService.criarEndereco(endereco);
        return ResponseEntity.status(HttpStatus.CREATED).body(novoEndereco);
    }

    @PutMapping("/{id}")
    public ResponseEntity<EnderecoFAT> editarEndereco(@PathVariable Integer id, @RequestBody EnderecoFAT enderecoAtualizado) {
        EnderecoFAT enderecoAtualizadoResultado = enderecoFATService.editarEndereco(id, enderecoAtualizado);
        if (enderecoAtualizadoResultado != null) {
            return ResponseEntity.ok().body(enderecoAtualizadoResultado);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarEndereco(@PathVariable Integer id) {
        enderecoFATService.deletarEndereco(id);
        return ResponseEntity.noContent().build();
    }
}
