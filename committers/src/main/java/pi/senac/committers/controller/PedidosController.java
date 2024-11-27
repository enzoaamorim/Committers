package pi.senac.committers.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import pi.senac.committers.modal.Pedido;
import pi.senac.committers.service.PedidoService;

@RestController
@CrossOrigin("*")
@RequestMapping("/pedido")
public class PedidosController {

    private final PedidoService pedidoService;

    public PedidosController(PedidoService pedidoService) {
        this.pedidoService = pedidoService;
    }

    @GetMapping
    public ResponseEntity<List<Pedido>> listarPedido() {
        List<Pedido> lista = pedidoService.listarPedido();
        return ResponseEntity.ok(lista);
    }

    @PostMapping
    public ResponseEntity<Pedido> criarPedido(@RequestBody Pedido pedido) {
        Pedido novoPedido = pedidoService.criarPedido(pedido);
        return ResponseEntity.status(201).body(novoPedido);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Pedido> editarPedido(@PathVariable Integer id, @RequestBody Pedido pedidoAtualizado) {
        Pedido pedidoEditado = pedidoService.editarPedido(id, pedidoAtualizado);
        if (pedidoEditado != null) {
            return ResponseEntity.ok(pedidoEditado);
        } else {
            return ResponseEntity.status(404).build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Pedido> buscarPedidoPorId(@PathVariable Integer id) {
        Pedido pedido = pedidoService.buscarPedidoPorId(id);
        if (pedido != null) {
            return ResponseEntity.ok(pedido);
        } else {
            return ResponseEntity.status(404).build();
        }
    }

    
    @PutMapping("/{id}/ativar")
    public ResponseEntity<Pedido> ativarPedido(@PathVariable Integer id) {
        Pedido pedidoExistente = pedidoService.buscarPedidoPorId(id);
        if (pedidoExistente != null) {
            pedidoExistente.setStatus("Ativo");
            Pedido pedidoAtualizado = pedidoService.criarPedido(pedidoExistente);
            return ResponseEntity.ok(pedidoAtualizado);
        } else {
            return ResponseEntity.status(404).build();
        }
    }


    @PutMapping("/{id}/desativar")
    public ResponseEntity<Pedido> desativarPedido(@PathVariable Integer id) {
        Pedido pedidoExistente = pedidoService.buscarPedidoPorId(id);
        if (pedidoExistente != null) {
            pedidoExistente.setStatus("Inativo");
            Pedido pedidoAtualizado = pedidoService.criarPedido(pedidoExistente); 
            return ResponseEntity.ok(pedidoAtualizado);
        } else {
            return ResponseEntity.status(404).build();
        }
    }
    
}