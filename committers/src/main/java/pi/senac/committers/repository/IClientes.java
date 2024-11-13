package pi.senac.committers.repository;

import pi.senac.committers.modal.Clientes;

import org.springframework.data.jpa.repository.JpaRepository;


public interface IClientes extends JpaRepository<Clientes, Integer> {
    Clientes findByEmail(String email);
  }
  