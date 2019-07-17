package com.tortugaveloz.springboot.backend.apirest.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tortugaveloz.springboot.backend.apirest.entity.Cliente;

public interface IClienteDao extends JpaRepository<Cliente, Long> {

}
