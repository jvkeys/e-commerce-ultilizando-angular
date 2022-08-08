import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Oferta } from './shared/ofertas.model';
import { URL_API } from './app.api';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import 'rxjs/add/operator/toPromise'


export class OfertasService {

    constructor(private http: Http){}
    
    public getOfertas(): Promise<Oferta[]> {
        return this.http.get(`${URL_API}/ofertas?destaque=true`)
            .toPromise()
            .then((resposta: any) => resposta.json())
    }

    public getOfertasPorCategoria(categoria: String): Promise<Oferta[]> {
        return this.http.get(`${URL_API}/ofertas?categoria=${categoria}`)
            .toPromise()
            .then((resposta: any) => resposta.json())
    }

    public getOfertaPorId(id: Number): Promise<Oferta> {
        return this.http.get(`${URL_API}/ofertas?id=${id}`)
            .toPromise()
            .then((resposta: any) => resposta.json()[0])
    } 

    public getComoUsarPorId(id: Number): Promise<string> {
        return this.http.get(`${URL_API}/como-usar?id=${id}`)
            .toPromise()
            .then((descricao: any) => {
                return descricao.json()[0].descricao
            })
    } 

    public getOndeFicaPorId(id: Number): Promise<String> {
        return this.http.get(`${URL_API}/onde-fica?id=${id}`)
            .toPromise()
            .then((descricao: any) => {
                return descricao.json()[0].descricao
            })
    }

    public pesquisaOferta(termo:string): Observable<Oferta[]>{
        return this.http.get(`${URL_API}?descricao_oferta_like=${termo}`)
        .pipe(map((resposta: any)=> resposta.json()))
        }
   

    
   /* public getOfertas2(): Promise<Oferta[]> {
        return new Promise((resolve, reject) => {
            //algum tipo de processamento, que ao finalizar, chama a função resolve ou a função reject
            //console.log('será que passou por aqui?')
            let deu_certo = true
            
            if(deu_certo) {
                setTimeout(() => resolve( this.ofertas ), 3000)
                
            } else {
                reject({ codigo_erro: 404, mensagem_erro: 'Servidor não encontrado XYZ' })
            }
        })
        .then(( ofertas: Oferta[]) => {
            //fazer alguma tratativa
            console.log('primeiro then')
            return ofertas
        })
        .then(( ofertas: Oferta[]) => {
            //fazer uma outra tratativa
            console.log('segundo then')
            return new Promise((resolve2, reject2) => {
                setTimeout(() => { resolve2( ofertas ) },3000)
            })
        })
        .then(( ofertas: Oferta[] ) => {
            console.log('terceiro then executado após 3 segundos porque estava aguardando uma promisse ser resolvida')
            return ofertas
        })
    }*/
}