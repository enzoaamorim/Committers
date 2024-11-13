package pi.senac.committers.repository;

import pi.senac.committers.modal.Produto;

import org.springframework.data.jpa.repository.JpaRepository;


public interface IProduto extends JpaRepository<Produto, Integer> {
}


