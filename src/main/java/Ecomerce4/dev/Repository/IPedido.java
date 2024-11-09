package Ecomerce4.dev.Repository;

import Ecomerce4.dev.modal.Pedido;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IPedido extends JpaRepository<Pedido, Integer> {
    
}

