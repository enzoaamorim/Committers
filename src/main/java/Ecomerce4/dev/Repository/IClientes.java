package Ecomerce4.dev.Repository;

import Ecomerce4.dev.modal.Clientes;

import org.springframework.data.jpa.repository.JpaRepository;


public interface IClientes extends JpaRepository<Clientes, Integer> {
    Clientes findByEmail(String email);
  }
  