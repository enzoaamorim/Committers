package Telas;

import java.util.Scanner;
import Telas.BackOffIncluir;

public class BackOffListarUser {
    public static void ListarUser(){
        Scanner scan = new Scanner(System.in);
        System.out.println("                         LISTAR USUARIO           ");
                System.out.println("Id |    Nome                |        e-mail          |      status          | Grupo        ");
                System.out.println("___________________________________________________________________________________________");
                // realizar um if else para caso puxe os dados no Banco, puxar uma nova linha
                
                System.out.println("Entre com o ID para editar / ativar / inativar, 0 para voltar e i para incluir");
                String escolhaListUsuario = scan.next();
                    if(escolhaListUsuario.equals("i")) {// incluir no banco de dados
                        BackOffIncluir incluirUser = new BackOffIncluir();
                        incluirUser.incluirUser();

                    }

                    else if (escolhaListUsuario != "i" || escolhaListUsuario !="0"){ // incluir no banco de dados


                    }
    }
}
