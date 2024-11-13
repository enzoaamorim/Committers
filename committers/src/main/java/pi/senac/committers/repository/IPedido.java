package pi.senac.committers.repository;

import pi.senac.committers.modal.Pedido;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IPedido extends JpaRepository<Pedido, Integer> {
    
}

