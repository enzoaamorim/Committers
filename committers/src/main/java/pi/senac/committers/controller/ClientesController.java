package pi.senac.committers.controller;

import java.util.*;
import org.springframework.http.*;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

import pi.senac.committers.repository.IClientes;
import pi.senac.committers.service.ClientesService;
import pi.senac.committers.modal.Clientes;

@RestController
@CrossOrigin("*")
@RequestMapping("/clientes")
public class ClientesController {

    private ClientesService clientesService;
    private IClientes repository;

    public ClientesController(ClientesService clientesService, IClientes repository) {
        this.clientesService = clientesService;
        this.repository = repository;
    }

    @GetMapping
    public ResponseEntity<List<Clientes>> listaClientes() {
        return ResponseEntity.status(200).body(clientesService.listarClientes());
    }

    @GetMapping("/{id}")
public ResponseEntity<Clientes> getClienteById(@PathVariable("id") Integer id) {
    Optional<Clientes> cliente = repository.findById(id);
    return cliente.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
}

    @PostMapping
    public ResponseEntity<Clientes> criarCliente(@Valid @RequestBody Clientes cliente) {
        return ResponseEntity.status(201).body(clientesService.criaCliente(cliente));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Clientes> editarCliente(@PathVariable("id") Integer id, @Valid @RequestBody Clientes cliente) {
        Clientes clienteAtualizado = clientesService.editarCliente(id, cliente);
        if (clienteAtualizado != null) {
            return ResponseEntity.ok(clienteAtualizado);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    @PostMapping("/login")
    public ResponseEntity<Map<String, Integer>> validarSenha(@RequestBody Clientes clientes) {
        if (clientes == null || clientes.getEmail() == null || clientes.getSenha() == null) {
            return ResponseEntity.badRequest().build();
        }

        Integer clienteId = clientesService.validarSenha(clientes);
        if (clienteId != null) {
            Map<String, Integer> response = new HashMap<>();
            response.put("clienteId", clienteId);
            return ResponseEntity.ok().body(response);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }
    
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public Map<String, String> handleValidationException(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();

        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);

        });
        return errors;
    }
    
}
