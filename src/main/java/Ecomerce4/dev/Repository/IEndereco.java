package Ecomerce4.dev.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import Ecomerce4.dev.modal.Endereco;

public interface IEndereco extends JpaRepository <Endereco, Integer >{

}