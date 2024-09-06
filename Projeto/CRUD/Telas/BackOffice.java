package Telas;

import java.util.Scanner;

public class BackOffice{

    public static void puxarBackOffice(){
        System.out.println("                      Tela BackOffice");

        Scanner scan = new Scanner(System.in);
        System.out.println("1) Listar Produto");
        System.out.println("2) Listar Usuario");

        System.out.println("Escolha entre 1 ou 2");
        int escolha = scan.nextByte();
        int retorno = 1;

        do {
                switch (escolha) {
                case 1: // Listar Produtos
               

                retorno =0;
                    break;
                
                case 2: // Listar Usuario
                    BackOffListarUser listar = new BackOffListarUser();
                    listar.ListarUser();


                retorno =0;
                    break;
    
                default: // Escolha inválida
    
                    System.out.println("Escolha Inválida, tente novamente");
    
                
                    break;
            }

        }
        while(retorno != 0);

    }

}